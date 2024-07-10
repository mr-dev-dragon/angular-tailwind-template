export interface Notification {
  type: "error" | "info" | "success" | "warning" | "normal";
  title: string;
  description?: string;
}
