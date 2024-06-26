import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";

import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { environment } from "../environments/environment";
import { routes } from "./app.routes";
import { BaseUrlInterceptor } from "./interceptors/base-url.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
    { provide: "BASE_API_URL", useValue: environment.apiUrl },
  ],
};
