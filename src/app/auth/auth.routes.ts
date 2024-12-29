import { Routes } from "@angular/router";

export const routes: Routes = [
    { path: "login", loadComponent: () => import("./login/login.component").then((c) => c.LoginComponent), title: "Login | SVtickets"},
    { path: "register", loadComponent: () => import("./register/register.component").then((c) => c.RegisterComponent), title: "Register | SVtickets"},
];