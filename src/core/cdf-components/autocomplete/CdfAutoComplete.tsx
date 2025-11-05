import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import type { CdfDropdownPropsType } from '@core/types';
import { Controller, useFormContext } from 'react-hook-form';

const CdfAutoComplete: React.FC<CdfDropdownPropsType> = ({
  name,
  options,
  handleChange,
  label = 'Please Select',
  required,
  ...rest
}) => {
  const control = useFormContext()?.control;

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? 'This field is required' : undefined }}
      render={({ field, fieldState }) => (
        <Autocomplete
          {...field}
          getOptionLabel={(option) => option.label}
          onChange={(_, newValue) => {
            field.onChange(newValue);
            if (handleChange) handleChange(newValue);
          }}
          options={options}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              variant="outlined"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
          {...rest}
        />
      )}
    />
  );
};

export default CdfAutoComplete;
