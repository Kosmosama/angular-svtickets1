import { Routes } from "@angular/router";
import { numericIdGuard } from "../shared/guards/numeric-id.guard";
import { profileResolver } from "./resolvers/profile.resolver";

export const routes: Routes = [
    { path: "", resolve: { user: profileResolver }, loadComponent: () => import("./profile-page/profile-page.component").then((c) => c.ProfilePageComponent), title: "My Profile | SVtickets" },
    { path: ":id", resolve: { user: profileResolver }, canActivate: [numericIdGuard], loadComponent: () => import("./profile-page/profile-page.component").then((c) => c.ProfilePageComponent), title: "Profile | SVtickets"},
];
