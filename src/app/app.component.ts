import { Component } from '@angular/core';
import { EventsPageComponent } from './events-page/events-page.component';
import { RouterOutlet } from '@angular/router';
import { TopMenuComponent } from "./top-menu/top-menu.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [EventsPageComponent, RouterOutlet, TopMenuComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
}
