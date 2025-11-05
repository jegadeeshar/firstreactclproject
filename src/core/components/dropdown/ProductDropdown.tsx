import React, { useEffect } from 'react';
import CdfAutoComplete from '@cdf-components/autocomplete/CdfAutoComplete';
import type { CustomDropdownPropsType } from '@core/types';
import { useMasterDataStore } from '@core/store';
import { masterService } from '@core/services/masterService';

const ProductDropdown: React.FC<CustomDropdownPropsType> = ({ name = 'product', ...props }) => {
  // use value from state
  const { products } = useMasterDataStore();

  useEffect(() => {
    // If state is not set, call API to fetch data
    const fetchProducts = async () => {
      if (!products || products.length === 0) {
        await masterService.getProducts();
      }
    };

    fetchProducts();
  }, [products]);

  return <CdfAutoComplete {...props} name={name} options={products} />;
};

export default ProductDropdown;
