import React from 'react';
import CdfAutoComplete from '@cdf-components/autocomplete/CdfAutoComplete';
import type { CustomDropdownPropsType } from '@core/types';
import { MASTER_MOCK_DATA } from '@/core/constants';

const TimePeriodDropdown: React.FC<CustomDropdownPropsType> = ({
  name = 'timePeriod',
  ...props
}) => {
  return <CdfAutoComplete {...props} name={name} options={MASTER_MOCK_DATA.TIME_PERIOD} />;
};

export default TimePeriodDropdown;
