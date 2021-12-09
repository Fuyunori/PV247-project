import { FC } from 'react';
import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Canvas from './Canvas';
import { ParsedConfiguration } from '../models/Configuration';

type Props = {
  configuration: ParsedConfiguration;
};

const ConfigurationPreview: FC<Props> = ({ configuration }) => {
  const navigate = useNavigate();

  const openConfiguration = () => {
    navigate(`/configurations/${configuration.id}`);
  };

  return (
    <Card>
      <CardActionArea
        onClick={openConfiguration}
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 2 }}
      >
        <Canvas generation={configuration.initialGeneration} boardSize={configuration.boardSize} canvasWidth={250} />
        <Box>
          <CardContent>
            <Typography component="div" variant="h5">
              {configuration.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {configuration.authorName}
            </Typography>
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default ConfigurationPreview;
