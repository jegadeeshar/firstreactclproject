import React from 'react';
import CdfActionFooter from '@/core/cdf-components/footer/CdfActionFooter';
import { useForm, type SubmitHandler } from 'react-hook-form';
import logger from '@/core/utils/loggerUtils';
import alertUtils from '@/core/utils/alertUtils';
import { enquiryService } from '@/modules/enquiry/services/enquiryService';
import type { EnquiryDetail } from '@/modules/enquiry/types/enquiryTypes';
import SampleEnquiryForm from '@/modules/enquiry/components/SampleEnquiryForm';
import FormWrapper from '@/core/layout/FormWrapper';

const SampleEnquiry: React.FC = () => {
  const methods = useForm<EnquiryDetail>({
    defaultValues: { email: '', mobileNo: '', branchId: '1' },
    mode: 'onBlur',
  });

  const { handleSubmit, reset } = methods;

  const onSubmit: SubmitHandler<EnquiryDetail> = async (data) => {
    try {
      logger.info('Form submitted with data:', data);

      const payload = {
        customerType: 'Individual',
        firstName: 'Firstname Example',
        lastName: 'Lastname Example',
        middleName: 'Middlename Example',
        mobileNo: data.mobileNo,
        branchId: 'Branchid Example',
        productId: 'Productid Example',
        pan: 'ABCDE1234F',
        loanTypeId: 'Loantypeid Example',
      };

      const result = await enquiryService.saveEnquiry(payload);

      alertUtils.success('Enquiry created successfully!');
      logger.info('API Response:', result);
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
      <SampleEnquiryForm />
    </FormWrapper>
  );
};
export default SampleEnquiry;
