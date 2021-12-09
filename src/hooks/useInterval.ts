import { useState } from 'react';

const useInterval = (
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
  const [intervalId, setIntervalId] = useState<ReturnType<typeof setInterval> | null>(null);

  return {
    delay,
    running: intervalId != null,
    start: () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
      setIntervalId(setInterval(callback, delay));
    },
    stop: () => {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    },
    setDelay: (delay) => {
      setDelay(delay);
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(setInterval(callback, delay));
      }
    },
  };
};

export default useInterval;
