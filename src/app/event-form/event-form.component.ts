import { Component, inject, output } from "@angular/core";
import { MyEvent } from "../interfaces/my-event";
import { FormsModule } from "@angular/forms";
import { EncodeBase64Directive } from "../directives/encode-base64.directive";
import { EventsService } from "../services/events.service";

@Component({
    selector: "event-form",
    standalone: true,
    imports: [FormsModule,EncodeBase64Directive],
    templateUrl: "./event-form.component.html",
    styleUrl: "./event-form.component.css"
})
export class EventFormComponent {
    private eventsService = inject(EventsService);
    added = output<MyEvent>();

    newEvent: MyEvent = {
        title: "",
        description: "",
        price: 0,
        image: "",
        date: "",
    };

    /**
     * Adds a new event.
     */
    addEvent(): void {
        this.eventsService.addEvent(this.newEvent)
            .subscribe(() => {
                this.added.emit(this.newEvent);
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
}