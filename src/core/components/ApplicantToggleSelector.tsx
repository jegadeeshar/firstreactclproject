import React from 'react';
import { ToggleButton, ToggleButtonGroup, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

interface ApplicantToggleSelectorProps {
  value: string;
  onChange: (value: string) => void;
  options?: { value: string; label: string }[];
}

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  gap: theme.spacing(1),
  '& .MuiToggleButton-root': {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    textTransform: 'none',
    padding: theme.spacing(1, 2),
    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
    },
  },
}));

const ApplicantToggleSelector: React.FC<ApplicantToggleSelectorProps> = ({
  value,
  onChange,
  options = [
    { value: 'applicant', label: 'Applicant' },
    { value: 'co-applicant', label: 'Co-Applicant' },
  ],
}) => {
  const handleChange = (_event: React.MouseEvent<HTMLElement>, newValue: string | null) => {
    if (newValue !== null) {
      onChange(newValue);
    }
  };

  return (
    <Box>
      <StyledToggleButtonGroup value={value} exclusive onChange={handleChange} aria-label="applicant selector">
        {options.map((option) => (
          <ToggleButton key={option.value} value={option.value}>
            {option.label}
          </ToggleButton>
        ))}
      </StyledToggleButtonGroup>
    </Box>
  );
};

export default ApplicantToggleSelector;
