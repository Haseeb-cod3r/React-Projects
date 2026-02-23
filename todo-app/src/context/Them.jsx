import react from "react";
import { createContext,  useEffect, useState } from "react";

export  const themeContext = createContext();

export default function ThemeProvider({children}) {
  const [theme, setThem] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setThem((prev) => (prev === "light" ? "dark" : "light"));
    console.log(theme);
  };

  return(
      <themeContext.Provider value={{theme,toggleTheme}}>
            {children}
      </themeContext.Provider>
  )
}
