import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'top-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.css'
})
export class TopMenuComponent {
  // In the Menu component, show only the menu links when the user is not
  // logged. Create a computed signal with the same value as the logged signal in
  // the AuthService service.
  // The logout functionality is also handled by this component. Call
  // AuthService.logout() to remove the token.
}
