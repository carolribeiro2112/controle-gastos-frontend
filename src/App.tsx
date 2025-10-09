import { IntlProvider } from "./i18n";
import Router from "./Router";

function App() {
  return (
    <IntlProvider>
      <Router />
    </IntlProvider>
  );
}

export default App;
