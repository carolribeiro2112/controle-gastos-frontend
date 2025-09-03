import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import App from "./App.tsx";
import "./index.css";
import LoginService from "./services/LoginService/LoginService";

// Initialize auth state on app startup
LoginService.initializeAuth();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Theme appearance="dark" accentColor="jade">
      <App />
    </Theme>
  </StrictMode>
);
