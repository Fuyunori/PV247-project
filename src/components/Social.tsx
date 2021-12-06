import { FC, useState } from 'react';
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Stack,
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import SaveIcon from '@mui/icons-material/Save';
import { Form } from 'react-final-form';
import getUniqueName from '../utils/getUniqueName';
import RequiredTextInput from './RequiredTextInput';
import { Radios } from 'mui-rff';

const defaultConfigName = getUniqueName();

type Props = {
  onShare: () => Promise<void>;
  onSaveCurrentGeneration: (configName: string) => Promise<void>;
  onSaveSimulation: (configName: string) => Promise<void>;
};

const Social: FC<Props> = ({ onShare, onSaveCurrentGeneration, onSaveSimulation }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [saveDialogIsOpen, setSaveDialogOpen] = useState(false);
  const [generatingShareLink, setGeneratingShareLink] = useState(false);

  const handleShare = async () => {
    setGeneratingShareLink(true);
    await onShare();
    setSnackbarOpen(true);
    setGeneratingShareLink(false);
  };

  const onSaveButtonClick = async () => {
    setSaveDialogOpen(true);
  };

  const handleSubmit = async ({ configName, saveType }: { configName: string; saveType: string }) => {
    setSaveDialogOpen(false);
    if (saveType === 'currentGeneration') {
      await onSaveCurrentGeneration(configName);
    } else {
      await onSaveSimulation(configName);
    }
  };

  const closeSnackbar = () => setSnackbarOpen(false);
  const closeSaveDialog = () => setSaveDialogOpen(false);

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ marginTop: 7 }}
        autoHideDuration={3000}
        open={snackbarOpen}
        onClose={closeSnackbar}
      >
        <Alert severity="success" sx={{ backgroundColor: 'grey.800' }}>
          Link has been copied to clipboard.
        </Alert>
      </Snackbar>

      <Form
        initialValues={{
          configName: defaultConfigName,
          saveType: 'currentGeneration',
        }}
        onSubmit={handleSubmit}
        render={({ handleSubmit }) => (
          <Dialog open={saveDialogIsOpen} onClose={closeSaveDialog}>
            <DialogTitle>Save</DialogTitle>
            <DialogContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                minWidth: 500,
              }}
            >
              <RequiredTextInput id="configName" label="Configuration name" sx={{ marginTop: 1 }} />

              <Radios
                name="saveType"
                required={true}
                data={[
                  { value: 'currentGeneration', label: 'Current generation' },
                  { value: 'wholeSimulation', label: 'Whole simulation' },
                ]}
                radioGroupProps={{ row: true, ['aria-label']: 'save type' }}
              />
            </DialogContent>

            <DialogActions>
              <Button onClick={closeSaveDialog}>Cancel</Button>
              <Button onClick={handleSubmit} variant="contained">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        )}
      />
      <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} alignItems="center" gap={2} sx={{ marginY: 3 }}>
        <Button
          variant="contained"
          endIcon={generatingShareLink ? <CircularProgress sx={{ color: 'grey.500' }} size={17} /> : <ShareIcon />}
          onClick={handleShare}
          disabled={generatingShareLink}
        >
          Share
        </Button>
        <Button variant="contained" endIcon={<SaveIcon />} onClick={onSaveButtonClick}>
          Save
        </Button>
      </Stack>
    </>
  );
};

export default Social;
