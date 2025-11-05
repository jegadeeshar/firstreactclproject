import React, { useEffect } from 'react';
import CdfAutoComplete from '@cdf-components/autocomplete/CdfAutoComplete';
import type { CustomDropdownPropsType } from '@core/types';
import { useMasterDataStore } from '@core/store';
import { masterService } from '@core/services/masterService';

const VendorDropdown: React.FC<CustomDropdownPropsType> = ({ name = 'vendor', ...props }) => {
  // use value from state
  const { vendor } = useMasterDataStore();

  useEffect(() => {
    // If state is not set, call API to fetch data
    const fetchVendor = async () => {
      if (!vendor || vendor.length === 0) {
        await masterService.getVendor();
      }
    };
    fetchVendor();
  }, [vendor]);

  return <CdfAutoComplete {...props} name={name} options={vendor} />;
};

export default VendorDropdown;
