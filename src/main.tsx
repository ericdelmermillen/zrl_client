import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppContextProvider } from "./contexts/AppContext";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const rootElement = document.getElementById("root");

if(!rootElement) {
  throw new Error("Root element not found");
};

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </BrowserRouter>
  </StrictMode>
);