import { Component, computed, DestroyRef, inject, signal } from "@angular/core";
import { MyEvent } from "../interfaces/my-event";
import { EventFormComponent } from "../event-form/event-form.component";
import { EventCardComponent } from "../event-card/event-card.component";
import { EventsService } from "../services/events.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
    selector: "events-page",
    standalone: true,
    imports: [EventFormComponent, EventCardComponent],
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
     * Adds a new event to the local events state.
     * 
     * @param event The event to be added.
     */
    addEvent(event: MyEvent): void {
        // console.log(event);
        this.events.update(events => [...events, event]);
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
    deleteEvent(id: number): void {
        console.log("Id: " + id);
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
}
