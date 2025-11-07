import * as React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { CdfPillTabsProps } from '@core/types';

// ---------- Styled Components -----------

const StyledContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  display: 'flex',
  justifyContent: 'flex-start',
}));

const StyledTabs = styled(Tabs)(() => ({
  minHeight: '32px',
  '& .MuiTabs-flexContainer': {
    gap: 8,
  },
  '& .MuiTabs-indicator': {
    display: 'none',
  },
}));

const StyledTab = styled(Tab, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme, active }) => ({
  textTransform: 'none',
  minHeight: '36px',
  height: '36px',
  width: '95px',
  borderRadius: '4px',
  fontSize: '0.875rem',
  fontWeight: 500,
  color: active ? theme.palette.background.paper : theme.palette.grey[700],
  backgroundColor: active ? theme.palette.primary.main : 'transparent',
  '&:hover': {
    backgroundColor: active ? theme.palette.primary.main : theme.palette.grey[100],
  },
  '&.Mui-selected': {
    color: theme.palette.background.paper,
  },
  padding: 0,
}));

// ---------- Component ----------

const CdfPillTabs: React.FC<CdfPillTabsProps> = ({ tabs, initialValue = 0, onChange }) => {
  const [activeTab, setActiveTab] = React.useState(initialValue);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    onChange?.(newValue);
  };

  return (
    <StyledContainer>
      <StyledTabs value={activeTab} onChange={handleChange} aria-label="pill tabs">
        {tabs.map((label, index) => (
          <StyledTab key={index} label={label} active={activeTab === index} />
        ))}
      </StyledTabs>
    </StyledContainer>
  );
};

export default CdfPillTabs;
