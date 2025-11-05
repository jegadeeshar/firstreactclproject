import React, { useEffect } from 'react';
import CdfAutoComplete from '@cdf-components/autocomplete/CdfAutoComplete';
import type { CustomDropdownPropsType } from '@core/types';
import { useMasterDataStore } from '@core/store';
import { masterService } from '@core/services/masterService';

const LoanPurposeDropdown: React.FC<CustomDropdownPropsType> = ({
  name = 'loanPurpose',
  ...props
}) => {
  const { loanPurpose } = useMasterDataStore();

  useEffect(() => {
    const fetchLoanPurposes = async () => {
      if (!loanPurpose || loanPurpose.length === 0) {
        await masterService.getLoanPurpose();
      }
    };
    fetchLoanPurposes();
  }, [loanPurpose]);

  return <CdfAutoComplete {...props} name={name} options={loanPurpose} />;
};

export default LoanPurposeDropdown;
