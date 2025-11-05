import React, { useEffect } from 'react';
import CdfAutoComplete from '@cdf-components/autocomplete/CdfAutoComplete';
import type { CustomDropdownPropsType } from '@core/types';
import { useMasterDataStore } from '@core/store';
import { masterService } from '@core/services/masterService';

const LanguageDropdown: React.FC<CustomDropdownPropsType> = ({
  name = 'preferredLanguage',
  ...props
}) => {
  const { languages } = useMasterDataStore();

  useEffect(() => {
    const fetchPreferredLanguages = async () => {
      if (!languages || languages.length === 0) {
        await masterService.getLanguages();
      }
    };

    fetchPreferredLanguages();
  }, [languages]);

  return <CdfAutoComplete {...props} name={name} options={languages} />;
};

export default LanguageDropdown;
