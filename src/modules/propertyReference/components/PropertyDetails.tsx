import CdfInput from '@/core/cdf-components/input/CdfInput';
import CdfToggleButton from '@/core/cdf-components/togglebutton/CdfToggleButton';
import CdfUploadPreview from '@/core/cdf-components/upload/CdfUploadPreview';
import CdfFileUpload from '@/core/cdf-components/uploadtype/CdfFileUpload';
import { PropertyTypeDropdown } from '@/core/components/dropdown';
import PropertyUsageDropdown from '@/core/components/dropdown/PropertyUsageDropdown';
import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

const PropertyDetails: React.FC = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="h6" fontWeight="600" sx={{ color: '#105293' }}>
              PROPERTY DETAILS
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}></Grid>
          <Grid size={{ xs: 12, sm: 4 }}></Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <PropertyUsageDropdown label="Name of purposed Property Owner" />
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            {' '}
            <PropertyTypeDropdown label="Property Type" />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <CdfToggleButton
              label="Property Title"
              name="toggle"
              onChange={() => {}}
              options={[
                {
                  title: 'freehold',
                  value: 'Freehold',
                },
                {
                  title: 'leasehold',
                  value: 'Leasehold',
                },
              ]}
              value="A"
              variant="square"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <CdfToggleButton
              label="Property Ownership"
              name="toggle"
              onChange={() => {}}
              options={[
                {
                  title: 'freehold',
                  value: 'Sole',
                },
                {
                  title: 'joint',
                  value: 'Joint',
                },
              ]}
              value="A"
              variant="square"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <PropertyTypeDropdown label="Property Owner" />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}></Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            {' '}
            <PropertyTypeDropdown label="Type Of Document" />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <CdfFileUpload name="file" />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <CdfUploadPreview
              onDelete={() => {}}
              previewUrl="https://media.assettype.com/outlookmoney/2025-08-18/vw8vxlhj/PVC-Aadhaar-card.png?w=801&auto=format%2Ccompress&fit=max&format=webp&dpr=1.0"
              title="Aadhaar"
              type="JPEG"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <CdfInput label="Buyer Name" name="buyer" placeholder="Buyer Name" />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <CdfInput label="Seller Name" name="sellerr" placeholder="Seller Name" />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <PropertyTypeDropdown label="Property Name As Per Above Deed" />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PropertyDetails;
