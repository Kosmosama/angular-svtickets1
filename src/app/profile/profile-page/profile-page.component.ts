import { Component, input, signal } from '@angular/core';
import { User } from '../../shared/interfaces/user';
import { OlMapDirective } from '../../ol-maps/ol-map.directive';
import { OlMarkerDirective } from '../../ol-maps/ol-marker.directive';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'profile-page',
    standalone: true,
    imports: [RouterLink, OlMapDirective, OlMarkerDirective, ReactiveFormsModule],
    templateUrl: './profile-page.component.html',
    styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {
    user = input.required<User>();

    showProfileInfo = signal(true);
    showProfileForm = signal(false);
    showPasswordForm = signal(false);

    editProfile() {
        this.showProfileInfo.set(false);
        this.showProfileForm.set(true);
        this.showPasswordForm.set(false);
    }

    editPassword() {
        this.showProfileInfo.set(false);
        this.showProfileForm.set(false);
        this.showPasswordForm.set(true);
    }

    cancelEdit() {
        this.showProfileInfo.set(true);
        this.showProfileForm.set(false);
        this.showPasswordForm.set(false);
    }
}
