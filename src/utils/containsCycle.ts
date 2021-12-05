import Configuration from '../models/Configuration';

export const containsCycle = (history: Configuration[]): boolean => {
  const [lastState, ...rest] = history;

  // TODO:
  // for (const game of rest) {
  //   if (game.aliveCells.every(coord => l))
  // }
  return true;
};
