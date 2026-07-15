import { useContext } from "react";

import AuthContext from "../contexts/AuthContext.js";

function useAuth() {
  const contextValue =
    useContext(AuthContext);

  if (contextValue === undefined) {
    throw new Error(
      "useAuth must be used inside AuthProvider.",
    );
  }

  return contextValue;
}

export default useAuth;