import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import Fermionisme from "./Fermionisme.jsx";
import About from "./About.jsx";
import Contact from "./Contact.jsx";
import { getInitialTheme } from "./shared.jsx";

function Router() {
  const [path, setPath] = useState(window.location.pathname);
  const [theme, setTheme] = useState(getInitialTheme);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try { localStorage.setItem("fermionisme-theme", next); } catch (_) {}
  };

  useEffect(() => {
    const handler = () => setPath(window.location.pathname);
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  const props = { theme, toggleTheme };
  if (path === "/about") return <About {...props} />;
  if (path === "/contact") return <Contact {...props} />;
  return <Fermionisme {...props} />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router />
  </StrictMode>
);
