import React, { useEffect } from 'react';
import CdfAutoComplete from '@cdf-components/autocomplete/CdfAutoComplete';
import type { CustomDropdownPropsType } from '@core/types';
import { useMasterDataStore } from '@core/store';
import { masterService } from '@core/services/masterService';

const PropertyTypeDropdown: React.FC<CustomDropdownPropsType> = ({
  name = 'propertyType',
  ...props
}) => {
  const { propertyTypes } = useMasterDataStore();

  useEffect(() => {
    // If state is not set, call API to fetch data
    const fetchPropertyTypes = async () => {
      if (!propertyTypes || propertyTypes.length === 0) {
        await masterService.getPropertyTypes();
      }
    };

    fetchPropertyTypes();
  }, [propertyTypes]);

  return <CdfAutoComplete {...props} name={name} options={propertyTypes} />;
};

export default PropertyTypeDropdown;
