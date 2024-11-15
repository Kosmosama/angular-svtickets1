import { ChangeDetectorRef, Component, inject, output, } from '@angular/core';
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
    added = output<MyEvent>();
    #changeDetector = inject(ChangeDetectorRef);
    id = 1;
    generator = this.generate();

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

    addEvent() {
        if (this.newEvent.title && this.newEvent.date && this.newEvent.description && this.newEvent.price > 0 && this.newEvent.image) {
            this.added.emit({ ...this.newEvent, id: this.generator.next().value });
            this.resetEvent();
        }
    }

    changeImage(fileInput: HTMLInputElement) {
        if (!fileInput.files || fileInput.files.length === 0) { return; }
        const reader: FileReader = new FileReader();
        reader.readAsDataURL(fileInput.files[0]);
        reader.addEventListener('loadend', () => {
            this.newEvent.image = reader.result as string;
            this.#changeDetector.markForCheck();
        });
    }

    resetEvent() {
        this.newEvent = { title: '', description: '', price: 0, image: '', date: '' };
        (document.getElementById("newEvent") as HTMLFormElement).reset();
    }
}