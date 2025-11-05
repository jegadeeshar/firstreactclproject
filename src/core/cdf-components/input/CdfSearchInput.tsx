import React, { useState } from 'react';
import {
  Controller,
  useFormContext,
  type RegisterOptions,
  type ControllerRenderProps,
  type ControllerFieldState,
  type FieldValues,
} from 'react-hook-form';
import {
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
  OutlinedInput,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import type { CdfSearchInputProps } from '@/core/types';

// Render function moved outside component and strongly typed
const renderSearchField = <T extends FieldValues>(props: {
  field: ControllerRenderProps<T>;
  fieldState: ControllerFieldState;
  label: string;
  placeholder: string;
  loading: boolean;
  fullWidth: boolean;
  triggerSearch: (query: string) => void;
}) => {
  const { field, fieldState, label, placeholder, loading, fullWidth, triggerSearch } = props;
  const { value, onChange, onBlur } = field;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      triggerSearch(value);
    }
  };

  return (
    <TextField
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onKeyDown={handleKeyDown}
      disabled={loading}
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
      fullWidth={fullWidth}
      slots={{ input: OutlinedInput }}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => triggerSearch(value)}
                disabled={loading || !value.trim()}
                edge="end"
                aria-label="search"
              >
                {loading ? <CircularProgress size={24} /> : <SearchIcon />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

const CdfSearchInput: React.FC<CdfSearchInputProps> = ({
  name,
  label = 'Search',
  placeholder = 'Enter search term',
  required = false,
  disabled = false,
  value = '',
  rules = {},
  fullWidth = false,
  onSearch,
}) => {
  const { control, trigger } = useFormContext();
  const [loading, setLoading] = useState(false);

  const validationRules: RegisterOptions = {
    required: required ? `${label} is required` : false,
    ...rules,
  };

  // Function to handle search trigger
  const triggerSearch = async (query: string) => {
    const valid = await trigger(name);
    if (!valid) return;
    if (!query.trim()) return;

    setLoading(true);
    try {
      await onSearch(query.trim());
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  // Return read-only if disabled
  if (disabled) {
    return (
      <TextField
        label={label}
        value={value}
        placeholder={placeholder}
        disabled
        fullWidth={fullWidth}
      />
    );
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={validationRules}
      defaultValue=""
      render={({ field, fieldState }) =>
        renderSearchField({
          field,
          fieldState,
          label,
          placeholder,
          loading,
          fullWidth,
          triggerSearch,
        })
      }
    />
  );
};

export default CdfSearchInput;
