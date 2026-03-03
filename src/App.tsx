import { IntlProvider } from "./i18n";
import Router from "./Router";
// import "react-day-picker/style.css";

function App() {
  return (
    <IntlProvider>
      <Router />
    </IntlProvider>
  );
}

export default App;
