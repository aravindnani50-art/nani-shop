import apiClient from "./apiClient.js";

const AUTH_SESSION_DURATION_MINUTES = 30;

async function loginUser(credentials, options = {}) {
  const { signal } = options;

  const responseData = await apiClient("/auth/login", {
    method: "POST",
    body: {
      username: credentials.username.trim(),
      password: credentials.password,
      expiresInMins: AUTH_SESSION_DURATION_MINUTES,
    },
    signal,
  });

  if (!responseData?.accessToken) {
    throw new Error(
      "The authentication server did not return a valid access token.",
    );
  }

  const {
    accessToken,
    refreshToken,
    ...user
  } = responseData;

  return {
    user,
    accessToken,
    refreshToken: refreshToken ?? null,
  };
}

export { loginUser };