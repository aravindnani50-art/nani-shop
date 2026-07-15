const API_BASE_URL = "https://dummyjson.com";

class ApiError extends Error {
  constructor(message, status = 0, data = null) {
    super(message);

    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

async function readResponseData(response) {
  if (response.status === 204) {
    return null;
  }

  const contentType =
    response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
}

async function apiClient(endpoint, options = {}) {
  const {
    method = "GET",
    body,
    headers = {},
    signal,
  } = options;

  const requestHeaders = {
    Accept: "application/json",
    ...headers,
  };

  if (body !== undefined) {
    requestHeaders["Content-Type"] = "application/json";
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}${endpoint}`,
      {
        method,
        headers: requestHeaders,
        body:
          body === undefined
            ? undefined
            : JSON.stringify(body),
        signal,
      },
    );

    const responseData = await readResponseData(response);

    if (!response.ok) {
      const serverMessage =
        typeof responseData === "object" &&
        responseData !== null &&
        "message" in responseData
          ? responseData.message
          : null;

      throw new ApiError(
        serverMessage ||
          `Request failed with status ${response.status}.`,
        response.status,
        responseData,
      );
    }

    return responseData;
  } catch (error) {
    if (error?.name === "AbortError") {
      throw error;
    }

    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(
      "Unable to connect to the server. Check your internet connection and try again.",
      0,
      null,
    );
  }
}

export { ApiError };
export default apiClient;