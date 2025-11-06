import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DynamicGrid from '@/core/components/DynamicGrid';
import CdfUploadPreview from '@/core/cdf-components/upload/CdfUploadPreview';
import { Grid } from '@mui/material';

const PropertyDetailsView: React.FC = () => {
  const propertyDetailsData = {
    loanOnSameCollateral: 'Yes',
    propertyUsage: 'Self Occupied',
    propertyType: 'Farm House',
    propertyTitle: 'Freehold',
    propertyOwnership: 'Solo',
    propertyOwner: 'Krishnan Palani',
    customerName: 'Krishnan Palani',
    typeOfDocument: 'Sale Deed',
    buyerName: '-',
    sellerName: '-',
    propertyTypeAsPerTheAboveDeed: 'Only plot as per deed',
  };

  const boundaryDetailsData = {
    north: '-',
    east: '-',
    south: '-',
    west: '-',
    areaOfProperty: '-',
    bua: '-',
    buaInSqFt: '-',
    approvedPlanAvailable: 'Yes',
    anyAdditionalDocGivenForValuation: '-',
    isItAPurchaseTransaction: 'Yes',
    nameOfProposedPropertyOwner: '-',
    nameOfPresentPropertyOwner: '-',
    propertyLatDetails: '-',
    propertyLongDetails: '-',
  };

  const collateralAddressData = {
    collateralId: '123456',
    addressLine1: '16, Rajiv Gandhi Salai, Thoraipakkam, Chennai',
    addressLine2: '16, Rajiv Gandhi Salai, Thoraipakkam, Chennai',
    landmark: 'Near city mall',
    pincode: '560001',
    city: 'Bangalore',
    state: 'Karnataka',
    yearsAtAddress: '-',
    yearsAtCity: '-',
  };

  return (
    <Box sx={{ p: 3 }}>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="property-details-content"
          id="property-details-header"
        >
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#105293' }}>
            PROPERTY DETAILS
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ mb: 3 }}>
            <DynamicGrid data={propertyDetailsData} />
          </Box>

          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5 }}>
                  Uploaded Doc
                </Typography>
                <CdfUploadPreview
                  onDelete={() => {}}
                  previewUrl=""
                  title="Aadhaar"
                  type="JPEG"
                />
              </Grid>
            </Grid>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ mt: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="boundary-details-content"
          id="boundary-details-header"
        >
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#105293' }}>
            BOUNDARY DETAILS
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DynamicGrid data={boundaryDetailsData} />
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ mt: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="collateral-address-content"
          id="collateral-address-header"
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#105293' }}>
              COLLATERAL ADDRESS
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <CheckCircleIcon sx={{ color: 'success.main', fontSize: 20 }} />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              INITIATE(DUE DILIGENCE CHECK)
            </Typography>
          </Box>
          <DynamicGrid data={collateralAddressData} />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default PropertyDetailsView;
