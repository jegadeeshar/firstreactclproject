import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormProvider, useForm } from 'react-hook-form';
import CdfAmount from '@cdf-components/input/CdfAmount';
import { fireEvent, waitFor, screen } from '@storybook/testing-library';

const FormWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const methods = useForm({
    defaultValues: { amount: '' },
    mode: 'onBlur',
  });

  const onSubmit = (data: { amount?: string }) => {
    console.log('Form submitted:', data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} style={{ width: 400 }}>
        {children}
      </form>
    </FormProvider>
  );
};

const meta: Meta<typeof CdfAmount> = {
  title: 'Form/InputText/CdfAmount',
  component: CdfAmount,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <FormWrapper>
        <Story />
      </FormWrapper>
    ),
  ],
  argTypes: {
    name: { control: 'text' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    value: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof CdfAmount>;

export const Default: Story = {
  args: {
    name: 'amount',
    label: 'Amount',
    placeholder: 'Enter your amount',
  },
};

export const Required: Story = {
  args: {
    name: 'amountRequired',
    label: 'Amount (Required)',
    required: true,
  },
  play: async ({ canvasElement }) => {
    const input = canvasElement.querySelector('input') as HTMLInputElement;

    fireEvent.focus(input);
    fireEvent.blur(input);

    await waitFor(() => {
      screen.getByText(/Amount \(Required\) is required/i);
    });
  },
};

export const Disabled: Story = {
  args: {
    name: 'amountDisabled',
    label: 'Amount (Disabled)',
    value: '12345.67',
    disabled: true,
  },
};

export const ValidationExample: Story = {
  args: {
    name: 'amountValidation',
    label: 'Try entering invalid amount',
    required: true,
  },
  play: async ({ canvasElement }) => {
    const input = canvasElement.querySelector('input') as HTMLInputElement;
    input.focus();
    input.value = '123.456';
    fireEvent.blur(input);

    await waitFor(() => {
      screen.getByText(/Enter a valid number with up to 2 decimal places/i);
    });
  },
};
