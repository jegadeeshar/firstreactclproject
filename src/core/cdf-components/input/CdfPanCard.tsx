import React from 'react';
import { type RegisterOptions } from 'react-hook-form';
import { TextField } from '@mui/material';
import CdfInputButton from './CdfInputButton';
import type { CustomInputButtonProps } from '@/core/types';
import logger from '@/core/utils/loggerUtils';

const CdfPanCard: React.FC<CustomInputButtonProps> = ({
  required = false,
  disabled = false,
  value = '',
  isVerified = false,
  ...rest
}) => {
  const PANCARD_PATTERN = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

  const validationRules: RegisterOptions = {
    pattern: {
      value: PANCARD_PATTERN,
      message: 'Invalid PAN Card number',
    },
  };

  // TODO: handler function for pancard verification
  const handleVerify = (pancard: string) => {
    logger.debug(`..Verifying pan - ${pancard}`);
  };

  // Return read-only field if disabled
  if (isVerified) {
    return (
      <TextField {...rest} label="PAN" value={value} placeholder="PAN" margin="normal" disabled />
    );
  }

  return (
    <CdfInputButton
      label="PAN"
      rules={validationRules}
      name="pancard"
      required={required}
      handleVerify={handleVerify}
      disabled={disabled}
      {...rest}
    />
  );
};

export default CdfPanCard;
