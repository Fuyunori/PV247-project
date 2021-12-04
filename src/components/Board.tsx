import { useState } from 'react';
import getNextGeneration, { Coordinate, CoordinateSet } from '../getNextGeneration';
import './Board.css';
import classNames from 'classnames';
import { Slider, Stack } from '@mui/material';
import SpeedIcon from '@mui/icons-material/Speed';
import Grid4x4Icon from '@mui/icons-material/Grid4x4';

const GLIDER: Coordinate[] = [
  [4, 4],
  [5, 5],
  [6, 3],
  [6, 4],
  [6, 5],
];
const PERIODIC: Coordinate[] = [
  [5, 4],
  [5, 5],
  [5, 6],
];

const getCurrentGeneration = (generations: CoordinateSet[]) => {
  return generations[generations.length - 1];
};

const Board = () => {
  const [boardSize, setBoardSize] = useState(15);
  const [simulationRunning, setSimulationRunning] = useState(false);

  const [simulationClearInterval, setSimulationClearInterval] = useState<ReturnType<typeof setInterval>>();
  const [simulationSpeed, setSimulationSpeed] = useState(50);

  const [generations, setGenerations] = useState([new CoordinateSet(PERIODIC)]);

  const getCellState = (coordinate: Coordinate) =>
    getCurrentGeneration(generations).has(coordinate) ? 'alive' : 'dead';

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

  const handleBoardSizeChange = (_: Event, newSize: number | number[]) => {
    if (Array.isArray(newSize)) {
      return;
    }
    setBoardSize(newSize);
  };

  const runSimulation = () => {
    setSimulationRunning(true);
    setSimulationClearInterval(setInterval(() => stepForward(), 500000 / (simulationSpeed * simulationSpeed)));
  };

  const stopSimulation = () => {
    setSimulationRunning(false);
    if (simulationClearInterval) {
      clearInterval(simulationClearInterval);
    }
  };

  const handleSimulationSpeedChange = (_: Event, newSpeed: number | number[]) => {
    if (Array.isArray(newSpeed)) {
      return;
    }
    setSimulationSpeed(newSpeed);
    stopSimulation();
    runSimulation();
  };

  return (
    <div>
      <div className="board" style={{ gridTemplateColumns: `repeat(${boardSize}, auto)` }}>
        {[...Array(boardSize)].map((_, rowIdx) =>
          [...Array(boardSize)].map((_, colIdx) => (
            <div
              className={classNames('board__cell', `board__cell--${getCellState([rowIdx, colIdx])}`)}
              key={`${rowIdx}${colIdx}`}
              onClick={() => toggleCell([rowIdx, colIdx])}
            />
          )),
        )}
      </div>
      <div className="controls">
        <button onClick={stepForward}>Step forward</button>
        <button onClick={runSimulation} disabled={simulationRunning}>
          Run simulation
        </button>
        <button onClick={stopSimulation} disabled={!simulationRunning}>
          Stop simulation
        </button>
        <Stack direction="column" alignItems="center">
          <SpeedIcon />
          <Slider aria-label="Simulation speed" value={simulationSpeed} onChange={handleSimulationSpeedChange} />
        </Stack>
        <Stack direction="column" alignItems="center">
          <Grid4x4Icon />
          <Slider aria-label="Board size" min={10} max={20} value={boardSize} onChange={handleBoardSizeChange} />
        </Stack>
      </div>
    </div>
  );
};

export default Board;
