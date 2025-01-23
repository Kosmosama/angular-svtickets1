import { inject, Injectable } from '@angular/core';
import { MyEvent, MyEventInsert } from '../../shared/interfaces/my-event';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { EventsResponse, SingleEventResponse } from '../../shared/interfaces/responses';

@Injectable({
    providedIn: 'root'
})
export class EventsService {
    http = inject(HttpClient);

    /**
     * Fetches a list of events from the server.
     * 
     * @param {string} search - The search query to filter events.
     * @param {number} page - The page number for pagination.
     * @param {"distance" | "date" | "price"} order - The order to sort the events by.
     * @param {number | null} creator - The ID of the event creator, or null if not applicable.
     * @param {number | null} attending - The ID of the user attending, or null if not applicable.
     * 
     * @returns {Observable<EventsResponse>} - An observable stream containing the events response.
     */
    getEvents(
        search: string = "",
        page: number = 1,
        order: "distance" | "date" | "price" = "distance",
        creator: number | null = null,
        attending: number | null = null
    ): Observable<EventsResponse> {
        const params: URLSearchParams = new URLSearchParams({page: String(page), search, order,});

        if (creator) params.append("creator", String(creator));
        if (attending) params.append("attending", String(attending));

        return this.http.get<EventsResponse>(`events?${params.toString()}`);
    }

    /**
     * Fetches a certain event from the server.
     *
     * @param {number} id - The id of the event to fetch.
     * 
     * @returns {Promise<MyEvent>} - A promise resolving with the event data response.
     */
    getEvent(id: number): Observable<MyEvent> {
        return this.http
            .get<SingleEventResponse>(`events/${id}`)
            .pipe(map((resp: SingleEventResponse) => resp.event));
    }

    /**
     * Creates a new event on the server.
     *
     * @param {MyEventInsert} event - The event data to create (must exclude fields like `id`).
     * 
     * @returns {Observable<MyEvent>} - An observable resolving to the created event object.
     */
    addEvent(event: MyEventInsert): Observable<MyEventInsert> {
        return this.http
            .post<SingleEventResponse>("events", event)
            .pipe(map((resp: SingleEventResponse) => resp.event));
    }

    /**
     * Deletes an event from the server by its ID.
     *
     * @param {number} id - The unique identifier of the event to delete.
     * 
     * @returns {Observable<void>} - An observable that completes when the deletion is successful.
     */
    deleteEvent(id: number): Observable<void> {
        return this.http.delete<void>(`events/${id}`);
    }

    /**
     * Toggles attend status for an event on the server based on current attend status.
     *
     * @param {number} eventId - The ID of the event to toggle attend for.
     * @param {boolean} attending - The current attend status of the event.
     * 
     * @returns {Observable<boolean>} - An observable resolving to the updated attend status.
     */
    toggleAttend(eventId: number, attending: boolean): Observable<boolean> {
        return this.http
            .request<void>(attending ? "DELETE" : "POST", `events/${eventId}/attend`)
            .pipe(map(() => !attending));
    }

    // Events service → All operations related with events (including attending
    //     and comments).
}
