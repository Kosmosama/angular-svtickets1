import { Component, DestroyRef, inject } from "@angular/core";
import { MyEvent } from "../interfaces/my-event";
import { FormsModule } from "@angular/forms";
import { EncodeBase64Directive } from "../directives/encode-base64.directive";
import { EventsService } from "../services/events.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Router } from "@angular/router";

@Component({
    selector: "event-form",
    standalone: true,
    imports: [FormsModule,EncodeBase64Directive],
    templateUrl: "./event-form.component.html",
    styleUrl: "./event-form.component.css"
})
export class EventFormComponent {
    private eventsService = inject(EventsService);
    private destroyRef = inject(DestroyRef);
    private router = inject(Router);

    newEvent: MyEvent = {
        title: "",
        description: "",
        price: 0,
        image: "",
        date: ""
    };

    /**
     * Handles adding a new event by interacting with the EventsService.
     * Navigates user back to "/events" upon creation.
     */
    submitNewEvent(): void {
        this.eventsService.addEvent(this.newEvent)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => this.router.navigate(['/events']));
    }
}