import React, { FC, useState } from 'react';
import { Alert, Container, Snackbar } from '@mui/material';

type Props = {
  detectedCycle: boolean;
  closeCycleSnackbar: () => void;
};

const CycleAlert: FC<Props> = ({ detectedCycle, closeCycleSnackbar }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{ marginTop: 7 }}
      autoHideDuration={3000}
      open={detectedCycle}
      onClose={closeCycleSnackbar}
    >
      <Alert severity="info" sx={{ backgroundColor: 'grey.800' }}>
        A cycle has been detected.
      </Alert>
    </Snackbar>
  );
};

export default CycleAlert;
