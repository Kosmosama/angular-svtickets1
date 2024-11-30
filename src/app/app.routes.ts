import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { EventsPageComponent } from "./events-page/events-page.component";
import { EventFormComponent } from "./event-form/event-form.component";
import { EventDetailComponent } from "./event-detail/event-detail.component";
import { numericIdGuard } from "./guards/numeric-id.guard";
import { leavePageGuard } from "./guards/leave-page.guard";

export const routes: Routes = [
    { path: "login", component:  LoginComponent, title: "Login | SVtickets"},
    { path: "events", component: EventsPageComponent, title: "Events | SVtickets"},
    { path: "events/add", canDeactivate: [leavePageGuard], component: EventFormComponent, title: "New Event | SVtickets"},
    { path: "events/:id", canActivate: [numericIdGuard], component:  EventDetailComponent, title: "Event | SVtickets"},
    { path: "", redirectTo: "/login", pathMatch: "full"},
    { path: "**", redirectTo: "/login" }
];
