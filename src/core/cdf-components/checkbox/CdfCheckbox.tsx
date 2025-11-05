import React, { useState, useEffect } from 'react';
import { Controller, useFormContext, type FieldValues } from 'react-hook-form';
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Typography,
} from '@mui/material';
import type { CdfCheckboxProps } from '@/core/types';

const CdfCheckbox: React.FC<CdfCheckboxProps> = ({
  name,
  label = 'Accept terms and conditions',
  required = false,
  disabled = false,
  rules = {},
  checked = false,
  onChange,
  ...rest
}) => {
  const [localChecked, setLocalChecked] = useState<boolean>(checked);

  useEffect(() => {
    if (checked !== undefined) setLocalChecked(checked);
  }, [checked]);

  const methods = useFormContext<FieldValues>();
  const control = methods?.control;

  const validationRules = {
    required: required ? `${label || 'This field'} is required` : false,
  };

  const renderLabel = (
    <Typography
      variant="body1"
      sx={{
        color: disabled ? 'text.disabled' : 'text.primary',
        userSelect: 'none',
      }}
    >
      {label}
      {required && (
        <Typography component="span" variant="body1" color="error" sx={{ ml: 0.3 }}>
          *
        </Typography>
      )}
    </Typography>
  );

  if (!control) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.checked;
      setLocalChecked(newValue);
      onChange?.(event, newValue);
    };

    return (
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              {...rest}
              checked={localChecked}
              onChange={handleChange}
              disabled={disabled}
            />
          }
          label={renderLabel}
        />
        {required && !localChecked && (
          <Box sx={{ ml: 5 }}>
            <FormHelperText error>{`${label || 'This field'} is required`}</FormHelperText>
          </Box>
        )}
      </FormGroup>
    );
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={{ ...validationRules, ...rules }}
      defaultValue={checked ?? false}
      render={({ field, fieldState }) => (
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                {...rest}
                checked={!!field.value}
                disabled={disabled}
                onChange={(e) => {
                  field.onChange(e.target.checked);
                  onChange?.(e, e.target.checked);
                }}
              />
            }
            label={renderLabel}
          />
          {fieldState.error && (
            <Box sx={{ ml: 5 }}>
              <FormHelperText error>{fieldState.error.message}</FormHelperText>
            </Box>
          )}
        </FormGroup>
      )}
    />
  );
};

export default CdfCheckbox;
