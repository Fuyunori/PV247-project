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
    <Grid container spacing={2} sx={{ marginTop: 1 }}>
      {configurations.map((configuration) => (
        <Grid key={configuration.id} item xs={12} sm={6} md={4} lg={3}>
          <ConfigurationPreview configuration={configuration} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Configurations;
