import React, { FC, useState } from 'react';
import { Game } from '../models/Game';
import { Box } from '@mui/material';
import { GameView } from '../components/GameView';
import getNextGeneration, { Coordinate, CoordinateSet } from '../getNextGeneration';

const MOCK_GAME: Game = {
  id: '123',
  name: 'Mock Config',
  width: 80,
  height: 50,
  aliveCells: [
    [0, 0],
    [5, 5],
    [3, 3],
    [9, 10],
    [10, 10],
    [11, 10],
    [11, 9],
    [10, 8],
    [79, 6],
  ],
};

export const GameEditor: FC = () => {
  const [game, setGame] = useState<Game>(MOCK_GAME);

  const updateCell = (coord: Coordinate): void => {
    const aliveCellsSet = new CoordinateSet(game.aliveCells);
    aliveCellsSet[aliveCellsSet.has(coord) ? 'delete' : 'add'](coord);
    setGame({ ...game, aliveCells: [...aliveCellsSet] });
  };

  const startSimulation = (): void => {
    setInterval(() => {
      setGame(updateGame);
    }, 10);
  };

  return (
    <Box>
      <GameView game={game} onCellClick={updateCell} />
      <button onClick={startSimulation}>Simulate</button>
    </Box>
  );
};

const updateGame = (game: Game): Game => ({
  ...game,
  aliveCells: [...getNextGeneration(new CoordinateSet(game.aliveCells))],
});
