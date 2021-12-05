import { FC } from 'react';
import { Button, Stack } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import SaveIcon from '@mui/icons-material/Save';

type Props = {
  onShare: () => void;
  onSaveCurrentGeneration: () => void;
  onSaveSimulation: () => void;
};

const Social: FC<Props> = ({ onShare, onSaveCurrentGeneration, onSaveSimulation }) => {
  return (
    <Stack direction="row" alignItems="center" gap={2}>
      <Button variant="contained" endIcon={<ShareIcon />} onClick={onShare}>
        Share
      </Button>
      <Button variant="contained" endIcon={<SaveIcon />} onClick={onSaveCurrentGeneration}>
        Save current generation
      </Button>
      <Button variant="contained" endIcon={<SaveIcon />} onClick={onSaveSimulation}>
        Save simulation
      </Button>
    </Stack>
  );
};

export default Social;
