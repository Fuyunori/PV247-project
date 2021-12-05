import { FC } from 'react';
import { Grid } from '@mui/material';
import usePageTitle from '../hooks/usePageTitle';
import ConfigurationPreview from '../components/ConfigurationPreview';
import useConfigurations from '../api/useConfigurations';

// TODO add option to select either "my configurations" or "all configurations"
// TODO maybe some filtering (by configuration name, author name,...)
// TODO add option to delete my configurations

const Configurations: FC = () => {
  usePageTitle('Browse configurations');
  const configurations = useConfigurations();

  return (
    <Grid container spacing={2}>
      {configurations.map((configuration) => (
        <Grid key={configuration.id} item xs={4}>
          <ConfigurationPreview configuration={configuration} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Configurations;
