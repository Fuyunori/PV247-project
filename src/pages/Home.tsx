import { FC } from 'react';
import { GamePreview } from '../components/GamePreview';
import { Game } from '../models/Game';
import { AddGame } from '../components/AddGame';
import { Box } from '@mui/material';

export const Home: FC = () => {
  // TODO uncomment when connected to Firestore
  // const games = useGames();

  const games: Game[] = [
    {
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
    },
    {
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
    },
    {
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
    },
  ];

  const gamesPreview = games?.map((game) => (
    <Box key={game.id}>
      <GamePreview game={game} />
    </Box>
  ));

  const addGame = (
    <Box>
      <AddGame></AddGame>
    </Box>
  );

  return (
    <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
      {gamesPreview}
      {addGame}
    </Box>
  );
};
