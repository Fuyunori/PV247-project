import { useState } from 'react';

declare function setInterval(callback: () => void, delay: number): number;

export const useInterval = (
  callback: () => void,
  initDelay: number,
): {
  delay: number;
  running: boolean;
  start: () => void;
  stop: () => void;
  setDelay: (delay: number) => void;
} => {
  const [delay, setDelay] = useState(initDelay);
  const [intervalId, setIntervalId] = useState<number | null>(null);

  return {
    delay,
    running: intervalId != null,
    start: () => {
      if (intervalId != null) {
        clearInterval(intervalId);
      }
      setIntervalId(setInterval(callback, delay));
    },
    stop: () => {
      if (intervalId != null) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    },
    setDelay: (delay) => {
      setDelay(delay);
      if (intervalId != null) {
        clearInterval(intervalId);
        setIntervalId(setInterval(callback, delay));
      }
    },
  };
};
