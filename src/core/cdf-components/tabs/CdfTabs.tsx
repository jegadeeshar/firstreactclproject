import * as React from 'react';
import { Grid, Tab, Tabs, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { CdfTabsProps } from '@/core/types';

const StyledTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  '& .MuiTabs-indicator': {
    height: theme.spacing(0.5),
    borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
    backgroundColor: theme.palette.primary.main,
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: theme.typography.body2.fontSize,
  color: theme.palette.text.secondary,
  padding: theme.spacing(1, 1.5),
  '&.Mui-selected': {
    color: theme.palette.primary.main,
  },
}));

const CdfTabs: React.FC<CdfTabsProps> = ({ tabs, defaultValue, ...props }) => {
  const [activeTab, setActiveTab] = React.useState(defaultValue || tabs[0]?.value || '');

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      {/* Tabs Header */}
      <Grid size={{ xs: 12, sm: 6 }}>
        <StyledTabs
          value={activeTab}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          {...props}
        >
          {tabs.map((tab) => (
            <StyledTab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </StyledTabs>
      </Grid>

      {/* Tab Content */}

      <Grid size={{ xs: 12, sm: 6 }} width={'100%'}>
        {tabs.map(
          (tab) =>
            activeTab === tab.value && (
              <Box key={tab.value} sx={{ mt: 2, p: 2 }}>
                {tab.content}
              </Box>
            )
        )}
      </Grid>
    </Box>
  );
};

export default CdfTabs;
