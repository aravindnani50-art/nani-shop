import {
  useCallback,
  useMemo,
} from "react";

import AuthContext from "./AuthContext.js";

import useLocalStorage from "../hooks/useLocalStorage.js";
import { loginUser } from "../services/authService.js";

const AUTH_STORAGE_KEY =
  "nani-shop-auth-session";

function isValidStoredSession(session) {
  return Boolean(
    session &&
      typeof session === "object" &&
      session.user &&
      session.accessToken,
  );
}

function AuthProvider({ children }) {
  const [
    storedSession,
    setStoredSession,
  ] = useLocalStorage(
    AUTH_STORAGE_KEY,
    null,
  );

  const session = isValidStoredSession(
    storedSession,
  )
    ? storedSession
    : null;

  const user = session?.user ?? null;

  const accessToken =
    session?.accessToken ?? null;

  const refreshToken =
    session?.refreshToken ?? null;

  const isAuthenticated = Boolean(
    user && accessToken,
  );

 
  const isAuthLoading = false;

  const login = useCallback(
    async (credentials) => {
      const authenticatedSession =
        await loginUser(credentials);

      setStoredSession(
        authenticatedSession,
      );

      return authenticatedSession.user;
    },
    [setStoredSession],
  );

  const logout = useCallback(() => {
    setStoredSession(null);
  }, [setStoredSession]);

  const contextValue = useMemo(
    () => ({
      user,
      accessToken,
      refreshToken,
      isAuthenticated,
      isAuthLoading,
      login,
      logout,
    }),
    [
      user,
      accessToken,
      refreshToken,
      isAuthenticated,
      isAuthLoading,
      login,
      logout,
    ],
  );

  return (
    <AuthContext.Provider
      value={contextValue}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;