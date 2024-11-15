import { Component, input, output } from '@angular/core';
import { MyEvent } from '../my-event';
import { DatePipe } from '@angular/common';
import { IntlCurrencyPipe } from '../intl-currency.pipe';

@Component({
    selector: 'event-card',
    standalone: true,
    imports: [DatePipe, IntlCurrencyPipe],
    templateUrl: './event-card.component.html',
    styleUrl: './event-card.component.css'
})
export class EventCardComponent {
    event = input.required<MyEvent>();
    deleted = output<number>();

    deleteEvent() {
        this.deleted.emit(this.event().id!);
    }
}
