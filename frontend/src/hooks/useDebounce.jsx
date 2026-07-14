import { useState, useEffect } from 'react';

/**
 * Custom hook for debouncing fast-changing values (like search inputs).
 * Helps prevent API spamming and provides basic client-side rate limiting.
 * @param {any} value - The value to debounce.
 * @param {number} delay - Delay in milliseconds.
 * @returns {any} The debounced value.
 */
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timeout to update the debounced value after the delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancel the timeout if value changes before the delay passes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
