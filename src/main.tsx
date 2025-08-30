import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import MainAppErrorBoundary from "./components/ErrorBoundary.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MainAppErrorBoundary>
      <App />
    </MainAppErrorBoundary>
  </StrictMode>
);
