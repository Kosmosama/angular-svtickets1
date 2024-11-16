import { Component, computed, signal } from '@angular/core';
import { MyEvent } from '../interfaces/my-event';
import { EventFormComponent } from '../event-form/event-form.component';
import { EventCardComponent } from '../event-card/event-card.component';

@Component({
    selector: 'events-page',
    standalone: true,
    imports: [EventFormComponent, EventCardComponent],
    templateUrl: './events-page.component.html',
    styleUrl: './events-page.component.css',
})
export class EventsPageComponent {
    events = signal<MyEvent[]>([]);
    searchValue = signal<string>("");
    filteredEvents = computed(() => {
        const search = this.searchValue().toLowerCase().trim();
        return this.events().filter(event =>
            event.title.toLowerCase().includes(search) ||
            event.description.toLowerCase().includes(search)
        );
    });

    addEvent(event: MyEvent) {
        this.events.set([...this.events(), event]);
    }

    deleteEvent(id: number) {
        this.events.set(this.events().filter(event => event.id !== id));
    }

    onSearchInput(event: Event) {
        // If I dont do this it doesnt work
        const input = event.target as HTMLInputElement;
        this.searchValue.set(input.value);
    }

    orderByDate() {
        this.events.set(
            this.events().toSorted((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        );
    }
    
    orderByPrice() {
        this.events.set(
            this.events().toSorted((a, b) => a.price - b.price)
        );
    }
}
