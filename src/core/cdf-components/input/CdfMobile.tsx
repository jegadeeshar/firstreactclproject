import React from 'react';
import { Controller, useFormContext, type RegisterOptions } from 'react-hook-form';
import { TextField } from '@mui/material';
import type { CdfInputProps } from '@core/types';

const CdfMobile: React.FC<CdfInputProps> = ({
  name,
  label = 'Mobile',
  value,
  placeholder = '',
  required = false,
  disabled = false,
  rules = {}, // default empty
  ...rest // Allow all default props of mui TextField component
}) => {
  // Get form context if exists
  const control = useFormContext()?.control;

  const MOBILE_VALIDATION_REGEX = /^[6-9]\d{9}$/; // Indian mobile number pattern

  // Merge default rules with parent-provided rules
  const validationRules: RegisterOptions = {
    required: required ? `${label || name} is required` : false,
    pattern: {
      value: MOBILE_VALIDATION_REGEX,
      message: 'Enter a valid 10-digit mobile number starting with 6-9',
    },
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      !/[0-9]/.test(e.key) &&
      !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)
    ) {
      e.preventDefault();
    }
  };

  // if no form context, return uncontrolled input
  if (!control) {
    return (
      <TextField
        {...rest}
        label={label}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
      />
    );
  }

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
          value={value}
          type="tel"
          placeholder={placeholder}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          disabled={disabled}
          onKeyDown={handleKeyDown}
          inputProps={{
            maxLength: 10,
            inputMode: 'numeric',
            pattern: '[0-9]*',
          }}
        />
      )}
    />
  );
};

export default CdfMobile;
