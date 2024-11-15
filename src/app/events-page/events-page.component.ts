import { Component } from '@angular/core';
import { MyEvent } from '../my-event';
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
    events: MyEvent[] = [];
    filteredEvents: MyEvent[] = this.events;

    addEvent(event: MyEvent) {
        this.events.push(event);
    }

    deleteEvent(id: number) {
        this.events = this.events.filter(event => event.id !== id);
    }
}
