import {
  useCallback,
  useEffect,
  useMemo,
} from "react";

import ThemeContext from "./ThemeContext.js";
import useLocalStorage from "../hooks/useLocalStorage.js";

const THEME_STORAGE_KEY = "nani-shop-theme";
const LIGHT_THEME = "light";
const DARK_THEME = "dark";

function normalizeTheme(value) {
  return value === DARK_THEME
    ? DARK_THEME
    : LIGHT_THEME;
}

function ThemeProvider({ children }) {
  const [storedTheme, setStoredTheme] = useLocalStorage(
    THEME_STORAGE_KEY,
    LIGHT_THEME,
  );

  const theme = normalizeTheme(storedTheme);
  const isDarkTheme = theme === DARK_THEME;

  useEffect(() => {
    const rootElement = document.documentElement;

    rootElement.dataset.theme = theme;
    rootElement.style.colorScheme = theme;
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setStoredTheme((currentTheme) =>
      normalizeTheme(currentTheme) === DARK_THEME
        ? LIGHT_THEME
        : DARK_THEME,
    );
  }, [setStoredTheme]);

  const contextValue = useMemo(
    () => ({
      theme,
      isDarkTheme,
      toggleTheme,
    }),
    [theme, isDarkTheme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;