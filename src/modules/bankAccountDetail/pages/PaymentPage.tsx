import React from 'react';
import CdfActionFooter from '@/core/cdf-components/footer/CdfActionFooter';
import { useForm, type SubmitHandler } from 'react-hook-form';
import FormWrapper from '@/core/layout/FormWrapper';
import RazorpayPayment from '@/modules/bankAccountDetail/components/RazorpayPayment';

const PaymentPage: React.FC = () => {
  const methods = useForm({
    defaultValues: {},
  });

  const { handleSubmit, reset } = methods;

  const onSubmit: SubmitHandler<Record<string, never>> = async () => {
    // Handle form submission if needed
  };

  const handleCancel = () => {
    reset();
  };

  return (
    <FormWrapper
      methods={methods}
      footer={<CdfActionFooter onSubmit={handleSubmit(onSubmit)} onClose={handleCancel} />}
    >
      <RazorpayPayment />
    </FormWrapper>
  );
};

export default PaymentPage;
