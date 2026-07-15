import { useCallback, useState } from "react";

function resolveInitialValue(initialValue) {
  return typeof initialValue === "function"
    ? initialValue()
    : initialValue;
}

function readStoredValue(key, initialValue) {
  const fallbackValue = resolveInitialValue(initialValue);

  if (typeof window === "undefined") {
    return fallbackValue;
  }

  try {
    const storedValue = window.localStorage.getItem(key);

    if (storedValue === null) {
      return fallbackValue;
    }

    return JSON.parse(storedValue);
  } catch (error) {
    console.warn(
      `NANI Shop could not read the localStorage key "${key}".`,
      error,
    );

    return fallbackValue;
  }
}

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() =>
    readStoredValue(key, initialValue),
  );

  const updateStoredValue = useCallback(
    (valueOrUpdater) => {
      setStoredValue((currentValue) => {
        const nextValue =
          typeof valueOrUpdater === "function"
            ? valueOrUpdater(currentValue)
            : valueOrUpdater;

        try {
          window.localStorage.setItem(
            key,
            JSON.stringify(nextValue),
          );
        } catch (error) {
          console.warn(
            `NANI Shop could not save the localStorage key "${key}".`,
            error,
          );
        }

        return nextValue;
      });
    },
    [key],
  );

  return [storedValue, updateStoredValue];
}

export default useLocalStorage;