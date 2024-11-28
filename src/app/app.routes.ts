import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EventsPageComponent } from './events-page/events-page.component';
import { EventFormComponent } from './event-form/event-form.component';
import { EventDetailComponent } from './event-detail/event-detail.component';

export const routes: Routes = [
    { path: 'login', component:  LoginComponent},
    { path: 'events', component: EventsPageComponent },
    { path: 'events/add', component: EventFormComponent },
    { path: 'events/:id', component:  EventDetailComponent},
    { path: '', redirectTo: '/login’', pathMatch: 'full' },
    { path: '**', redirectTo: '/login’' }
];
