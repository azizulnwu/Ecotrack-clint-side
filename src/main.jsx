import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./Router/Router.jsx";
import { RouterProvider } from "react-router";
import { AuthContext } from "./Provider/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContext>
      <RouterProvider router={router} />
    </AuthContext>
  </StrictMode>
);
