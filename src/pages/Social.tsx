import { FC, useState } from 'react';
import { Alert, Button, CircularProgress, Snackbar, Stack } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import SaveIcon from '@mui/icons-material/Save';

type Props = {
  onShare: () => Promise<void>;
  onSaveCurrentGeneration: () => void;
  onSaveSimulation: () => void;
};

const Social: FC<Props> = ({ onShare, onSaveCurrentGeneration, onSaveSimulation }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [generatingShareLink, setGeneratingShareLink] = useState(false);

  const onShareClick = async () => {
    setGeneratingShareLink(true);
    await onShare();
    setSnackbarOpen(true);
    setGeneratingShareLink(false);
  };

  const onSnackbarClose = () => setSnackbarOpen(false);

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ marginTop: 7 }}
        autoHideDuration={3000}
        open={snackbarOpen}
        onClose={onSnackbarClose}
      >
        <Alert severity="success" sx={{ backgroundColor: 'grey.800' }}>
          Link has been copied to clipboard.
        </Alert>
      </Snackbar>
      <Stack direction="row" alignItems="center" gap={2}>
        <Button
          variant="contained"
          endIcon={generatingShareLink ? <CircularProgress sx={{ color: 'grey.500' }} size={17} /> : <ShareIcon />}
          onClick={onShareClick}
          disabled={generatingShareLink}
        >
          Share
        </Button>
        <Button variant="contained" endIcon={<SaveIcon />} onClick={onSaveCurrentGeneration}>
          Save current generation
        </Button>
        <Button variant="contained" endIcon={<SaveIcon />} onClick={onSaveSimulation}>
          Save simulation
        </Button>
      </Stack>
    </>
  );
};

export default Social;
