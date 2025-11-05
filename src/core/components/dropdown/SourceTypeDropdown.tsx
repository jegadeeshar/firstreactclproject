import React, { useEffect } from 'react';
import CdfAutoComplete from '@cdf-components/autocomplete/CdfAutoComplete';
import type { CustomDropdownPropsType } from '@core/types';
import { useMasterDataStore } from '@core/store';
import { masterService } from '@core/services/masterService';

const SourceTypeDropdown: React.FC<CustomDropdownPropsType> = ({
  name = 'sourceType',
  ...props
}) => {
  // use value from state
  const { sourceType } = useMasterDataStore();

  useEffect(() => {
    // If state is not set, call API to fetch data
    const fetchSourceType = async () => {
      if (!sourceType || sourceType.length === 0) {
        await masterService.getSourceType();
      }
    };

    fetchSourceType();
  }, [sourceType]);

  return <CdfAutoComplete {...props} name={name} options={sourceType} />;
};

export default SourceTypeDropdown;
