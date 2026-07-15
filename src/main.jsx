import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
} from "react-router";

import App from "./App.jsx";

import AuthProvider from "./contexts/AuthProvider.jsx";
import ThemeProvider from "./contexts/ThemeProvider.jsx";

import "./styles/global.css";
import "./styles/layout.css";
import "./styles/dashboard.css";
import "./styles/products.css";
import "./styles/forms.css";
import "./styles/add-product.css";
import "./styles/theme.css";

const rootElement =
  document.getElementById(
    "nani-shop-root",
  );

if (!rootElement) {
  throw new Error(
    "NANI Shop could not start because the root HTML element was not found.",
  );
}

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);