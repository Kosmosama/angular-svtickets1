import { Component, output } from "@angular/core";
import { MyEvent } from "../interfaces/my-event";
import { FormsModule } from "@angular/forms";
import { EncodeBase64Directive } from "../directives/encode-base64.directive";

@Component({
    selector: "event-form",
    standalone: true,
    imports: [FormsModule,EncodeBase64Directive],
    templateUrl: "./event-form.component.html",
    styleUrl: "./event-form.component.css"
})
export class EventFormComponent {
    added = output<MyEvent>();
    id = 1;
    generator = this.generate();

    // Could be done in the events-page easily but I've always wanted to use a generator function
    public *generate(): Generator<number, number, unknown> {
        while (true) {
            yield this.id++;
        }
    }

    newEvent: MyEvent = {
        title: "",
        description: "",
        price: 0,
        image: "",
        date: "",
    };

    addEvent() {
        if (this.newEvent.title && this.newEvent.date && this.newEvent.description && this.newEvent.price > 0 && this.newEvent.image) {
            this.added.emit({ ...this.newEvent, id: this.generator.next().value });
            this.resetEvent();
        }
    }

    resetEvent() {
        this.newEvent = { title: "", description: "", price: 0, image: "", date: "" };
        (document.getElementById("newEvent") as HTMLFormElement).reset();
    }
}