import { Component } from '@angular/core';
import { MyEvent } from '../my-event';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'events-page',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './events-page.component.html',
    styleUrl: './events-page.component.css',
})
export class EventsPageComponent {
    events: MyEvent[] = [];

    newEvent: MyEvent = {
        title: '',
        description: '',
        price: 0,
        image: '',
        date: '',
    };

    addEvent() {
        if (this.newEvent.title && this.newEvent.date && this.newEvent.description && this.newEvent.price > 0 && this.newEvent.image) {
          const eventToPush = { ...this.newEvent, id: this.events.length + 1 };
          this.events.push(eventToPush);

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

    deleteEvent(eventId: number) {
        this.events = this.events.filter(event => event.id !== eventId);
    }
}
