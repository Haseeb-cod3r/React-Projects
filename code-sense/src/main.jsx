import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeContext } from "./contexts/ThemeContext";
import { AppContext } from "./contexts/AppContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/query";

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <AppContext>
      <ThemeContext>
        <App />
      </ThemeContext>
    </AppContext>
  </QueryClientProvider>,
);
