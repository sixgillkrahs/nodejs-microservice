import { useEffect } from "react";
import "./App.css";
import Routes from "./utils/routes";
import { IntlProvider } from "react-intl";
import messages from "./locales";

function App() {
  const locale = localStorage.getItem("locale") || "vi-VN";
  return (
    <IntlProvider
      locale={locale}
      messages={messages[locale]}
      defaultLocale={locale}
    >
      <Routes />
    </IntlProvider>
  );
}

export default App;
