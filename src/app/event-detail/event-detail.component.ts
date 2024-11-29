import { Component, effect, inject, input, numberAttribute } from '@angular/core';
import { EventCardComponent } from "../event-card/event-card.component";
import { EventsService } from '../services/events.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
    selector: 'event-detail',
    imports: [EventCardComponent],
    templateUrl: './event-detail.component.html',
    styleUrl: './event-detail.component.css'
})
export class EventDetailComponent {
    private titleService = inject(Title);
    private eventsService = inject(EventsService);
    private router = inject(Router);


    id = input.required({ transform: numberAttribute });

    event = toSignal(
        toObservable(this.id).pipe(
            switchMap((id) => this.eventsService.getEvent(id))
        )
    );

    constructor() {
        effect(() => {
            if(this.event()) {
                this.titleService.setTitle(this.event()!.title + ' | SVtickets');
            }
        });
    }

    goBack() {
        this.router.navigate(['/events']);
      }
}
