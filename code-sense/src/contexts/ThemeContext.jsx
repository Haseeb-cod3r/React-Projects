import { createContext, useEffect, useState } from "react";

export const context = createContext(null);

export function ThemeContext({ children }) {

  const [theme, setTheme] = useState("Light");
  
  useEffect(() => {
    const html = document.documentElement;
    const themes = ["Midnight", "Forest", "Pastel", "Light", "Dark"];
    if (themes.includes(theme)) {
      html.classList.remove(...themes);
      html.classList.add(theme);
    } else {
      console.log("Theme not recognized. Using default.");
    }
  }, [theme]);

  return (
    <context.Provider value={{ theme, setTheme }}>{children}</context.Provider>
  );
}
