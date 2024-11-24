import { Component, input, output } from '@angular/core';
import { MyEvent } from '../interfaces/my-event';
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

    /**
     * Emists its own id as a signal once the delete button is pressed.
     */
    deleteEvent() {
        this.deleted.emit(this.event().id!);
    }
}
