import { Component } from '@angular/core';

@Component({
    selector: 'profile-page',
    standalone: true,
    imports: [],
    templateUrl: './profile-page.component.html',
    styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {
  // Like in unit 1 project, this page will show an user’s profile information. If
  // you don’t receive an id, show the current logged user, otherwise show the user
  // with the id. Both routes will reuse the same component (profile-page).
  // Show also a map (and a marker) with the user coordinates.
  // Author: Arturo Bernal Mayordomo IES San Vicente 2024 / 2025 Page: 6
  // Show the edit (image, profile, password) buttons only if the profile is yours
  // (logged user).
  // In this component, put also 2 links that will show the following:
  // • Events this user has created Will go to the → /events page but sending a
  // query param named creator Example: /events?creator=49 →
  // • Events this user attends to Will go to the → /events page but sending a
  // query param named attending Example: /events?attending=49 →
  // To send query parameters to a route in a link, use the queryParams
  // attribute:
  // <a [routerLink]="['/events']" [queryParams]="{ creator: user.id }">Created events</a>
  // Use input (one for each query param) in the events-page component to
  // get the value. Keep in mind that this value is optional (maybe it’s not present).
  // In the effect function (constructor) where you load the events, include these 2
  // values and call the corresponding method to load the events based on these
  // options.
  // Add the corresponding text that indicates what the user is seeing at below
  // the search/order bar. Examples:
  // • Events created by Pepito. Filtered by party. Ordered by price.
  // • Events attended by Juana. Filtered by birth. Ordered by distance.
  // In order to get and show the user’s name (you only have the id), you can
  // call the service that returns the user profile information.
}
