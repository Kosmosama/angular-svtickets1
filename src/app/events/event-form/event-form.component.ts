import { Component, DestroyRef, effect, inject, input, signal } from "@angular/core";
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Router } from "@angular/router";
import { MyEvent, MyEventInsert } from "../../shared/interfaces/my-event";
import { EncodeBase64Directive } from "../../shared/directives/encode-base64.directive";
import { EventsService } from "../services/events.service";
import { CanComponentDeactivate } from "../../shared/interfaces/can-component-deactivate";
import { ValidationClassesDirective } from "../../shared/directives/valdation-classes.directive";
import { minDateValidator } from "../../shared/directives/min-date.directive";
import { DatePipe } from "@angular/common";
import { OlMapDirective } from "../../ol-maps/ol-map.directive";
import { OlMarkerDirective } from "../../ol-maps/ol-marker.directive";
import { GaAutocompleteDirective } from "../../ol-maps/ga-autocomplete.directive";
import { SearchResult } from "../../ol-maps/search-result";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmModalComponent } from "../../shared/modals/confirm-modal/confirm-modal.component";

@Component({
    selector: "event-form",
    standalone: true,
    imports: [ReactiveFormsModule, EncodeBase64Directive, ValidationClassesDirective, DatePipe, OlMapDirective, OlMarkerDirective, GaAutocompleteDirective],
    templateUrl: "./event-form.component.html",
    styleUrl: "./event-form.component.css"
})
export class EventFormComponent implements CanComponentDeactivate {
    private eventsService = inject(EventsService);
    private destroyRef = inject(DestroyRef);
    private router = inject(Router);
    private modalService = inject(NgbModal);

    saved = false;
    today: string = new Date().toISOString().split('T')[0];
    base64image = "";
    address = "";
    coordinates = signal<[number, number]>([-0.5, 38.5]);

    event = input<MyEvent>();

    changePlace(result: SearchResult) {
        this.coordinates.set(result.coordinates);
        this.address = result.address;
    }

    private fb = inject(NonNullableFormBuilder);
    eventForm = this.fb.group({
        title: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[a-zA-Z][a-zA-Z ]*$')]],
        date: ['', [Validators.required, minDateValidator(this.today)]],
        description: ['', [Validators.required]],
        price: [0, [Validators.required, Validators.min(0.1)]],
        image: ['', [Validators.required]],
    });

    constructor() {
        effect(() => {
            if (this.event()) {
                this.eventForm.get('title')?.setValue(this.event()!.title);
                this.eventForm.get('date')?.setValue(this.event()!.date.split(' ')[0]);
                this.eventForm.get('description')?.setValue(this.event()!.description);
                this.eventForm.get('price')?.setValue(this.event()!.price);
                this.coordinates.set([this.event()!.lat, this.event()!.lng]);
                this.address = this.event()!.address;
                this.base64image = this.event()!.image;
                this.eventForm.markAllAsTouched();
            }
        });
    }

    /**
     * Handles adding a new event by interacting with the EventsService.
     * Navigates user back to "/events" upon creation.
     */
    submitNewEvent(): void {
        const [lng, lat] = this.coordinates();
        const event: MyEventInsert = {
            ...this.eventForm.getRawValue(),
            image: this.base64image,
            address: this.address,
            lat: lat,
            lng: lng
        };

        this.eventsService.saveEvent(event, this.event()?.id)
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
     * @returns "True" if the changes were saved, form values were not changed or the user confirms the dialog, otherwise "False".
     */
    canDeactivate() {
        if (this.saved || this.eventForm.pristine) return true;

        const modalRef = this.modalService.open(ConfirmModalComponent);
        modalRef.componentInstance.title = 'Changes will not be saved';
        modalRef.componentInstance.body = 'Do you want to leave the page?. Changes will be lost...';
        return modalRef.result.catch(() => false);
    }

    /**
     * Checks whether the image input change actually placed a valid image, if the image was invalid,
     * sets image preview to hidden once again.
     * 
     * @param fileInputElement Input element that contains the files.
     */
    checkImage(fileInputElement: HTMLInputElement) {
        if (!fileInputElement.files || fileInputElement.files.length === 0) this.base64image = '';
    }
}