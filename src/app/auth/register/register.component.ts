import { Component, DestroyRef, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AbstractControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { EncodeBase64Directive } from '../../shared/directives/encode-base64.directive';
import { User } from '../../shared/interfaces/user';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ValidationClassesDirective } from '../../shared/directives/valdation-classes.directive';
import { Router, RouterLink } from '@angular/router';
import { GeolocationService } from '../services/geolocation.service';

@Component({
    selector: 'register',
    standalone: true,
    imports: [EncodeBase64Directive, ReactiveFormsModule, ValidationClassesDirective, RouterLink],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {
    private authService = inject(AuthService);
    private fb = inject(NonNullableFormBuilder);
    private router = inject(Router);
    private destroyRef = inject(DestroyRef);

    base64image = "";

    emailMatchValidator: ValidatorFn = ({ get }: AbstractControl): ValidationErrors | null => 
        get('email')?.value === get('repeatEmail')?.value ? null : { emailMismatch: true };    

    registerForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        repeatEmail: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(4)]],
        lat: [0],
        lng: [0],
        avatar: ['', Validators.required],
    }, { validators: this.emailMatchValidator });

    /**
     * Checks whether the image input change actually placed a valid image, if the image was invalid,
     * sets image preview to hidden once again.
     * 
     * @param fileInputElement Input element that contains the files.
     */
    checkImage(fileInputElement: HTMLInputElement) {
        if (!fileInputElement.files || fileInputElement.files.length === 0) this.base64image = '';
    }

    /**
     * Submits the registration form and navigates to the login page upon success.
     */
    register() {
        const user: User = {
            ...this.registerForm.getRawValue(),
            avatar: this.base64image,
        };
        console.log(user);

        this.authService
            .register(user)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
                this.router.navigate(['/auth/login']);
            });
    }

    constructor() {
        GeolocationService.getLocation()
            .then((coords) => {
                this.registerForm.get('lat')?.setValue(coords.latitude);
                this.registerForm.get('lng')?.setValue(coords.longitude);
            })
            .catch((err) => {
                console.log(err);
            });
    }
}
