import "requestidlecallback-polyfill";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  applyTextSizeMode,
  applyThemeMode,
  loadTextSizeMode,
  loadThemeMode,
} from "@/lib/user-preferences";

applyThemeMode(loadThemeMode());
applyTextSizeMode(loadTextSizeMode());

createRoot(document.getElementById("root")!).render(<App />);
