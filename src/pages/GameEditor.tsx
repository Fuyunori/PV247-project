import { FC, useState } from 'react';
import { Game } from '../models/Game';
import { Box, IconButton, Slider } from '@mui/material';
import getNextGeneration, { Coordinate, CoordinateSet } from '../utils/getNextGeneration';
import { GameThumbnail } from '../components/GameThumbnail';
import { useInterval } from '../hooks/useInterval';

const INIT_SIMULATION_DELAY = 100;

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
  const [history, setHistory] = useState<Game[]>([MOCK_GAME]);

  const updateCell = (coord: Coordinate): void => {
    const [lastState, ...rest] = history;
    const aliveCellsSet = new CoordinateSet(lastState.aliveCells);
    aliveCellsSet[aliveCellsSet.has(coord) ? 'delete' : 'add'](coord);
    setHistory([{ ...lastState, aliveCells: [...aliveCellsSet] }, ...rest]);
  };

  const stepForwards = (): void => {
    setHistory((history) => {
      const [lastState, ...rest] = history;
      return [
        {
          ...lastState,
          aliveCells: [...getNextGeneration(new CoordinateSet(lastState.aliveCells))],
        },
        lastState,
        ...rest,
      ];
    });
  };

  const stepBackwards = (): void => {
    if (history.length > 1) {
      setHistory(history.slice(1));
    }
  };

  const resetHistory = (): void => setHistory(history.slice(-1));

  const { running, start, stop, delay, setDelay } = useInterval(stepForwards, INIT_SIMULATION_DELAY);

  const toggleSimulating = (): void => (running ? stop() : start());

  const changeSpeed = (_: Event, value: number | number[]): void => setDelay(1000 - (value as number));

  return (
    <Box width="800px">
      <GameThumbnail configuration={history[0]} width={800} showGrid onCellClick={updateCell} />

      <IconButton onClick={resetHistory}>&laquo;</IconButton>
      <IconButton onClick={stepBackwards}>&lsaquo;</IconButton>
      <IconButton onClick={stepForwards}>&rsaquo;</IconButton>
      <IconButton onClick={toggleSimulating}>{running ? 'stop' : 'start'}</IconButton>
      <Slider min={800} max={1000} value={1000 - delay} onChange={changeSpeed} />
    </Box>
  );
};
