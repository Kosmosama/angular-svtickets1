import { Routes } from "@angular/router";
import { numericIdGuard } from "../shared/guards/numeric-id.guard";

export const routes: Routes = [
    { path: "", loadComponent: () => import("./profile-page/profile-page.component").then((c) => c.ProfilePageComponent), title: "Profile | SVtickets" },
    { path: ":id", canActivate: [numericIdGuard], loadComponent: () => import("./profile-page/profile-page.component").then((c) => c.ProfilePageComponent), title: "Event | SVtickets"},
    // ^ resolve: { event: eventResolver }, BUT profileResolver
];
