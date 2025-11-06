import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DynamicGrid from '@/core/components/DynamicGrid';
import CdfUploadPreview from '@/core/cdf-components/upload/CdfUploadPreview';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const PropertyTabButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme, active }) => ({
  textTransform: 'none',
  minHeight: '36px',
  height: '36px',
  minWidth: '95px',
  borderRadius: '4px',
  fontSize: '0.875rem',
  fontWeight: 500,
  color: active ? theme.palette.common.white : theme.palette.grey[700],
  backgroundColor: active ? theme.palette.primary.main : 'transparent',
  '&:hover': {
    backgroundColor: active ? theme.palette.primary.main : theme.palette.grey[100],
  },
  padding: '4px 12px',
  marginRight: '8px',
}));

type PropertyData = {
  propertyDetailsData: Record<string, string>;
  boundaryDetailsData: Record<string, string>;
  collateralAddressData: Record<string, string>;
};

const PropertyDetailsView: React.FC = () => {
  const [activeProperty, setActiveProperty] = useState(0);
  const [properties, setProperties] = useState<PropertyData[]>([
    {
      propertyDetailsData: {
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
      },
      boundaryDetailsData: {
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
      },
      collateralAddressData: {
        collateralId: '123456',
        addressLine1: '16, Rajiv Gandhi Salai, Thoraipakkam, Chennai',
        addressLine2: '16, Rajiv Gandhi Salai, Thoraipakkam, Chennai',
        landmark: 'Near city mall',
        pincode: '560001',
        city: 'Bangalore',
        state: 'Karnataka',
        yearsAtAddress: '-',
        yearsAtCity: '-',
      },
    },
  ]);

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activeProperty]);

  const handleAddProperty = () => {
    setProperties([
      ...properties,
      {
        propertyDetailsData: {
          loanOnSameCollateral: '',
          propertyUsage: '',
          propertyType: '',
          propertyTitle: '',
          propertyOwnership: '',
          propertyOwner: '',
          customerName: '',
          typeOfDocument: '',
          buyerName: '',
          sellerName: '',
          propertyTypeAsPerTheAboveDeed: '',
        },
        boundaryDetailsData: {
          north: '',
          east: '',
          south: '',
          west: '',
          areaOfProperty: '',
          bua: '',
          buaInSqFt: '',
          approvedPlanAvailable: '',
          anyAdditionalDocGivenForValuation: '',
          isItAPurchaseTransaction: '',
          nameOfProposedPropertyOwner: '',
          nameOfPresentPropertyOwner: '',
          propertyLatDetails: '',
          propertyLongDetails: '',
        },
        collateralAddressData: {
          collateralId: '',
          addressLine1: '',
          addressLine2: '',
          landmark: '',
          pincode: '',
          city: '',
          state: '',
          yearsAtAddress: '',
          yearsAtCity: '',
        },
      },
    ]);
    setActiveProperty(properties.length);
  };

  const currentProperty = properties[activeProperty];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {properties.map((_, index) => (
            <PropertyTabButton
              key={index}
              active={activeProperty === index}
              onClick={() => setActiveProperty(index)}
            >
              Property {index + 1}
            </PropertyTabButton>
          ))}
        </Box>
        <Button
          startIcon={<AddCircleOutlineIcon />}
          onClick={handleAddProperty}
          sx={{ textTransform: 'none' }}
        >
          Add
        </Button>
      </Box>

      <Box ref={contentRef}>
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
              <DynamicGrid data={currentProperty.propertyDetailsData} />
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
            <DynamicGrid data={currentProperty.boundaryDetailsData} />
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
            <DynamicGrid data={currentProperty.collateralAddressData} />
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default PropertyDetailsView;
