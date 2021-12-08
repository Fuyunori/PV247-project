import { useState } from 'react';

const useInterval = (
  callback: () => void,
  initialTimeout: number,
): {
  timeout: number;
  running: boolean;
  start: () => void;
  stop: () => void;
  setTimeout: (timeout: number) => void;
} => {
  const [timeout, setTimeout] = useState(initialTimeout);
  const [intervalId, setIntervalId] = useState<ReturnType<typeof setInterval> | null>(null);

  return {
    timeout,
    running: intervalId != null,
    start: () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
      setIntervalId(setInterval(callback, timeout));
    },
    stop: () => {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    },
    setTimeout: (timeout) => {
      setTimeout(timeout);
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(setInterval(callback, timeout));
      }
    },
  };
};

export default useInterval;
