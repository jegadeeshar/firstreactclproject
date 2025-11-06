import React, { useState, useRef } from 'react';
import { Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DynamicGrid from '@/core/components/DynamicGrid';
import CdfUploadPreview from '@/core/cdf-components/upload/CdfUploadPreview';
import { CdfAccordion } from '@/core/cdf-components/accordion/CdfAccordion';
import CdfTabs from '@/core/cdf-components/tabs/CdfTabs';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const ScrollableContainer = styled('div')(({ theme }) => ({
  height: '100%',
  overflowY: 'auto',
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
}));

type PropertyData = {
  propertyDetailsData: Record<string, string>;
  boundaryDetailsData: Record<string, string>;
  collateralAddressData: Record<string, string>;
};

const PropertyDetailsView: React.FC = () => {
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

  const containerRef = useRef<HTMLDivElement>(null);

  const renderPropertyContent = (property: PropertyData) => (
    <>
      <CdfAccordion
        defaultExpanded
        summary={
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#105293' }}>
            PROPERTY DETAILS
          </Typography>
        }
        details={
          <>
            <div style={{ marginBottom: '24px' }}>
              <DynamicGrid data={property.propertyDetailsData} />
            </div>

            <div style={{ marginTop: '24px' }}>
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
            </div>
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
        details={<DynamicGrid data={property.boundaryDetailsData} />}
      />

      <CdfAccordion
        sx={{ mt: 2, mb: 4 }}
        summary={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#105293' }}>
              COLLATERAL ADDRESS
            </Typography>
          </div>
        }
        details={
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <CheckCircleIcon sx={{ color: 'success.main', fontSize: 20 }} />
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                INITIATE(DUE DILIGENCE CHECK)
              </Typography>
            </div>
            <DynamicGrid data={property.collateralAddressData} />
          </>
        }
      />
    </>
  );

  const tabs = properties.map((property, index) => ({
    label: `Property ${index + 1}`,
    value: `property-${index}`,
    content: renderPropertyContent(property),
  }));

  return (
    <ScrollableContainer ref={containerRef}>
      <CdfTabs tabs={tabs} defaultValue="property-0" />
    </ScrollableContainer>
  );
};

export default PropertyDetailsView;
