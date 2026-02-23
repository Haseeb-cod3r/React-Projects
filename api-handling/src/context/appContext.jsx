import { createContext, useState } from "react";
export const appContext = createContext(null);

export default function AppContext({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState({
    mode: false,
    id: null,
  });
  const [form, setForm] = useState({
    name: "",
    email: "",
    Role: "",
  });

  return (
    <appContext.Provider
      value={{
        isOpen,
        setIsOpen,
        isEditMode,
        setIsEditMode,
        form,
        setForm,
      }}
    >
      {children}
    </appContext.Provider>
  );
}
