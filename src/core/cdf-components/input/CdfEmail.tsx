import React from 'react';
import { Controller, useFormContext, type RegisterOptions } from 'react-hook-form';
import { TextField } from '@mui/material';
import type { CdfInputProps } from '@core/types';

const CdfEmail: React.FC<CdfInputProps> = ({
  name,
  label = 'Email ID',
  placeholder = '',
  required = false,
  disabled = false,
  rules = {}, // default empty
  ...rest // Allow all default props of mui TextField component
}) => {
  // Get form context if exists
  const control = useFormContext()?.control;

  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Default mail validation rules
  const validationRules: RegisterOptions = {
    required: required ? `${label} is required` : false,
    pattern: { value: EMAIL_PATTERN, message: 'Invalid email format' },
  };

  // if no form context, return uncontrolled input
  if (!control) {
    return <TextField {...rest} label={label} placeholder={placeholder} disabled={disabled} />;
  }

  // Return controlled input
  return (
    <Controller
      name={name}
      control={control}
      rules={{ ...validationRules, ...rules }} // merge default and custom rules
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          {...rest}
          label={label}
          placeholder={placeholder}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          disabled={disabled}
        />
      )}
    />
  );
};

export default CdfEmail;
