import React, { useEffect } from 'react';
import CdfAutoComplete from '@cdf-components/autocomplete/CdfAutoComplete';
import type { CustomDropdownPropsType } from '@core/types';
import { useMasterDataStore } from '@core/store';
import { masterService } from '@core/services/masterService';

const SubLoanTypeDropdown: React.FC<CustomDropdownPropsType> = ({
  name = 'subloanType',
  ...props
}) => {
  // use value from state
  const { subLoanType } = useMasterDataStore();

  useEffect(() => {
    // If state is not set, call API to fetch data
    const fetchLoanTypes = async () => {
      if (!subLoanType || subLoanType.length === 0) {
        await masterService.getSubLoanType();
      }
    };

    fetchLoanTypes();
  }, [subLoanType]);

  return <CdfAutoComplete {...props} name={name} options={subLoanType} />;
};

export default SubLoanTypeDropdown;
