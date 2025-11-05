import CdfTabs from '@/core/cdf-components/tabs/CdfTabs';
import logger from '@/core/utils/loggerUtils';
import BoundaryDetails from '@/modules/propertyReference/components/BoundaryDetails';
import PropertyDetails from '@/modules/propertyReference/components/PropertyDetails';
import PropertyTabButton from '@/modules/propertyReference/components/PropertyTabButton';

import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material';
import React from 'react';

const PropertyTab: React.FC = () => {
  const theme = useTheme();

  //check for mobile view
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));
  logger.debug('Is Mobile View: ', isMobileView);
  return (
    <>
      <CdfTabs
        defaultValue="bureau"
        tabs={[
          {
            content: (
              <div>
                <PropertyTabButton />
                <PropertyDetails />
                <BoundaryDetails />
              </div>
            ),
            label: 'Property Details',
            value: 'property',
          },
          {
            content: <div>This is Reference page</div>,
            label: 'Reference Details',
            value: 'reference',
          },
        ]}
      />
    </>
  );
};

export default PropertyTab;
