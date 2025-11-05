import React, { useEffect } from 'react';
import CdfAutoComplete from '@cdf-components/autocomplete/CdfAutoComplete';
import type { CustomDropdownPropsType } from '@core/types';
import { useMasterDataStore } from '@core/store';
import { masterService } from '@core/services/masterService';

const LoanTypeDropdown: React.FC<CustomDropdownPropsType> = ({ name = 'loanType', ...props }) => {
  // use value from state
  const { loanTypes } = useMasterDataStore();

  useEffect(() => {
    // If state is not set, call API to fetch data
    const fetchLoanTypes = async () => {
      if (!loanTypes || loanTypes.length === 0) {
        await masterService.getLoanTypes();
      }
    };

    fetchLoanTypes();
  }, [loanTypes]);

  return <CdfAutoComplete {...props} name={name} options={loanTypes} />;
};

export default LoanTypeDropdown;
