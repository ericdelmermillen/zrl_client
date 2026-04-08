import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./contexts/AppContext";
import { ModalContextProvider } from "./contexts/ModalContext";
import App from "./App";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
};

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <ModalContextProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </ModalContextProvider>
    </BrowserRouter>
  </StrictMode>
);