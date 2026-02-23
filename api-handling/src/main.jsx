import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AppContext from "./context/appContext.jsx";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./queries/queryClientConfig.js";
createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    {" "}
    <AppContext>
      <App />
    </AppContext>
  </QueryClientProvider>,
);
