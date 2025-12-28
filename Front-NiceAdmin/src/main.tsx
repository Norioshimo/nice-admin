import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AdminNice } from "./AdminNice";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AdminNice />
  </StrictMode>
);
