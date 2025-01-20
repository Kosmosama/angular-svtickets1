import { Routes } from "@angular/router";
import { loginActivateGuard } from "./shared/guards/login-activate.guard";
import { logoutActivateGuard } from "./shared/guards/logout-activate.guard";

export const routes: Routes = [
    { path: "", redirectTo: "/auth/login", pathMatch: "full"},
    
    { path: "auth", canActivate: [logoutActivateGuard], loadChildren: () => import("./auth/auth.routes").then(r => r.routes) }, // 
    { path: "events", canActivate: [loginActivateGuard], loadChildren: () => import("./events/event.routes").then(r => r.routes) },
    { path: "profile", canActivate: [loginActivateGuard], loadChildren: () => import("./profile/profile.routes").then(r => r.routes) },
    
    { path: "error", loadComponent: () => import("./shared/error/error.component").then((c) => c.ErrorComponent), title: "Error | SVtickets" },
    
    { path: "**", redirectTo: "error" }
];

// SSR? https://fullstackpro.es/courses/curso-angular/server-side-rendering