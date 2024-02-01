import { useEffect, useState } from "react";
// Custom hook for managing state in localStorage
export const useLocalStorage = (key: string, initialValue: any) => {
  // State to manage the value retrieved from localStorage
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    // Parse the stored JSON value or use the initial value
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });
  // useEffect to update localStorage whenever the value changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  // Return the current value and a function to update it
  return [value, setValue];
};
