import { useEffect } from "react";
import "./App.css";
import Routes from "./utils/routes";
import { IntlProvider } from "react-intl";
import messages from "./locales";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Color from "./utils/color";

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

function App() {
  const locale = localStorage.getItem("locale") || "vi-VN";
  return (
    <IntlProvider
      locale={locale}
      messages={messages[locale]}
      defaultLocale={locale}
    >
      <ThemeProvider theme={lightTheme}>
        <Routes />
      </ThemeProvider>
    </IntlProvider>
  );
}

export default App;
