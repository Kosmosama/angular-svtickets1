import { Component } from '@angular/core';
import { MyEvent } from '../my-event';

@Component({
    selector: 'events-page',
    standalone: true,
    imports: [],
    templateUrl: './events-page.component.html',
    styleUrl: './events-page.component.css',
})
export class EventsPageComponent {
    events: MyEvent[] = [];

    newEvent: MyEvent = {
        title: '',
        description: '',
        price: 0,
        image: '',
        date: '',
    };
}
