import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import type { RegisterOptions } from 'react-hook-form';
import { ToggleButton, ToggleButtonGroup, Typography, Box } from '@mui/material';
import { ToggleButtonVariantType, type CdfToggleButtonProps } from '@/core/types';

const CdfToggleButton: React.FC<CdfToggleButtonProps> = ({
  name,
  label,
  options,
  rules = {},
  required = false,
  disabled = false,
  variant = ToggleButtonVariantType.SQUARE,
  value,
  onChange,
  ...rest
}) => {
  const control = useFormContext()?.control;

  // 🟢 Render standalone version (no form context)
  if (!control) {
    return (
      <Box className={`cdf-toggle-root ${variant}`}>
        {label && <Typography className="cdf-toggle-label">{label}</Typography>}

        <ToggleButtonGroup
          {...rest}
          exclusive
          disabled={disabled}
          className={`cdf-toggle-group ${variant}`}
          value={value}
          onChange={(e, val) => {
            if (onChange) onChange(e, val);
          }}
        >
          {options.map((opt) => (
            <ToggleButton
              key={opt.value}
              value={opt.value}
              disabled={disabled}
              className={`cdf-toggle-option ${variant} ${value === opt.value ? 'selected' : ''}`}
            >
              {opt.title}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
    );
  }

  // 🟢 Render form-controlled version
  const validationRules: RegisterOptions = {
    required: required ? `${label || name} is required` : false,
    ...rules,
  };

  return (
    <Box className={`cdf-toggle-root ${variant}`}>
      {label && <Typography className="cdf-toggle-label">{label}</Typography>}

      <Controller
        name={name}
        control={control}
        rules={validationRules}
        defaultValue={value ?? options[0]?.value ?? ''}
        render={({ field, fieldState }) => (
          <>
            <ToggleButtonGroup
              {...rest}
              className={`cdf-toggle-group ${variant}`}
              value={field.value ?? ''}
              exclusive
              onChange={(e, val) => {
                field.onChange(val);
                onChange?.(e, val);
              }}
              disabled={disabled}
            >
              {options.map((opt) => (
                <ToggleButton
                  key={opt.value}
                  value={opt.value}
                  disabled={disabled}
                  className={`cdf-toggle-option ${variant} ${
                    field.value === opt.value ? 'selected' : ''
                  }`}
                >
                  {opt.title}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>

            {fieldState.error && (
              <Typography className="cdf-toggle-error" color="error">
                {fieldState.error.message}
              </Typography>
            )}
          </>
        )}
      />
    </Box>
  );
};

export default CdfToggleButton;
