import { Component, EventEmitter, Output } from '@angular/core';
import { MyEvent } from '../my-event';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'event-form',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './event-form.component.html',
    styleUrl: './event-form.component.css'
})
export class EventFormComponent {
    @Output() added = new EventEmitter<MyEvent>();
    id = 1;

    public *generate(): Generator<number, number, unknown> {
        while (true) {
            yield this.id++;
        }
    }

    newEvent: MyEvent = {
        title: '',
        description: '',
        price: 0,
        image: '',
        date: '',
    };

    generator = this.generate();

    addEvent() {
        if (this.newEvent.title && this.newEvent.date && this.newEvent.description && this.newEvent.price > 0 && this.newEvent.image) {
            const eventToPush = { ...this.newEvent, id: this.generator.next().value }; // this.events.length + 1
            this.added.emit(eventToPush);

            this.newEvent = { title: '', description: '', price: 0, image: '', date: '' };

            (document.getElementById("newEvent") as HTMLFormElement).reset();
        }
    }

    changeImage(fileInput: HTMLInputElement) {
        if (!fileInput.files || fileInput.files.length === 0) { return; }
        const reader: FileReader = new FileReader();
        reader.readAsDataURL(fileInput.files[0]);
        reader.addEventListener('loadend', () => {
            this.newEvent.image = reader.result as string;
        });
    }
}