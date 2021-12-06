import React, { FC, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

type CycleAlertProps = {
  readonly hasCycle: boolean;
};

export const CycleAlert: FC<CycleAlertProps> = ({ hasCycle }) => {
  const [open, setOpen] = useState(hasCycle);

  const closeSnackbar = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{ marginTop: 7 }}
      autoHideDuration={3000}
      open={open}
      onClose={closeSnackbar}
    >
      <Alert severity="info" sx={{ backgroundColor: 'grey.800' }}>
        A cycle has been detected.
      </Alert>
    </Snackbar>
  );
};
