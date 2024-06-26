import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NotificationsService } from "../../../shared/services/notifications/notifications.service";
import { NotificationType } from "../../../shared/types/Notification.type";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-login-page",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: "./login-page.component.html",
  styleUrl: "./login-page.component.css",
})
export class LoginPageComponent {
  loginForm = this.fb.group({
    email: ["", [Validators.required, Validators.minLength(5)]],
    password: ["", [Validators.required]],
  });

  constructor(
    private router: Router,
    private auth: AuthService,
    private fb: FormBuilder,
  ) {}

  async login() {
    const formValues = this.loginForm.value;
    if (this.loginForm.invalid) return;

    await this.auth.login(formValues.email!, formValues.password!);
  }

  register() {
    this.router.navigate(["/register"]);
  }

  forgotPassword() {
    this.router.navigate(["/recover-password"]);
  }
}
