import React, { useEffect } from 'react';
import CdfAutoComplete from '@cdf-components/autocomplete/CdfAutoComplete';
import type { CustomDropdownPropsType } from '@core/types';
import { useMasterDataStore } from '@core/store';
import { masterService } from '@core/services/masterService';

const BankDropdown: React.FC<CustomDropdownPropsType> = ({ name = 'bank', ...props }) => {
  const { bank } = useMasterDataStore();

  useEffect(() => {
    // If state is not set, call API to fetch data
    const fetchBank = async () => {
      if (!bank || bank.length === 0) {
        await masterService.getBank();
      }
    };
    fetchBank();
  }, [bank]);

  return <CdfAutoComplete {...props} name={name} options={bank} />;
};

export default BankDropdown;
