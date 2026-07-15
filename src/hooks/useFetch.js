import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

function replaceData(_currentData, nextData) {
  return nextData;
}

function normalizeFetchError(error) {
  if (error instanceof Error) {
    return error;
  }

  return new Error(
    "An unexpected error occurred while loading data.",
  );
}

function useFetch(requestFunction, options = {}) {
  const {
    initialData = null,
    mergeData = replaceData,
  } = options;

  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requestVersion, setRequestVersion] =
    useState(0);

  const latestRequestId = useRef(0);

  const refetch = useCallback(() => {
    setRequestVersion(
      (currentVersion) => currentVersion + 1,
    );
  }, []);

  useEffect(() => {
    const abortController = new AbortController();

    const requestId =
      latestRequestId.current + 1;

    latestRequestId.current = requestId;

    let isCurrentRequestActive = true;

    async function executeRequest() {
      setLoading(true);
      setError(null);

      try {
        const responseData =
          await requestFunction({
            signal: abortController.signal,
          });

        const isLatestRequest =
          requestId === latestRequestId.current;

        if (
          isCurrentRequestActive &&
          isLatestRequest
        ) {
          setData((currentData) =>
            mergeData(
              currentData,
              responseData,
            ),
          );
        }
      } catch (requestError) {
        if (
          requestError?.name === "AbortError"
        ) {
          return;
        }

        const isLatestRequest =
          requestId === latestRequestId.current;

        if (
          isCurrentRequestActive &&
          isLatestRequest
        ) {
          setError(
            normalizeFetchError(requestError),
          );
        }
      } finally {
        const isLatestRequest =
          requestId === latestRequestId.current;

        if (
          isCurrentRequestActive &&
          isLatestRequest
        ) {
          setLoading(false);
        }
      }
    }

    executeRequest();

    return () => {
      isCurrentRequestActive = false;
      abortController.abort();
    };
  }, [
    mergeData,
    requestFunction,
    requestVersion,
  ]);

  return {
    data,
    loading,
    error,
    refetch,
  };
}

export default useFetch;