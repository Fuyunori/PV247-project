import { useState } from 'react';
import getNextGeneration, { Coordinate, CoordinateSet } from '../getNextGeneration';
import './Board.css';
import classNames from 'classnames';

const getCurrentGeneration = (generations: CoordinateSet[]) => {
  return generations[generations.length - 1];
};

const Board = () => {
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const [simulationClearInterval, setSimulationClearInterval] = useState<ReturnType<typeof setInterval>>();

  const [generations, setGenerations] = useState([
    new CoordinateSet([
      [4, 4],
      [5, 5],
      [6, 3],
      [6, 4],
      [6, 5],
    ]),
  ]);

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

  const increaseSize = () => {
    setWidth((width) => width + 1);
    setHeight((height) => height + 1);
  };

  const runSimulation = () => {
    setSimulationClearInterval(setInterval(() => stepForward(), 500));
  };

  const stopSimulation = () => {
    if (simulationClearInterval) {
      clearInterval(simulationClearInterval);
    }
  };

  return (
    <div>
      <div className="board" style={{ gridTemplateColumns: `repeat(${width}, auto)` }}>
        {[...Array(height)].map((_, rowIdx) =>
          [...Array(width)].map((_, colIdx) => (
            <div
              className={classNames('board__cell', `board__cell--${getCellState([rowIdx, colIdx])}`)}
              key={`${rowIdx}${colIdx}`}
              onClick={() => toggleCell([rowIdx, colIdx])}
            >
              {`${rowIdx}${colIdx}`}
            </div>
          )),
        )}
      </div>
      <div className="controls">
        <button onClick={stepForward}>Step forward</button>
        <button onClick={increaseSize}>Increase size</button>
        <button onClick={runSimulation}>Run simulation</button>
        <button onClick={stopSimulation}>Stop simulation</button>
      </div>
    </div>
  );
};

export default Board;
