import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, Signal, WritableSignal, computed, isDevMode, signal } from "@angular/core";
import { Router } from "@angular/router";
import { firstValueFrom, lastValueFrom } from "rxjs";
import AccessToken from "../types/AccessToken.type";
import { NotificationsService } from "../../shared/services/notifications/notifications.service";
import { NotificationType } from "../../shared/types/Notification.type";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private accessToken: WritableSignal<string> = signal("");
  public isLoggedIn: Signal<boolean> = computed(() => {
    if (this.accessToken() !== "") return true;
    return false;
  });

  constructor(
    private http: HttpClient,
    private router: Router,
    private notification: NotificationsService,
  ) {
    const localToken = window.localStorage.getItem("access_token") || "";
    if (this.isTokenValid(localToken)) this.accessToken.set(localToken);
  }

  async login(username: string, password: string) {
    try {
      const response = await lastValueFrom(this.http.post<{ accessToken: string }>("auth/login", { username, password }));
      const isCorrect = this.setAccessToken(response.accessToken);
      isCorrect && this.redirectUser();
    } catch (error) {
      this.notification.add({
        type: NotificationType.Error,
        title: "Failed to login",
      });
      throw new HttpErrorResponse({ statusText: "Failed to login", error: error });
    }
  }

  logout() {
    window.localStorage.removeItem("access_token");
    this.accessToken.set("");
    this.router.navigate(["/login"]);
  }

  async register(email: string, password: string) {
    try {
      const response = await firstValueFrom(this.http.post<{ accessToken: string }>("auth/register", { email, password }));
      const isCorrect = this.setAccessToken(response.accessToken);
      isCorrect && this.redirectUser();
    } catch (error) {
      throw new HttpErrorResponse({ statusText: "Failed to register", error: error });
    }
  }

  getAccessToken(): string {
    if (!this.accessToken) throw new Error("User is not logged in");

    return this.accessToken();
  }

  private redirectUser() {
    const redirectURL = window.localStorage.getItem("redirectURL") || "";
    if (redirectURL !== "") {
      window.localStorage.removeItem("redirectURL");
      this.router.navigate([redirectURL]);
    } else {
      this.router.navigate(["/"]);
    }
  }

  private setAccessToken(accessToken: string): boolean {
    if (this.isTokenValid(accessToken)) {
      window.localStorage.setItem("access_token", this.accessToken());
      this.accessToken.set(accessToken);
      return true;
    } else {
      return false;
    }
  }

  private isTokenValid(accessToken: string): boolean {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (accessToken.trim() === "") {
      console.info("No access token in the local storage");
      return false;
    }

    try {
      const decodedToken = this.parseJwt(accessToken) as AccessToken;
      if (decodedToken.exp < currentTimestamp) {
        return false;
      }
      return true;
    } catch (error) {
      isDevMode() && console.error("Failed to decode JWT:", error);
      return false;
    }
  }

  private parseJwt(token: string) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(""),
    );

    return JSON.parse(jsonPayload);
  }
}
