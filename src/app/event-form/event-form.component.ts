import { Component, DestroyRef, inject, output } from "@angular/core";
import { MyEvent } from "../interfaces/my-event";
import { FormsModule } from "@angular/forms";
import { EncodeBase64Directive } from "../directives/encode-base64.directive";
import { EventsService } from "../services/events.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

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

    added = output<MyEvent>();

    newEvent: MyEvent = {
        title: "",
        description: "",
        price: 0,
        image: "",
        date: ""
    };
    // initializeEvent()

    /**
     * Handles adding a new event by interacting with the EventsService.
     * Emits the added event and resets the form upon success.
     */
    addEvent(): void {
        this.eventsService.addEvent(this.newEvent)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((something) => {
            console.log(something);
            this.added.emit(something); //#TODO
            this.resetForm();
        });
    }

    /**
     * Resets the form fields.
     */
    private resetForm(): void {
        this.newEvent = { title: "", description: "", price: 0, image: "", date: "" };
        const form = document.getElementById("newEvent") as HTMLFormElement | null;
        if (form) form.reset();
    }

    /**
     * Initializes a blank event object.
     * @returns A new event with default values.
     */
    private initializeEvent(): MyEvent {
        return {
            title: "",
            description: "",
            price: 0,
            image: "",
            date: "",
        };
    }
}