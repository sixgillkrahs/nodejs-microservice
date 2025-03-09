import "./App.css";
import Routes from "./utils/routes";
import { IntlProvider } from "react-intl";
import messages from "./locales";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Color from "./utils/color";
import {
  NotificationsProvider,
  NotificationsProviderSlotProps,
} from "@toolpad/core/useNotifications";

const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#000",
    },
    warning: {
      main: Color.orangeRed[50],
    },
  },
});

const slotProps: Partial<NotificationsProviderSlotProps> | undefined = {
  snackbar: {
    anchorOrigin: { vertical: "top", horizontal: "center" },
  },
};

function App() {
  const locale = localStorage.getItem("locale") || "vi-VN";
  return (
    <IntlProvider
      locale={locale}
      messages={messages[locale]}
      defaultLocale={locale}
    >
      <NotificationsProvider slotProps={slotProps}>
        <ThemeProvider theme={lightTheme}>
          <Routes />
        </ThemeProvider>
      </NotificationsProvider>
    </IntlProvider>
  );
}

export default App;
