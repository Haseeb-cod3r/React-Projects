import { createContext,  useState } from "react";

export const appContext = createContext(null);

export function AppContext({ children }) {
  const [code, setCode] = useState("");
  const [summary, setSummary] = useState("");
  const [fixed, setFixed] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [lang, setLang] = useState("Language");
  const [framework, setFramework] = useState("Framework");
  const [feature, setFeature] = useState("Feature");
  const [userCode, setUserCode] = useState("");
  const [loading, setLoading] = useState(false);



  return (
    <appContext.Provider
      value={{
        code,
        setCode,
        summary,
        setSummary,
        fixed,
        setFixed,
        suggestion,
        setSuggestion,
        lang,
        setLang,
        framework,
        setFramework,
        feature,
        setFeature,
        userCode,
        setUserCode,
        loading,
        setLoading
      }}
    >
      {children}
    </appContext.Provider>
  );
}
