import React from 'react';
import CdfAutoComplete from '@cdf-components/autocomplete/CdfAutoComplete';
import type { CustomDropdownPropsType } from '@core/types';
import { MASTER_MOCK_DATA } from '@/core/constants';

const LoanAmountDropdown: React.FC<CustomDropdownPropsType> = ({
  name = 'loanAmount',
  ...props
}) => {
  return <CdfAutoComplete {...props} name={name} options={MASTER_MOCK_DATA.LOAN_AMOUNTS} />;
};

export default LoanAmountDropdown;
