import { FC, ReactElement } from 'react';
import { Game } from '../models/Game';
import { Coordinate, CoordinateSet } from '../utils/getNextGeneration';
import './GameView.css';

type GameEditorProps = {
  readonly game: Game;
  readonly onCellClick: (coord: Coordinate) => void;
};

export const GameView: FC<GameEditorProps> = ({ game, onCellClick }) => {
  const aliveCellsSet = new CoordinateSet(game.aliveCells);
  const { width, height } = game;
  const gameMatrix: ReactElement[] = Array.from({ length: width * height }, (_, i) => {
    const x = i % width;
    const y = Math.floor(i / width);
    const className = aliveCellsSet.has([x, y]) ? 'alive' : 'dead';

    return <div key={i} className={`game-cell game-cell--${className}`} onClick={() => onCellClick([x, y])} />;
  });

  return (
    <>
      <div className="game-matrix" style={{ gridTemplateColumns: `repeat(${width}, 1fr)` }}>
        {gameMatrix}
      </div>
    </>
  );
};
