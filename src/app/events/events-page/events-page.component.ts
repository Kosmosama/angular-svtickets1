import { Component, DestroyRef, computed, inject, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { EventCardComponent } from "../event-card/event-card.component";
import { EventsService } from "../services/events.service";
import { MyEvent } from "../../shared/interfaces/my-event";

@Component({
    selector: "events-page",
    standalone: true,
    imports: [EventCardComponent],
    templateUrl: "./events-page.component.html",
    styleUrl: "./events-page.component.css",
})
export class EventsPageComponent {
    private eventsService = inject(EventsService);
    private destroyRef = inject(DestroyRef);

    events = signal<MyEvent[]>([]);
    searchValue = signal<string>("");
    orderCriteria = signal<string>("distance");

    filteredEvents = computed(() => {
        const search = this.searchValue().toLowerCase().trim();
        const criteria = this.orderCriteria();

        // Filter based on search value
        let filtered = this.events().filter(event =>
            event.title.toLowerCase().includes(search) || event.description.toLowerCase().includes(search)
        );

        // Apply sorting based on criteria
        if (criteria === 'date') {
            filtered = filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        } else if (criteria === 'price') {
            filtered = filtered.sort((a, b) => a.price - b.price);
        }

        return filtered;
    });

    constructor() {
        this.fetchEvents();
    }

    /**
     * Fetches the list of events from the server and updates local state.
     */
    fetchEvents(): void {
        this.eventsService.getEvents()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(events => this.events.set(events));
    }

    /**
     * Deletes an event by ID, updates the server, and refreshes local state.
     * 
     * @param id The ID of the event to delete.
     */
    handleEventDeleted(id: number): void {
        this.eventsService.deleteEvent(id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => this.fetchEvents());
    }

    /**
     * Updates the search value based on user input and refilters events.
     * 
     * @param event The input event from the search box.
     */
    onSearchInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.searchValue.set(input.value);
    }

    /**
     * Updates order criteria signal.
     */
    orderBy(method: string): void {
        this.orderCriteria.set(method);
    }

//     This page will show all posts (like in previous exercises). Use the same card
// you used in unit 1 project.
// The button to attend an event (/events/:id/attend) is now mandatory and
// must work updating the number of people attending (and the attend boolean),
// and also the text color and the icon.
// In the card (important → if the event is yours):
// • Put the button to delete the post (this will show a confirm dialog asking if
// you’re sure you want to delete it using ngBootstrap o ngx-sweetalert2).
// • Put a button to edit the post (below the description for example). The
// edit button will go to /event/:id/edit. It can be a link with the btn classes.
// Example: <a class=”btn btn-primary” ...>Edit</a>.
// Filtering the events
// You must filter and order the events like you did in the TypeScript project.
// You can choose 2 ways of doing this:
// Traditional
// Search and ordering, and next page will be activated by click events. The
// events will call methods that change the search, page, or order value, and then
// call another method to load events based on these values
// Reactive (+0,25 points)
// • The search input’s value will be stored in a signal. Use debounceTime
// (600ms) and toSignal to update the value like we’ve seen in class.
// ◦ Reactive forms (FormControl)
// Author: Arturo Bernal Mayordomo IES San Vicente 2024 / 2025 Page: 4
// ◦ Template forms (ngForm)
// • The order value (distance, price, date) will be in a signal also (change it
// with the corresponding buttons.
// • The page to load will be also be a signal
// • Use the effect function and create dependencies reading the values of the
// 3 signals above. After that call the corresponding service to load the
// events based on these search params.
// In both approaches, if the page === 1 replace the events array with the result,
// and if the page is > 1, concatenate the events returned from the server to the
// array.
// Don't use the new Angular 19 rxResource API, because it can't concatenate
// the results (page > 1) to the existing events array. It will always replace it.
}
