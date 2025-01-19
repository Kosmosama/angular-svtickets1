import { Routes } from "@angular/router";
import { leavePageGuard } from "../shared/guards/leave-page.guard";
import { numericIdGuard } from "../shared/guards/numeric-id.guard";
import { eventResolver } from "./resolvers/event.resolver";

export const routes: Routes = [
    { path: "", loadComponent: () => import("./events-page/events-page.component").then((c) => c.EventsPageComponent), title: "Events | SVtickets"},
    { path: "add", canDeactivate: [leavePageGuard], loadComponent: () => import("./event-form/event-form.component").then((c) => c.EventFormComponent), title: "New Event | SVtickets"},
    { path: ":id", canActivate: [numericIdGuard], loadComponent: () => import("./event-detail/event-detail.component").then((c) => c.EventDetailComponent), resolve: { event: eventResolver }, title: "Event | SVtickets"},
    // { path: "edit/:id", canActivate: [numericIdGuard], canDeactivate: [leavePageGuard], loadComponent: () => import("./event-detail/event-detail.component").then((c) => c.EventDetailComponent), resolve: { event: eventResolver }, title: "Edit event | SVtickets"},
];
