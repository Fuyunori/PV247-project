import { FC, MouseEventHandler, useEffect, useMemo, useRef } from 'react';
import { Coordinate } from '../utils/getNextGeneration';
import { useTheme } from '@mui/material';
import Generation from '../models/Generation';

const GRID_COLOR = '#999999';
const GRID_THICKNESS = 1;

export type Props = {
  generation: Generation;
  boardSize: number;
  canvasWidth: number;
  givenCanvasHeight?: number;
  showGrid?: boolean;
  onCellClick?: (coord: Coordinate) => void;
};

const Canvas: FC<Props> = (props) => {
  const { generation, boardSize, canvasWidth, givenCanvasHeight, showGrid = false, onCellClick } = props;
  console.log('boardSize', boardSize);
  const configHeight = useMemo(() => Math.pow(boardSize, 1.1), [boardSize]);
  const configWidth = useMemo(() => 2 * configHeight, [configHeight]);

  const canvasHeight = givenCanvasHeight ?? (canvasWidth * configHeight) / configWidth;

  const theme = useTheme();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const gameRatio = configWidth / configHeight;
  const canvasRatio = canvasWidth / canvasHeight;
  const scale = canvasRatio > gameRatio ? canvasHeight / configHeight : canvasWidth / configWidth;
  const transX = canvasRatio > gameRatio ? (canvasWidth - scale * configWidth) / 2 : 0;
  const transY = canvasRatio > gameRatio ? 0 : (canvasHeight - scale * configHeight) / 2;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas == null) {
      return;
    }

    const ctx = canvas.getContext('2d');
    assertNonNull(ctx, 'Could not get 2D rendering context');
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = theme.palette.primary.main;

    if (showGrid) {
      ctx.strokeStyle = GRID_COLOR;
      ctx.lineWidth = GRID_THICKNESS;
      ctx.beginPath();

      for (let i = 1; i < configWidth; i++) {
        ctx.moveTo(i * scale + transX, transY);
        ctx.lineTo(i * scale + transX, canvasHeight - transY);
      }

      for (let i = 1; i < configHeight; i++) {
        ctx.moveTo(transX, i * scale + transY);
        ctx.lineTo(canvasWidth - transX, i * scale + transY);
      }

      ctx.stroke();
    }

    for (const [x, y] of generation) {
      ctx.fillRect(x * scale + transX, y * scale + transY, scale, scale);
    }
  }, [
    generation,
    canvasWidth,
    canvasHeight,
    showGrid,
    theme.palette.primary.main,
    configWidth,
    scale,
    transX,
    transY,
    configHeight,
  ]);

  const handleClick: MouseEventHandler = ({ nativeEvent }) => {
    const cellX = Math.floor((nativeEvent.offsetX - transX) / scale);
    const cellY = Math.floor((nativeEvent.offsetY - transY) / scale);
    onCellClick?.([cellX, cellY]);
  };

  return <canvas width={canvasWidth} height={canvasHeight} ref={canvasRef} onClick={handleClick} />;
};

function assertNonNull<T>(value: T | null, message: string): asserts value is T {
  if (value == null) {
    throw new Error(message);
  }
}

export default Canvas;
