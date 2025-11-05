import React from 'react';
import CdfActionFooter from '@/core/cdf-components/footer/CdfActionFooter';
import { useForm, type SubmitHandler } from 'react-hook-form';
import logger from '@/core/utils/loggerUtils';
import alertUtils from '@/core/utils/alertUtils';
import FormWrapper from '@/core/layout/FormWrapper';
import type { PropertyDetails } from '@/modules/propertyReference/types';
import PropertyTab from '@/modules/propertyReference/components/PropertyTab';

const Property: React.FC = () => {
  const methods = useForm<PropertyDetails>({
    defaultValues: { propertyUsage: '', propertyType: '' },
    mode: 'onBlur',
  });

  const { handleSubmit, reset } = methods;

  const onSubmit: SubmitHandler<PropertyDetails> = async (data) => {
    try {
      logger.info('Form submitted with data:', data);

      alertUtils.success('Enquiry created successfully!');
    } catch (error) {
      logger.error('Failed to create enquiry:', error);
      alertUtils.error('Failed to create enquiry');
    }
  };

  const handleCancel = () => {
    reset();
  };
  return (
    <FormWrapper
      methods={methods}
      footer={<CdfActionFooter onSubmit={handleSubmit(onSubmit)} onClose={handleCancel} />}
    >
      <PropertyTab />
    </FormWrapper>
  );
};
export default Property;
