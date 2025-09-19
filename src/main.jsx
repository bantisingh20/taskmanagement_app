import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/authcontext.jsx";
import { SnackbarProvider } from './components/SnackbarProvider'



createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <AuthProvider>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </AuthProvider>
  // </StrictMode>
);
