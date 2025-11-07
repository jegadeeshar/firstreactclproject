import CdfPillTabs from '@/core/cdf-components/tabs/CdfPillTabs';
import logger from '@/core/utils/loggerUtils';
import BoundaryDetails from '@/modules/propertyReference/components/BoundaryDetails';
import PropertyDetails from '@/modules/propertyReference/components/PropertyDetails';
import PropertyTabButton from '@/modules/propertyReference/components/PropertyTabButton';

import { useTheme } from '@emotion/react';
import { useMediaQuery, Box } from '@mui/material';
import React, { useState } from 'react';

const PropertyTab: React.FC = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);

  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));
  logger.debug('Is Mobile View: ', isMobileView);

  const tabLabels = ['Property Details', 'Reference Details'];

  const tabContent = [
    <div key="property">
      <PropertyTabButton />
      <PropertyDetails />
      <BoundaryDetails />
    </div>,
    <div key="reference">This is Reference page</div>,
  ];

  return (
    <>
      <CdfPillTabs tabs={tabLabels} initialValue={activeTab} onChange={setActiveTab} />
      <Box sx={{ mt: 2 }}>{tabContent[activeTab]}</Box>
    </>
  );
};

export default PropertyTab;
