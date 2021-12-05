import { FC, useState } from 'react';
import { Box, IconButton, Slider } from '@mui/material';
import getNextGeneration, { Coordinate, CoordinateSet } from '../utils/getNextGeneration';
import usePageTitle from '../hooks/usePageTitle';
import Canvas from '../components/Canvas';
import useInterval from '../hooks/useInterval';
import Configuration from '../models/Configuration';

const INITIAL_SIMULATION_DELAY = 100;

const MOCK_CONFIGURATION: Configuration = {
  id: '123',
  name: 'Mock Config',
  authorName: 'John Smith',
  width: 80,
  height: 50,
  createdAt: new Date(),
  initialGeneration: {
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
  },
};

const getCurrentGeneration = (generations: CoordinateSet[]) => {
  return generations[generations.length - 1];
};

const Board: FC = () => {
  usePageTitle('Play');
  const [generations, setGenerations] = useState<CoordinateSet[]>([
    new CoordinateSet(MOCK_CONFIGURATION.initialGeneration.aliveCells),
  ]);

  const toggleCell = (coordinate: Coordinate) => {
    if (getCurrentGeneration(generations).has(coordinate)) {
      setGenerations((generations) => [...generations.slice(-1), getCurrentGeneration(generations).delete(coordinate)]);
    } else {
      setGenerations((generations) => [...generations.slice(-1), getCurrentGeneration(generations).add(coordinate)]);
    }
  };
  const stepForward = () => {
    setGenerations((generations) => [...generations, getNextGeneration(getCurrentGeneration(generations))]);
  };

  const stepBackward = (): void => {
    if (generations.length > 1) {
      setGenerations((generations) => generations.slice(0, -1));
    }
  };

  const resetGenerations = (): void => setGenerations([generations[0]]);

  const { running, start, stop, delay, setDelay } = useInterval(stepForward, INITIAL_SIMULATION_DELAY);

  const toggleSimulating = (): void => (running ? stop() : start());

  const changeSpeed = (_: Event, value: number | number[]): void => setDelay(1000 - (value as number));
  //TODO different icons
  return (
    <Box width="800px">
      <Canvas
        generation={generations[generations.length - 1]}
        configWidth={MOCK_CONFIGURATION.width}
        configHeight={MOCK_CONFIGURATION.height}
        canvasWidth={800}
        showGrid
        onCellClick={toggleCell}
      />

      <IconButton onClick={resetGenerations}>&laquo;</IconButton>
      <IconButton onClick={stepBackward}>&lsaquo;</IconButton>
      <IconButton onClick={stepForward}>&rsaquo;</IconButton>
      <IconButton onClick={toggleSimulating}>{running ? 'stop' : 'start'}</IconButton>
      <Slider min={800} max={1000} value={1000 - delay} onChange={changeSpeed} />
    </Box>
  );
};

export default Board;
