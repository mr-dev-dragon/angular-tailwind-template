import { Injectable } from "@angular/core";
import { Notification } from "../../types/Notification.type";

@Injectable({
  providedIn: "root",
})
export class NotificationsService {
  notifications = new Set<Notification>();

  public add(notification: Notification, duration = 5) {
    this.notifications.add(notification);
    setTimeout(() => {
      this.remove(notification);
    }, duration * 1000);
  }

  public remove(notification: Notification) {
    this.notifications.delete(notification);
  }
}
