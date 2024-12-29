import { Component, inject } from '@angular/core';
import { LoadGoogleApiService } from '../google-login/load-google-api.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { GoogleLoginDirective } from '../google-login/google-login.directive';
import { ValidationClassesDirective } from '../../shared/directives/valdation-classes.directive';

@Component({
    selector: 'login',
    standalone: true,
    imports: [ReactiveFormsModule, GoogleLoginDirective, ValidationClassesDirective],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    private loadGoogle = inject(LoadGoogleApiService);

    private fb = inject(NonNullableFormBuilder);
    loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)]],
        password: ['', [Validators.required]]}
    );

    constructor() {
        this.loadGoogle.credential$.
            pipe(takeUntilDestroyed())
            .subscribe(
                resp => console.log(resp.credential) // Envia esto tu API
            );
    }

    login(): void {
        console.log("login");
    }

    // This page will contain a page with a form to log in (email, password) and
    // the Google and Facebook buttons for login/register. Validate the form (all fields
    // required).
    // Also geolocate the user here and send the coordinates with the login
    // information (lat, lng). This includes the normal login and also Google/Facebook
    // login
}
