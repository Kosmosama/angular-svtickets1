import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { GoogleLoginDirective } from '../google-login/google-login.directive';
import { ValidationClassesDirective } from '../../shared/directives/valdation-classes.directive';
import { UserLogin } from '../../shared/interfaces/user';
import { GeolocationService } from '../services/geolocation.service';

@Component({
    selector: 'login',
    standalone: true,
    imports: [ReactiveFormsModule, GoogleLoginDirective, ValidationClassesDirective],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    private fb = inject(NonNullableFormBuilder);
    loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
    }
    );

    loggedGoogle(resp: google.accounts.id.CredentialResponse) {
        // Envia esto tu API
        console.log(resp.credential);
    }

    login(): void {
        const user: UserLogin = {
            ...this.loginForm.getRawValue(),
            lat: 0,
            lng: 0,
        };

        GeolocationService.getLocation()
            .then((coords) => {
                user.lat = coords.latitude;
                user.lng = coords.longitude;
            })
            .catch((error) => {
                console.error('Error retrieving location:', error);
            });
    }

    // This page will contain a page with a form to log in (email, password) and
    // the Google and Facebook buttons for login/register. Validate the form (all fields
    // required).
    // Also geolocate the user here and send the coordinates with the login
    // information (lat, lng). This includes the normal login and also Google/Facebook
    // login
}
