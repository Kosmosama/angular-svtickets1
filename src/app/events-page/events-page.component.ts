import { Component, computed, inject, signal } from '@angular/core';
import { MyEvent } from '../interfaces/my-event';
import { EventFormComponent } from '../event-form/event-form.component';
import { EventCardComponent } from '../event-card/event-card.component';
import { EventsService } from '../services/events.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'events-page',
    standalone: true,
    imports: [EventFormComponent, EventCardComponent],
    templateUrl: './events-page.component.html',
    styleUrl: './events-page.component.css',
})
export class EventsPageComponent {
    private eventsService = inject(EventsService);

    events = signal<MyEvent[]>([]);
    searchValue = signal<string>("");
    orderCriteria = signal<string>("distance");
    filteredEvents = computed(() => {
        const search = this.searchValue().toLowerCase().trim();
        return this.events().filter(event =>
            event.title.toLowerCase().includes(search) ||
            event.description.toLowerCase().includes(search)
        );
    });

    constructor() {
        this.fetchEvents();
    }

    addEvent(event: MyEvent) {
        this.events.update((events) => [...events, event]);
    }

    /**
     * Fetch events from the server.
     */
    fetchEvents(): void {
        this.eventsService.getEvents()
            .pipe(takeUntilDestroyed())
            .subscribe((events) => {
                this.events.set(events);
            });
    }

    /**
     * Delete an event from the server and update the local state.
     * @param id The ID of the event to delete.
     */
    deleteEvent(id: number): void {
        this.eventsService
            .deleteEvent(id)
            .subscribe(() => {
                this.fetchEvents();
            });
    }

    /**
     * Handle input changes in the search box.
     * @param event The input event from the search box.
     */
    onSearchInput(event: Event): void {
        this.fetchEvents();
        const input = event.target as HTMLInputElement;
        this.searchValue.set(input.value);
    }

    /**
     * Order events by date and refetch from the server.
     */
    orderByDate(): void {
        this.fetchEvents();
        this.orderCriteria.set("date");
    }

    /**
     * Order events by price and refetch from the server.
     */
    orderByPrice(): void {
        this.fetchEvents();
        this.orderCriteria.set("price");
    }
}
