import React from 'react';
import { Controller, useFormContext, type RegisterOptions } from 'react-hook-form';
import { TextField, InputAdornment, Button, Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import type { CdfInputButtonProps } from '@/core/types';

const CdfInputButton: React.FC<CdfInputButtonProps> = ({
  name,
  label,
  placeholder = '',
  required = false,
  disabled = false,
  value = '',
  rules = {},
  handleVerify,
  isVerified = false,
  ...rest
}) => {
  const control = useFormContext()?.control;

  const validationRules: RegisterOptions = {
    required: required ? `${label} is required` : false,
    ...rules,
  };

  // Return read-only field if disabled
  if (disabled) {
    return <TextField {...rest} label={label} value={value} placeholder={placeholder} disabled />;
  }

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
          value={field.value ?? value}
          placeholder={placeholder}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {!isVerified ? (
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => handleVerify(field.value)}
                  >
                    Verify
                  </Button>
                ) : (
                  <Chip
                    icon={<CheckCircleIcon style={{ color: 'green' }} />}
                    label="Verified"
                    variant="outlined"
                    style={{ borderColor: 'green', color: 'green' }}
                  />
                )}
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};

export default CdfInputButton;
