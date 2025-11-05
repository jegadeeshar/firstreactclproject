import React from 'react';
import { Button } from '@mui/material';
import type { CdfButtonProps, CdfIconButtonProps } from '@/core/types';

// Icon Button Component
export const CdfIconButton: React.FC<CdfIconButtonProps> = ({ icon, label, ...props }) => {
  return (
    <Button startIcon={icon} variant="outlined" color="primary" {...props}>
      {label}
    </Button>
  );
};

// 🟩 Submit Button — primary color, contained variant
export const CdfSubmitButton: React.FC<CdfButtonProps> = ({ label = 'Submit', ...props }) => {
  return (
    <Button variant="contained" type="submit" color="primary" {...props}>
      {label}
    </Button>
  );
};

// 🟥 Delete Button — error color, contained variant
export const CdfDeleteButton: React.FC<CdfButtonProps> = ({ label = 'Delete', ...props }) => {
  return (
    <Button variant="contained" color="error" {...props}>
      {label}
    </Button>
  );
};

// Cancel Button — secondary color, outlined variant
export const CdfCancelButton: React.FC<CdfButtonProps> = ({ label = 'Cancel', ...props }) => {
  return (
    <Button variant="outlined" color="secondary" {...props}>
      {label}
    </Button>
  );
};
