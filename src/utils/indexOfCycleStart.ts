import Generation from '../models/Generation';
import { Coordinate } from './getNextGeneration';

const sortCoordinates = (a: Coordinate, b: Coordinate) => {
  const [xa, ya] = a;
  const [xb, yb] = b;

  return xa < xb ? -1 : xa === xb ? (ya < yb ? -1 : ya === yb ? 0 : 1) : 1;
};

export const indexOfCycleStart = (history: Generation[]): null | number => {
  const lastGeneration = history[history.length - 1];

  const sortedLastGeneration = lastGeneration.sort(sortCoordinates);

  for (let i = 0; i < history.length - 1; i++) {
    const sortedGeneration = history[i].sort(sortCoordinates);

    let result = true;
    for (let j = 0; j < Math.min(sortedLastGeneration.length, sortedGeneration.length); j++) {
      const [x1, y1] = sortedLastGeneration[j];
      const [x2, y2] = sortedGeneration[j];

      console.log(sortedGeneration);
      console.log(sortedLastGeneration);

      if (x1 !== x2 || y1 !== y2) {
        result = false;
      }
    }

    if (result) {
      return i;
    }
  }

  return null;
};
