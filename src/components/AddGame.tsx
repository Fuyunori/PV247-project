import { Card, CardActionArea, CardContent } from '@mui/material';
import { Box } from '@mui/system';
import React, { FC } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router';

export const AddGame: FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/game/editor');
  };

  return (
    <Card sx={{ display: 'flex' }}>
      <CardActionArea onClick={handleClick}>
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: '0' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <AddIcon />
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  );
};
