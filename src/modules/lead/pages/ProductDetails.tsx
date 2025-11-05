import React from 'react';
import CdfActionFooter from '@/core/cdf-components/footer/CdfActionFooter';
import { useForm, type SubmitHandler } from 'react-hook-form';
import logger from '@/core/utils/loggerUtils';
import ProductDetailsForm from '@/modules/lead/components/ProductDetailsForm';
import FormWrapper from '@/core/layout/FormWrapper';
import type { ProductDetail } from '@/modules/lead/types';

const ProductDetails: React.FC = () => {
  const methods = useForm<ProductDetail>({
    defaultValues: {
      customerType: '',
      pan: '',
      product: '',
      branch: '',
      loanType: '',
      subLoanType: '',
      sourceType: '',
      sourceName: '',
      propertyType: '',
      propertyUsage: '',
      loanPurpose: '',
      amount: 0,
      language: '',
    },
    mode: 'onBlur',
  });

  const { handleSubmit, reset } = methods;

  const onSubmit: SubmitHandler<ProductDetail> = async (data) => {
    logger.info('Form submitted with data:', data);
  };

  const handleCancel = () => {
    reset();
  };
  return (
    <FormWrapper
      methods={methods}
      footer={<CdfActionFooter onSubmit={handleSubmit(onSubmit)} onClose={handleCancel} />}
    >
      <ProductDetailsForm />
    </FormWrapper>
  );
};
export default ProductDetails;
