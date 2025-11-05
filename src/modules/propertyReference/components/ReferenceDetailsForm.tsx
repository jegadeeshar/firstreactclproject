import React from 'react';
import CdfInput from '@cdf-components/input/CdfInput';
import alertUtils from '@core/utils/alertUtils';
import { Grid, Box, Typography } from '@mui/material';
import { CdfAccordion } from '@cdf-components/accordion/CdfAccordion';
import CdfLink from '@cdf-components/link/CdfLink';
import { Add } from '@mui/icons-material';

const ReferenceDetailsForm: React.FC = () => {
  const accordionDetails = (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 4 }}>
        <CdfInput name="referenceName" label={'Reference Full Name'} required fullWidth />
      </Grid>

      {}
      <Grid size={{ xs: 12, sm: 4 }}>
        <CdfInput name="relationship" label={'Relationship'} required fullWidth />
      </Grid>

      {}
      <Grid size={{ xs: 12, sm: 4 }}>
        <CdfInput name="mobileNumber" label={'Mobile No.'} required fullWidth />
      </Grid>

      {}
      <Grid size={{ xs: 12, sm: 4 }}>
        <CdfInput name="addressLine1" label={'Address Line 1'} required fullWidth multiline />
      </Grid>

      {}
      <Grid size={{ xs: 12, sm: 4 }}>
        <CdfInput name="addressLine2" label={'Address Line 2'} fullWidth multiline />
      </Grid>

      {}
      <Grid size={{ xs: 12, sm: 4 }}>
        <CdfInput name="landmark" label={'Landmark (optional)'} fullWidth />
      </Grid>

      {}
      <Grid size={{ xs: 12, sm: 4 }}>
        <CdfInput name="pincode" label={'Pincode'} required fullWidth />
      </Grid>

      {}
      <Grid size={{ xs: 12, sm: 4 }}>
        <CdfInput name="city" label={'City'} required fullWidth />
      </Grid>

      {}
      <Grid size={{ xs: 12, sm: 4 }}>
        <CdfInput name="state" label={'State'} required fullWidth />
      </Grid>
    </Grid>
  );

  return (
    <Box
      sx={{
        width: '100%',
        padding: '0 40px 60px',
        backgroundColor: '#fff',
        minHeight: 'calc(100vh - 80px)',
        mt: '80px',
      }}
    >
      {}
      <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2}>
        <CdfLink
          icon={<Add fontSize="inherit" />}
          label="Add Reference"
          onClick={() => alertUtils.info('Add Reference clicked')}
        />
      </Box>

      {}
      <CdfAccordion
        summary={
          <Typography variant="h6" fontWeight="bold" color="text.primary">
            REFERENCE CONTACT 01
          </Typography>
        }
        details={accordionDetails}
      />
    </Box>
  );
};

export default ReferenceDetailsForm;
