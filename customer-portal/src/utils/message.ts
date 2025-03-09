import { useNotifications } from "@toolpad/core/useNotifications";
import { ReactNode } from "react";

export function useMessage() {
  const notifications = useNotifications();
  return {
    message: (
      severity: "success" | "info" | "error" | "warning" | undefined,
      message: ReactNode,
      time?: number
    ) => {
      notifications.show(message, {
        severity: severity,
        autoHideDuration: time,
        key: message?.toString(),
      });
    },
  };
}
