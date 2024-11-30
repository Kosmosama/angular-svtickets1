import { Component, effect, inject, input } from '@angular/core';
import { EventCardComponent } from "../event-card/event-card.component";
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MyEvent } from '../interfaces/my-event';

@Component({
    selector: 'event-detail',
    standalone: true,
    imports: [EventCardComponent],
    templateUrl: './event-detail.component.html',
    styleUrl: './event-detail.component.css'
})
export class EventDetailComponent {
    private titleService = inject(Title);
    private router = inject(Router);

    event = input.required<MyEvent>();

    constructor() {
        effect(() => {
            if(this.event()) {
                this.titleService.setTitle(this.event()!.title + ' | SVtickets');
            }
        });
    }

    /**
     * Redirects user to initial page.
     */
    goBack() {
        this.router.navigate(['/events']);
    }
}
