import { createContext, useState } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);

  const value = {
    darkMode,
    setDarkMode,
  };
  return <ThemeContext value={value}>{children}</ThemeContext>;
};

export default ThemeProvider;
