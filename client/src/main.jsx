import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { HeroProvider } from "./context/CharacterContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HeroProvider>
      <App />
    </HeroProvider>
  </StrictMode>
);
