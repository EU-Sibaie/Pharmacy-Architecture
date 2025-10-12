import { useEffect, useRef } from 'react';

export function useDebounce<F extends (...args: any[]) => void>(func: F, delay: number) {
  const timeoutRef = useRef<number>();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (...args: Parameters<F>): void => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => func(...args), delay);
  };
}
