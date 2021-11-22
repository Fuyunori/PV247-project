import React, { FC } from 'react';
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { Game } from '../models/Game';
import { ConfigurationThumbnail } from './ConfigurationThumbnail';
import { useNavigate } from 'react-router-dom';

type GamePreviewProps = {
  readonly game: Game;
};

export const GamePreview: FC<GamePreviewProps> = ({ game: configuration }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/configurations/${configuration.id}`);
  };

  return (
    <Card sx={{ display: 'flex' }}>
      <CardActionArea onClick={handleClick}>
        <ConfigurationThumbnail configuration={configuration} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
              {configuration.name}
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
