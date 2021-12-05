import { FC } from 'react';
import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { Game } from '../models/Game';
import { GameThumbnail } from './GameThumbnail';
import { useNavigate } from 'react-router-dom';

type GamePreviewProps = {
  readonly game: Game;
};

export const GamePreview: FC<GamePreviewProps> = ({ game }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/game/${game.id}`);
  };

  return (
    <Card sx={{ display: 'flex' }}>
      <CardActionArea onClick={handleClick}>
        <GameThumbnail configuration={game} width={200} height={200} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
              {game.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              Author Name
            </Typography>
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  );
};
