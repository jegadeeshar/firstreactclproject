import React, { useEffect } from 'react';
import CdfAutoComplete from '@cdf-components/autocomplete/CdfAutoComplete';
import type { CustomDropdownPropsType } from '@core/types';
import { useMasterDataStore } from '@core/store';
import { masterService } from '@core/services/masterService';

const PropertyUsageDropdown: React.FC<CustomDropdownPropsType> = ({
  name = 'propertyUsage',
  ...props
}) => {
  const { propertyUsage } = useMasterDataStore();

  useEffect(() => {
    const fetchPropertyUsage = async () => {
      if (!propertyUsage || propertyUsage.length === 0) {
        await masterService.getPropertyUsage();
      }
    };

    fetchPropertyUsage();
  }, [propertyUsage]);

  return <CdfAutoComplete {...props} name={name} options={propertyUsage} />;
};

export default PropertyUsageDropdown;
