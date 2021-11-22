import React, { FC, useEffect, useRef } from 'react';
import { Game } from '../models/Game';

export type ConfigurationPreviewProps = {
  configuration: Game;
};

export const ConfigurationThumbnail: FC<ConfigurationPreviewProps> = ({ configuration }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas == null) {
      return;
    }

    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (ctx == null) {
      console.warn('Could not get 2D rendering context');
      return;
    }

    const gameRatio = configuration.width / configuration.height;
    const canvasRatio = width / height;

    const scale = canvasRatio > gameRatio ? height / configuration.height : width / configuration.width;
    const transX = canvasRatio > gameRatio ? (width - scale * configuration.width) / 2 : 0;
    const transY = canvasRatio > gameRatio ? 0 : (height - scale * configuration.height) / 2;

    for (const [x, y] of configuration.aliveCells) {
      ctx.fillRect(x * scale + transX, y * scale + transY, scale, scale);
    }
  }, [configuration, canvasRef.current]);

  return <canvas ref={canvasRef}></canvas>;
};
