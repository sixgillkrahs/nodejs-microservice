import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Theme } from "react-daisyui";

createRoot(document.getElementById("root")!).render(<App />);