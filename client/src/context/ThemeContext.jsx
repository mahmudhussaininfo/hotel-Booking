import { createContext, useState } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const value = {
    darkMode,
    setDarkMode,
    showModal,
    setShowModal,
  };
  return <ThemeContext value={value}>{children}</ThemeContext>;
};

export default ThemeProvider;
