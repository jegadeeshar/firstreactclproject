import React, { useEffect } from 'react';
import CdfAutoComplete from '@cdf-components/autocomplete/CdfAutoComplete';
import type { CustomDropdownPropsType } from '@core/types';
import { useMasterDataStore } from '@core/store';
import { masterService } from '@core/services/masterService';

const SourceNameDropdown: React.FC<CustomDropdownPropsType> = ({ name = 'sourceBy', ...props }) => {
  // use value from state
  const { sourceName } = useMasterDataStore();

  useEffect(() => {
    // If state is not set, call API to fetch data
    const fetchSourceName = async () => {
      if (!sourceName || sourceName.length === 0) {
        await masterService.getSourceName();
      }
    };

    fetchSourceName();
  }, [sourceName]);

  return <CdfAutoComplete {...props} name={name} options={sourceName} />;
};

export default SourceNameDropdown;
