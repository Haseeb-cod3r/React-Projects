import { createContext, useState } from "react";

export const appContext = createContext(null);

export function AppContext({ children }) {
  const [correctedCode, setCorrectedCode] = useState("");
  const [lang, setLang] = useState("Language");
  const [framework, setFramework] = useState("Framework");
  const [feature, setFeature] = useState("Feature");
  const [userCode, setUserCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  return (
    <appContext.Provider
      value={{
        correctedCode,
        setCorrectedCode,
        lang,
        setLang,
        framework,
        setFramework,
        feature,
        setFeature,
        userCode,
        setUserCode,
        loading,
        setLoading,
        feedback,
        setFeedback,
        status,
        setStatus,
        message,
        setMessage,
      }}
    >
      {children}
    </appContext.Provider>
  );
}
