import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import CdfActionFooter from '@/core/cdf-components/footer/CdfActionFooter';
import FormWrapper from '@/core/layout/FormWrapper';
import CustomerIframe from '@modules/customer/components/CustomerIfame';

const Customer: React.FC = () => {
  const navigate = useNavigate();

  const methods = useForm({ mode: 'onBlur' });

  const handleClose = () => {
    navigate(-1);
  };

  const handleSubmit = (data: unknown) => {
    console.log('Customer form submitted:', data);
  };

  return (
    <FormWrapper
      methods={methods}
      footer={
        <CdfActionFooter
          onSubmit={methods.handleSubmit(handleSubmit)}
          onClose={handleClose}
          closeButtonLabel="Close"
        />
      }
    >
      <CustomerIframe />
    </FormWrapper>
  );
};

export default Customer;
