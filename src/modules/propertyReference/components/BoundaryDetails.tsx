import CdfInput from '@/core/cdf-components/input/CdfInput';
import CdfToggleButton from '@/core/cdf-components/togglebutton/CdfToggleButton';
import PropertyUsageDropdown from '@/core/components/dropdown/PropertyUsageDropdown';
import logger from '@/core/utils/loggerUtils';
import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
const BoundaryDetails: React.FC = () => {
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));
  logger.debug('Is Mobile View: ', isMobileView);
  return (
    <>
      <Grid size={{ xs: 12, sm: 4 }}>
        <Typography variant="h6" fontWeight="600" sx={{ color: '#105293' }}>
          Boundary Details
        </Typography>
      </Grid>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CdfInput label="North" name="east" placeholder="Enter North Direction" />
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <CdfInput label="East" name="east" placeholder="Enter East Direction" />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CdfInput label="South" name="south" placeholder="Enter South Direction" />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CdfInput label="West" name="south" placeholder="Enter West Direction" />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}></Grid>
        <Grid size={{ xs: 12, sm: 4 }}></Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CdfInput
            label="Area of Property(in sq ft)"
            name="area"
            placeholder="Area of Property(in sq ft)"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CdfInput label="BUA(in sq ft)" name="area" placeholder="BUA(in sq ft)" />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CdfToggleButton
            label="Approved Plan Available"
            name="toggle"
            onChange={() => {}}
            options={[
              {
                title: 'Yes',
                value: 'Yes',
              },
              {
                title: 'No',
                value: 'No',
              },
            ]}
            value="A"
            variant="square"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CdfInput
            label="Additional Doc given for Valuation"
            name="area"
            placeholder="Additional Doc given for Valuation"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}></Grid>
        <Grid size={{ xs: 12, sm: 4 }}></Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CdfToggleButton
            label="Is it a purchase transaction?"
            name="toggle"
            onChange={() => {}}
            options={[
              {
                title: 'Yes',
                value: 'Yes',
              },
              {
                title: 'No',
                value: 'No',
              },
            ]}
            value="A"
            variant="square"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          {' '}
          <PropertyUsageDropdown label="Property Usage" />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CdfInput
            label="Name Of Present Property Owner"
            name="area"
            placeholder="Name Of Present Property Owner"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}></Grid>
      </Grid>
    </>
  );
};

export default BoundaryDetails;
