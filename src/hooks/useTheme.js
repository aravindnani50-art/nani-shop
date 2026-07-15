import { useContext } from "react";

import ThemeContext from "../contexts/ThemeContext.js";

function useTheme() {
  const contextValue = useContext(ThemeContext);

  if (contextValue === undefined) {
    throw new Error(
      "useTheme must be used inside ThemeProvider.",
    );
  }

  return contextValue;
}

export default useTheme;