import React, { useEffect } from 'react';
import CdfAutoComplete from '@cdf-components/autocomplete/CdfAutoComplete';
import type { BranchType, CustomDropdownPropsType, OptionType } from '@core/types';
import { useMasterDataStore } from '@core/store';
import { masterService } from '@core/services/masterService';

const BranchDropdown: React.FC<CustomDropdownPropsType> = ({ name = 'branch', ...props }) => {
  const { branches } = useMasterDataStore();

  // format branch
  const branchOptions: OptionType[] = branches.map((branch: BranchType) => ({
    id: branch.branchId,
    label: branch.branchDesc,
  }));

  useEffect(() => {
    // Load branches only if not already loaded
    if (!branches || branches.length === 0) {
      masterService.getBranches();
    }
  }, [branches]);

  return <CdfAutoComplete name={name} {...props} options={branchOptions} />;
};

export default BranchDropdown;
