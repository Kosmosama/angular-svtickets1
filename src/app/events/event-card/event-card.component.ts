import { ChangeDetectorRef, Component, DestroyRef, inject, input, output, viewChild } from '@angular/core';
import { MyEvent } from '../../shared/interfaces/my-event';
import { DatePipe } from '@angular/common';
import { IntlCurrencyPipe } from '../../shared/pipes/intl-currency.pipe';
import { RouterLink } from '@angular/router';
import { EventsService } from '../services/events.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SwalComponent, SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@Component({
    selector: 'event-card',
    standalone: true,
    imports: [DatePipe, IntlCurrencyPipe, RouterLink, SweetAlert2Module],
    templateUrl: './event-card.component.html',
    styleUrl: './event-card.component.css'
})
export class EventCardComponent {
    private destroyRef = inject(DestroyRef);
    private eventsService = inject(EventsService);
    private cdr = inject(ChangeDetectorRef);

    event = input.required<MyEvent>();
    deleted = output<number>();

    /**
     * Deletes himself from server and emits its own id upon deletion.
     */
    deleteEvent() {
        this.eventsService
            .deleteEvent(this.event().id!)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => this.deleted.emit(this.event().id!));
    }

    /**
     * Toggles attend status for the event.
     */
    attendEvent() {
        this.eventsService
            .toggleAttend(this.event().id!, this.event().attend)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((updatedStatus) => {
                this.event().attend = updatedStatus;
                this.event().numAttend += updatedStatus ? 1 : -1;
                this.cdr.markForCheck();
            });
    }
}
