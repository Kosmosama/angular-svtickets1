import { Component, EventEmitter, Input, Output } from '@angular/core';
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
    @Input({required: true}) event!: MyEvent;
    @Output() deleted = new EventEmitter<number>();

    deleteEvent() {
        this.deleted.emit(this.event.id);
    }
}
