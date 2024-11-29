import { Component, DestroyRef, inject, input, output } from '@angular/core';
import { MyEvent } from '../interfaces/my-event';
import { DatePipe } from '@angular/common';
import { IntlCurrencyPipe } from '../intl-currency.pipe';
import { RouterLink } from '@angular/router';
import { EventsService } from '../services/events.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'event-card',
    standalone: true,
    imports: [DatePipe, IntlCurrencyPipe, RouterLink],
    templateUrl: './event-card.component.html',
    styleUrl: './event-card.component.css'
})
export class EventCardComponent {
    event = input.required<MyEvent>();
    deleted = output<number>();
    private destroyRef = inject(DestroyRef);
    private eventsService = inject(EventsService);

    /**
     * Deletes himself from server and emits its own id upon deletion.
     */
    deleteEvent() {
        this.eventsService.deleteEvent(this.event().id!)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => this.deleted.emit(this.event().id!));
    }
}
