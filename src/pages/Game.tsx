import { Button, ButtonGroup, Container } from '@mui/material';
import React, { FC } from 'react';
import { Game as GameModel } from '../models/Game';

type GameProps = {
  readonly configuration: GameModel;
};

export const Game: FC<GameProps> = (
  {
    /* configuration */
  },
) => {
  const game = {
    id: '123',
    name: 'Mock Config',
    width: 80,
    height: 7,
    aliveCells: [
      [0, 0],
      [5, 5],
      [3, 3],
      [79, 6],
    ],
  };

  return (
    <Container>
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button>Save</Button>
      </ButtonGroup>
    </Container>
  );
};
