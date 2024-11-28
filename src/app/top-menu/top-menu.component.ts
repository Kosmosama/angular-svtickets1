import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'top-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.css'
})
export class TopMenuComponent {

}
