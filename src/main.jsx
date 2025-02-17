import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { router } from "./Router/Router";
import AuthProvider from "./Router/AuthProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <div className="max-w-[1900px] mx-auto font-Poppins">
          <RouterProvider router={router} />
        </div>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>
);
