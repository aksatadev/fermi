import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Fermionisme from "./Fermionisme.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Fermionisme />
  </StrictMode>
);
