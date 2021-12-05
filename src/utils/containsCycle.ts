import { Game } from '../models/Game';

export const containsCycle = (history: Game[]): boolean => {
  const [lastState, ...rest] = history;

  for (const game of rest) {
    if (game.aliveCells.every(coord => l))
  }
};
