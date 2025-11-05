import React, { useState, useEffect } from 'react';
import { InputBase, IconButton } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import type { CdfSearchBarProps, StyledSearchBoxProps } from '@/core/types';

// ---- Styled Container ----
const SearchBox = styled('div', {
  shouldForwardProp: (prop) => prop !== 'width' && prop !== 'disabled',
})<StyledSearchBoxProps>(({ theme, width = '100%', disabled = false }) => ({
  display: 'flex',
  alignItems: 'center',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  width: width || '100%',
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  backgroundColor: disabled
    ? theme.palette.action.disabledBackground
    : theme.palette.background.paper,
  opacity: disabled ? 0.6 : 1,
  pointerEvents: disabled ? 'none' : 'auto',
}));

// ---- Main Component ----
const CdfSearchBar: React.FC<CdfSearchBarProps> = ({
  value: controlledValue,
  placeholder = 'Search...',
  autoFocus = false,
  disabled = false,
  width = '100%', // ✅ default full width
  onSearch,
}) => {
  const theme = useTheme();
  const [value, setValue] = useState(controlledValue ?? '');

  // Sync internal state with controlled value (if provided)
  useEffect(() => {
    if (controlledValue !== undefined) {
      setValue(controlledValue);
    }
  }, [controlledValue]);

  // Handle typing
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const newValue = e.target.value;
    if (controlledValue === undefined) {
      setValue(newValue);
    }
    onSearch?.(newValue);
  };

  // Handle clear button click
  const handleClear = () => {
    if (disabled) return;
    if (controlledValue === undefined) {
      setValue('');
    }
    onSearch?.('');
  };

  return (
    <SearchBox width={width} disabled={disabled}>
      <SearchIcon sx={{ color: theme.palette.text.secondary, mr: 1 }} />
      <InputBase
        value={controlledValue ?? value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        inputProps={{ 'aria-label': 'search-input' }}
        sx={{ flex: 1 }}
      />
      {value && !disabled && (
        <IconButton
          aria-label="clear"
          onClick={handleClear}
          data-testid="clearIcon"
          size="small"
          sx={{ ml: 1 }}
        >
          <ClearIcon fontSize="small" />
        </IconButton>
      )}
    </SearchBox>
  );
};

export default CdfSearchBar;
