import { createContext, useState } from "react";

export const ThemeContext = createContext({
  dark: false,
  toggleDark: () => {},
});

export const darkCss = 'bg-secondary text-white';
export const lightCss = 'bg-white text-secondary';

const ThemeProvider = ({ children }:any) => {
  const [dark, setDark] = useState(false);

  const toggleDark = () => {
    setDark(!dark);
  };

  return (
    <ThemeContext.Provider value={{ dark, toggleDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;