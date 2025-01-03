export interface Alert {
  text: string;
  status: "success" | "error" | "info" | "warning";
}

export interface ToastContextType {
  alerts: Alert[];
  addToast: (alert: Alert) => void;
  removeToast: (index: number) => void;
}
