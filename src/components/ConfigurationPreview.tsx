import { FC } from 'react';
import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Configuration from '../models/Configuration';
import Canvas from './Canvas';

type Props = {
  readonly configuration: Configuration;
};

const ConfigurationPreview: FC<Props> = ({ configuration }) => {
  return (
    <Card sx={{ display: 'flex' }}>
      <CardActionArea component={Link} to={`/configuration/${configuration.id}`}>
        <Canvas
          generation={configuration.initialGeneration}
          configWidth={configuration.width}
          configHeight={configuration.height}
          canvasWidth={200}
          canvasHeight={200}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
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
