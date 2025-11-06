import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DynamicGrid from '@/core/components/DynamicGrid';
import CdfUploadPreview from '@/core/cdf-components/upload/CdfUploadPreview';
import { CdfAccordion } from '@/core/cdf-components/accordion/CdfAccordion';
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
  const [properties] = useState<PropertyData[]>([
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
    {
      propertyDetailsData: {
        loanOnSameCollateral: 'No',
        propertyUsage: 'Rented',
        propertyType: 'Apartment',
        propertyTitle: 'Leasehold',
        propertyOwnership: 'Joint',
        propertyOwner: 'John Doe',
        customerName: 'John Doe',
        typeOfDocument: 'Lease Agreement',
        buyerName: 'Sample Buyer',
        sellerName: 'Sample Seller',
        propertyTypeAsPerTheAboveDeed: 'Flat',
      },
      boundaryDetailsData: {
        north: 'Road',
        east: 'Park',
        south: 'Building',
        west: 'Commercial Area',
        areaOfProperty: '1200',
        bua: '1000',
        buaInSqFt: '1000',
        approvedPlanAvailable: 'No',
        anyAdditionalDocGivenForValuation: 'Floor Plan',
        isItAPurchaseTransaction: 'No',
        nameOfProposedPropertyOwner: 'Jane Smith',
        nameOfPresentPropertyOwner: 'John Doe',
        propertyLatDetails: '12.9716',
        propertyLongDetails: '77.5946',
      },
      collateralAddressData: {
        collateralId: '789012',
        addressLine1: '45, MG Road, Koramangala, Bangalore',
        addressLine2: '45, MG Road, Koramangala, Bangalore',
        landmark: 'Near Metro Station',
        pincode: '560034',
        city: 'Bangalore',
        state: 'Karnataka',
        yearsAtAddress: '5',
        yearsAtCity: '10',
      },
    },
  ]);

  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const elementPosition = containerRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 80;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, [activeProperty]);

  const currentProperty = properties[activeProperty];

  return (
    <Box ref={containerRef} sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
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
      </Box>

      <Box ref={contentRef}>
        <CdfAccordion
          defaultExpanded
          summary={
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#105293' }}>
              PROPERTY DETAILS
            </Typography>
          }
          details={
            <>
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
            </>
          }
        />

        <CdfAccordion
          sx={{ mt: 2 }}
          summary={
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#105293' }}>
              BOUNDARY DETAILS
            </Typography>
          }
          details={<DynamicGrid data={currentProperty.boundaryDetailsData} />}
        />

        <CdfAccordion
          sx={{ mt: 2 }}
          summary={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#105293' }}>
                COLLATERAL ADDRESS
              </Typography>
            </Box>
          }
          details={
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <CheckCircleIcon sx={{ color: 'success.main', fontSize: 20 }} />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  INITIATE(DUE DILIGENCE CHECK)
                </Typography>
              </Box>
              <DynamicGrid data={currentProperty.collateralAddressData} />
            </>
          }
        />
      </Box>
    </Box>
  );
};

export default PropertyDetailsView;
