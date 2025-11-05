import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import logger from '@core/utils/loggerUtils';
import alertUtils from '@core/utils/alertUtils';
import CdfActionFooter from '@cdf-components/footer/CdfActionFooter';
import type { ReferenceDetail } from '@/modules/propertyReference/types';
import ReferenceDetailsForm from '@/modules/propertyReference/components/ReferenceDetailsForm';
import FormWrapper from '@/core/layout/FormWrapper';

const ReferenceDetails: React.FC = () => {
  const methods = useForm<ReferenceDetail>({
    defaultValues: {
      referenceFullName: '',
      mobileNo: '',
      addressLine1: '',
      addressLine2: '',
      landmark: '',
      city: '',
      state: '',
      pinCode: '',
    },
    mode: 'onBlur',
  });

  const { handleSubmit, reset } = methods;

  const onSubmit: SubmitHandler<ReferenceDetail> = async (data) => {
    try {
      logger.info('Form submitted with data:', data);

      const payload = {
        referenceFullName: data.referenceFullName,
        mobileNo: data.mobileNo,
        addressLine1: data.addressLine1,
        landmark: data.landmark,
        city: data.city,
        state: data.state,
        pinCode: data.pinCode,
      };

      const result = payload;

      alertUtils.success('Reference details saved successfully!');
      logger.info('API Response:', result);
    } catch (error) {
      logger.error('Failed to save reference details:', error);
      alertUtils.error('Failed to save reference details');
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
      <ReferenceDetailsForm />
    </FormWrapper>
  );
};

export default ReferenceDetails;
