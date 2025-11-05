import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import type { CdfAlertProps } from '@core/types';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const CdfAlert: React.FC<CdfAlertProps> = ({
  message,
  type,
  open,
  onClose,
  index = 0,
  autoHideDuration = 3000,
}) => {
  return (
    <Snackbar
      key={index}
      open={open}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      onClose={(_, reason) => {
        if (reason !== 'clickaway') onClose();
      }}
      sx={{ mb: `${16 + index * 80}px`, minWidth: 300 }}
    >
      <Alert onClose={onClose} severity={type} sx={{ width: '100%' }}>
        <AlertTitle style={{ textTransform: 'capitalize' }}>{type}</AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CdfAlert;
