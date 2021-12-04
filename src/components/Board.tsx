import { useState } from 'react';
import { Coordinate, CoordinateSet } from '../getNextGeneration';
import './Board.css';
import classNames from 'classnames';

const Board = () => {
  const width = 10;
  const height = 10;

  const [generations, setGenerations] = useState([new CoordinateSet()]);
  const currentGeneration = generations[generations.length - 1];

  const getCellState = (coordinate: Coordinate) => (currentGeneration.has(coordinate) ? 'alive' : 'dead');

  const toggleCell = (coordinate: Coordinate) => {
    if (currentGeneration.has(coordinate)) {
      currentGeneration.delete(coordinate);
      const newGenerations = [...generations.slice(-1), currentGeneration];
      setGenerations(newGenerations);
    } else {
      currentGeneration.add(coordinate);
      const newGenerations = [...generations.slice(-1), currentGeneration];
      setGenerations(newGenerations);
    }
  };

  return (
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
  );
};

export default Board;
