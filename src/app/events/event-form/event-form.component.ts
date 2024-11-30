import { Component, DestroyRef, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Router } from "@angular/router";
import { MyEvent } from "../interfaces/my-event";
import { EncodeBase64Directive } from "../../shared/directives/encode-base64.directive";
import { EventsService } from "../services/events.service";
import { CanComponentDeactivate } from "../interfaces/can-component-deactivate";

@Component({
    selector: "event-form",
    standalone: true,
    imports: [FormsModule, EncodeBase64Directive],
    templateUrl: "./event-form.component.html",
    styleUrl: "./event-form.component.css"
})
export class EventFormComponent implements CanComponentDeactivate {
    private eventsService = inject(EventsService);
    private destroyRef = inject(DestroyRef);
    private router = inject(Router);
    saved = false;

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
        .subscribe(() => {
            this.saved = true;
            this.router.navigate(['/events']);
        });
    }

    /**
     * Determines whether the user can navigate away from the current page.
     * If there are unsaved changes, the user is prompted with a confirmation dialog.
     * 
     * @returns "True" if the changes were saved or the user confirms the dialog, otherwise "False".
     */
    canDeactivate() {
        return this.saved || confirm('¿Quieres abandonar la página?. Los cambios se perderán...');
    }
}