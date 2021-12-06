import React, { FC, useState } from 'react';
import { Alert, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type CycleAlertProps = {
  readonly isOpen: boolean;
};

export const CycleAlert: FC<CycleAlertProps> = ({ isOpen, children }) => {
  const [open, setOpen] = useState(isOpen);

  return (
    <Collapse in={open}>
      <Alert
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        variant="filled"
        severity="info"
        sx={{ margin: '20px' }}
        onClose={() => setOpen(false)}
      >
        {children}
      </Alert>
    </Collapse>
  );
};
