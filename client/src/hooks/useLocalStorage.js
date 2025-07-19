import { useEffect, useState } from "react";

export const useLocalStorage = (storageKey, defaultValue) => {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(storageKey);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error parsing localStorage key "${storageKey}":`, error);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${storageKey}":`, error);
    }
  }, [storageKey, value]);

  return [value, setValue];
};
