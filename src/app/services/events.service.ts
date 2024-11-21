import { inject, Injectable } from '@angular/core';
import { MyEvent } from '../interfaces/my-event';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { EventsResponse, SingleEventResponse } from '../interfaces/responses';

@Injectable({
    providedIn: 'root'
})
export class EventsService {
    #http = inject(HttpClient);

    /**
     * Fetches a list of events from the server.
     * 
     * @returns {Observable<MyEvent[]>} - An observable stream containing the list of events.
     */
    getEvents(): Observable<MyEvent[]> {
        return this.#http
            .get<EventsResponse>("events")
            .pipe(map((resp: EventsResponse) => resp.events));
    }

    /**
     * Fetches a certain event from the server.
     *
     * @param {number} id - The id of the event to fetch.
     * 
     * @returns {Promise<MyEvent>} - A promise resolving with the event data response.
     */
    getEvent(id: number): Observable<MyEvent> {
        return this.#http
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
    addEvent(event: MyEvent): Observable<MyEvent> {
        return this.#http.post<MyEvent>("events", event);
    }

    /**
     * Deletes an event from the server by its ID.
     *
     * @param {number} id - The unique identifier of the event to delete.
     * 
     * @returns {Observable<void>} - An observable that completes when the deletion is successful.
     */
    deleteEvent(id: number): Observable<void> {
        return this.#http.delete<void>(`events/${id}`);
    }
}
