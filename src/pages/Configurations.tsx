import { FC } from 'react';
import { Box } from '@mui/material';
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
      initialGeneration: {
        aliveCells: [
          [0, 0],
          [5, 5],
          [3, 3],
          [79, 6],
        ],
      },
    },
    {
      id: '456',
      name: 'Mock Config',
      authorName: 'John Smith',
      width: 80,
      height: 50,
      createdAt: new Date(),
      initialGeneration: {
        aliveCells: [
          [0, 0],
          [5, 5],
          [3, 3],
          [79, 6],
        ],
      },
    },
    {
      id: '789',
      name: 'Mock Config',
      authorName: 'John Smith',
      width: 80,
      height: 50,
      createdAt: new Date(),
      initialGeneration: {
        aliveCells: [
          [0, 0],
          [5, 5],
          [3, 3],
          [79, 6],
        ],
      },
    },
  ];

  return (
    <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
      {configurations?.map((configuration) => (
        <Box key={configuration.id}>
          <ConfigurationPreview configuration={configuration} />
        </Box>
      ))}
    </Box>
  );
};

export default Configurations;
