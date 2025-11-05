import React from 'react';
import { Controller, useFormContext, type RegisterOptions } from 'react-hook-form';
import { TextField } from '@mui/material';
import type { CdfNumberInputProps } from '@core/types';

export const CdfNumberInput: React.FC<CdfNumberInputProps> = ({
  name, // Field name (used for form registration and identification)
  label, // Label text displayed above the input field
  value, // Default or controlled value of the input
  placeholder = '', // Hint text displayed when the field is empty
  required = false, // Marks the field as mandatory if true
  disabled = false, // Disables user input when true
  min, // Minimum allowed numeric value
  max, // Maximum allowed numeric value
  rules = {}, // Additional validation rules for react-hook-form
  ...rest // Spread for any other props passed to TextField
}) => {
  const control = useFormContext()?.control;

  const validationRules: RegisterOptions = {
    required: required ? `${label || name} is required` : false,
    min: min ? { value: min, message: `Value must be ≥ ${min}` } : undefined,
    max: max ? { value: max, message: `Value must be ≤ ${max}` } : undefined,
    ...rules,
  };

  // No Form Context → Render plain input
  if (!control) {
    return (
      <TextField
        {...rest}
        type="number"
        label={label}
        placeholder={placeholder}
        disabled={disabled}
        inputProps={{ min, max }}
        defaultValue={value ?? ''}
      />
    );
  }

  // Inside FormProvider → Controlled via RHF
  return (
    <Controller
      name={name}
      control={control}
      rules={validationRules}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          {...rest}
          type="number"
          label={label}
          placeholder={placeholder}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          disabled={disabled}
          inputProps={{ min, max }}
          value={field.value ?? ''}
          onChange={(e) => {
            const val = e.target.value;
            const numValue = val === '' ? '' : Number(val);
            field.onChange(numValue);
          }}
        />
      )}
    />
  );
};

export default CdfNumberInput;
