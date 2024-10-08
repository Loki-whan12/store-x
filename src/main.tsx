import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { UserProvider } from "./UserProvider.tsx";
import { SellerProvider } from "./SellerProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <SellerProvider>
        <App />
      </SellerProvider>
    </UserProvider>
  </StrictMode>
);
