import React, { FC, MouseEventHandler, useEffect, useRef } from 'react';
import { Game } from '../models/Game';
import { Coordinate } from '../utils/getNextGeneration';

const GRID_COLOR = '#999999';
const GRID_THICKNESS = 1;

export type ConfigurationPreviewProps = {
  readonly configuration: Game;
  readonly width: number;
  readonly height?: number;
  readonly showGrid?: boolean;

  readonly onCellClick?: (coord: Coordinate) => void;
};

export const GameThumbnail: FC<ConfigurationPreviewProps> = (props) => {
  const {
    configuration,
    width,
    height = (width * configuration.height) / configuration.width,
    showGrid = false,
    onCellClick,
  } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const gameRatio = configuration.width / configuration.height;
  const canvasRatio = width / height;
  const scale = canvasRatio > gameRatio ? height / configuration.height : width / configuration.width;
  const transX = canvasRatio > gameRatio ? (width - scale * configuration.width) / 2 : 0;
  const transY = canvasRatio > gameRatio ? 0 : (height - scale * configuration.height) / 2;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas == null) {
      return;
    }

    const ctx = canvas.getContext('2d');
    assertNonNull(ctx, 'Could not get 2D rendering context');
    ctx.clearRect(0, 0, width, height);

    if (showGrid) {
      ctx.strokeStyle = GRID_COLOR;
      ctx.lineWidth = GRID_THICKNESS;
      ctx.beginPath();

      for (let i = 1; i < configuration.width; i++) {
        ctx.moveTo(i * scale + transX, transY);
        ctx.lineTo(i * scale + transX, height - transY);
      }

      for (let i = 1; i < configuration.height; i++) {
        ctx.moveTo(transX, i * scale + transY);
        ctx.lineTo(width - transX, i * scale + transY);
      }

      ctx.stroke();
    }

    for (const [x, y] of configuration.aliveCells) {
      ctx.fillRect(x * scale + transX, y * scale + transY, scale, scale);
    }
  }, [configuration, width, height, showGrid, canvasRef.current]);

  const handleClick: MouseEventHandler = ({ nativeEvent }) => {
    const cellX = Math.floor((nativeEvent.offsetX - transX) / scale);
    const cellY = Math.floor((nativeEvent.offsetY - transY) / scale);
    onCellClick?.([cellX, cellY]);
  };

  return <canvas width={width} height={height} ref={canvasRef} onClick={handleClick} />;
};

function assertNonNull<T>(value: T | null, message: string): asserts value is T {
  if (value == null) {
    throw new Error(message);
  }
}
