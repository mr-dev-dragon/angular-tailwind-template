import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { environment } from "../environments/environment";
import { BaseUrlInterceptor } from "./interceptors/base-url.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
    { provide: "BASE_API_URL", useValue: environment.apiUrl },
  ],
};
