import { bootstrapApplication } from "@angular/platform-browser";
import { appConfig } from "./app/app.config";
import { AppComponent } from "./app/app.component";
// @ts-expect-error
import nightwind from "nightwind/helper";

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));

nightwind.initNightwind();
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
  nightwind.toggle();
});
