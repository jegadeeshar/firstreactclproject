import React from 'react';
import { Controller, useFormContext, type RegisterOptions } from 'react-hook-form';
import { TextField } from '@mui/material';
import type { CdfInputProps } from '@core/types';

const CdfInput: React.FC<CdfInputProps> = ({
  name,
  label,
  value,
  placeholder = '',
  required = false,
  disabled = false,
  maxLength,
  rules = {}, // default empty
  ...rest // Allow all default props of mui TextField component
}) => {
  const { control } = useFormContext();

  // Merge default rules with parent-provided rules
  const validationRules: RegisterOptions = {
    required: required ? `${label || name} is required` : false,
    maxLength: maxLength ? { value: maxLength, message: `Max ${maxLength} chars` } : undefined,
    ...rules, // override or extend
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={validationRules}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          {...rest}
          label={label}
          placeholder={placeholder}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          disabled={disabled}
          value={value}
        />
      )}
    />
  );
};

export default CdfInput;
