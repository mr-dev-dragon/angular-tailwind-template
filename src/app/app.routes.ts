import { Routes } from "@angular/router";
import { isNotLoggedInGuard } from "./auth/guards/is-not-logged-in.guard";

export const routes: Routes = [
  {
    path: "login",
    loadComponent: () => import("./auth/components/login-page/login-page.component").then((m) => m.LoginPageComponent),
    canActivate: [isNotLoggedInGuard],
  },
  {
    path: "register",
    loadComponent: () => import("./auth/components/register-page/register-page.component").then((m) => m.RegisterPageComponent),
    canActivate: [isNotLoggedInGuard],
  },
  {
    path: "recover-password",
    loadComponent: () =>
      import("./auth/components/recover-password-page/recover-password-page.component").then((m) => m.RecoverPasswordPageComponent),
  },
];
