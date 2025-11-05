import React from 'react';
import { Controller, useFormContext, type RegisterOptions } from 'react-hook-form';
import { TextField, InputAdornment } from '@mui/material';
import type { CdfInputProps } from '@core/types';

export const CdfAmount: React.FC<CdfInputProps> = ({
  name = 'amount',
  label = 'Amount',
  placeholder = 'Enter amount',
  required = false,
  disabled = false,
  rules = {},
  ...rest
}) => {
  const control = useFormContext()?.control;

  const validationRules: RegisterOptions = {
    required: required ? `${label || name} is required` : false,
    pattern: {
      value: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
      message: 'Enter a valid number with up to 2 decimal places',
    },
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const value = input?.value ?? '';
    const { selectionStart, selectionEnd } = input ?? {};

    // Allow control/navigation keys
    if (['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
      return;
    }

    if (/[0-9]/.test(e.key)) {
      const decimalIndex = value.indexOf('.');

      if (decimalIndex !== -1 && selectionStart !== null && selectionEnd !== null) {
        const decimals = value.substring(decimalIndex + 1);
        const isAfterDecimal = selectionStart > decimalIndex;

        if (isAfterDecimal && decimals.length >= 2) {
          e.preventDefault();
          return;
        }
      }
      return;
    }

    if (e.key === '.') {
      if (value.includes('.')) {
        e.preventDefault();
      }
      return;
    }

    e.preventDefault();
  };

  if (!control) {
    return (
      <TextField
        {...rest}
        label={label}
        placeholder={placeholder}
        disabled={disabled}
        InputProps={{
          startAdornment: <InputAdornment position="start">₹</InputAdornment>,
        }}
      />
    );
  }

  // Return controlled input
  return (
    <Controller
      name={name}
      control={control}
      rules={{ ...validationRules, ...rules }}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          {...rest}
          label={label}
          placeholder={placeholder}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          disabled={disabled}
          onKeyDown={handleKeyDown}
          InputProps={{
            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
          }}
          value={field.value || ''}
        />
      )}
    />
  );
};

export default CdfAmount;
