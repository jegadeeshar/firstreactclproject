import React, { useState } from 'react';
import { Dialog, DialogContent, DialogActions, Typography, DialogTitle } from '@mui/material';
import type { CdfDialogProps } from '@core/types';
import { CdfCancelButton, CdfSubmitButton } from '@cdf-components/buttons/CdfButtons';

// Main Component
const CdfDialog: React.FC<CdfDialogProps> = ({
  open = false, // Controls whether the dialog is open or closed by default
  title, // Text displayed in the dialog header
  children, // Content displayed inside the dialog body
  submitButtonLabel = 'Submit', // Label for the footer action button
  onButtonClick, // Callback triggered when the footer button is clicked
  showCancel = true, // Toggles visibility of the close (X) button in the header
  ...props
}) => {
  const [opened, setOpen] = useState(open);

  const handleClose = () => setOpen(false);

  return (
    <Dialog
      open={opened}
      onClose={handleClose}
      maxWidth={false}
      PaperProps={{
        sx: {
          borderRadius: 5,
          overflow: 'hidden',
        },
      }}
      {...props}
    >
      <DialogTitle>
        <Typography
          variant="h6"
          sx={(theme) => ({
            color: theme.palette.primary.main,
          })}
        >
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>

      <DialogActions
        sx={(theme) => ({
          justifyContent: 'center',
          padding: theme.spacing(2, 3),
        })}
      >
        {showCancel && <CdfCancelButton onClick={handleClose} label="Cancel" />}
        {onButtonClick && (
          <CdfSubmitButton
            label={submitButtonLabel}
            fullWidth={!showCancel}
            onClick={onButtonClick}
          />
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CdfDialog;
