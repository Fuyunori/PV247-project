import { FC } from 'react';
import { Grid } from '@mui/material';
import usePageTitle from '../hooks/usePageTitle';
import ConfigurationPreview from '../components/ConfigurationPreview';
import Configuration from '../models/Configuration';

const Configurations: FC = () => {
  usePageTitle('Browse configurations');
  // TODO uncomment when connected to Firestore
  // const configurations = useConfigurations();

  const configurations: Configuration[] = [
    {
      id: '123',
      name: 'Mock Config',
      authorName: 'John Smith',
      width: 80,
      height: 50,
      createdAt: new Date(),
      initialGeneration: [
        [0, 0],
        [5, 5],
        [3, 3],
        [79, 6],
      ],
    },
    {
      id: '456',
      name: 'Mock Config',
      authorName: 'John Smith',
      width: 80,
      height: 50,
      createdAt: new Date(),
      initialGeneration: [
        [0, 0],
        [5, 5],
        [3, 3],
        [79, 6],
      ],
    },
    {
      id: '789',
      name: 'Mock Config',
      authorName: 'John Smith',
      width: 80,
      height: 50,
      createdAt: new Date(),
      initialGeneration: [
        [0, 0],
        [5, 5],
        [3, 3],
        [79, 6],
      ],
    },
  ];

  return (
    <Grid container spacing={2}>
      {configurations?.map((configuration) => (
        <Grid key={configuration.id} item xs={4}>
          <ConfigurationPreview configuration={configuration} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Configurations;
