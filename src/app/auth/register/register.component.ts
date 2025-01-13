import { Component } from '@angular/core';

@Component({
    selector: 'register',
    imports: [],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {
  // This page will contain a form for the user to register. Create the same form
  // used in unit 1 project and validate it in the client side: all fields are required,
  // email fields must be of type email, and password must have at least 4
  // characters .
  // Also, create a validator that validates that both emails are equal. Put the
  // error message for this validator below the “repeat email” input (with the
  // corresponding css class for that input). You can create a group validator to
  // check both values, or just create a normal validator that you put on the second
  // email field and receives the first email field as the input value.
  // Don’t forget to geolocate the user and send the coordinates to the server.
}
