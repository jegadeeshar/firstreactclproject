import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormProvider, useForm } from 'react-hook-form';
import CdfMobile from '@cdf-components/input/CdfMobile';
import { fireEvent, waitFor, screen } from '@storybook/testing-library';

// ✅ Helper component to wrap CdfMobile with FormProvider
const FormWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const methods = useForm({
    defaultValues: { mobile: '' },
    mode: 'onBlur',
  });

  type InputValue = {
    mobile?: string;
  };

  const onSubmit = (data: InputValue) => {
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

// ✅ Storybook metadata
const meta: Meta<typeof CdfMobile> = {
  title: 'Form/InputText/CdfMobile',
  component: CdfMobile,
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
type Story = StoryObj<typeof CdfMobile>;

// ✅ Default Story
export const Default: Story = {
  args: {
    name: 'mobile',
    label: 'Mobile Number',
    placeholder: 'Enter your 10-digit number',
  },
  parameters: {
    docs: {
      source: { type: 'dynamic' }, // ensures code matches current args
    },
  },
};

// ✅ Required field
export const Required: Story = {
  args: {
    name: 'mobileRequired',
    label: 'Mobile (Required)',
    required: true,
  },
  play: async ({ canvasElement }) => {
    const input = canvasElement.querySelector('input') as HTMLInputElement;

    // Trigger change via fireEvent to notify RHF
    fireEvent.focus(input);
    fireEvent.blur(input); // triggers validation

    // Wait for validation error to appear
    await waitFor(() => {
      screen.getByText(/Mobile is required/i);
    });
  },
};

// ✅ Disabled input
export const Disabled: Story = {
  args: {
    name: 'mobileDisabled',
    label: 'Mobile (Disabled)',
    value: '9876543210',
    disabled: true,
  },
};

// ✅ Invalid input demo (custom rule override)
export const InvalidNumber: Story = {
  args: {
    name: 'mobileInvalid',
    label: 'Mobile (Invalid Rule Example)',
    rules: {
      validate: (value: string) => (value === '9999999999' ? '9999999999 is not allowed' : true),
    },
  },
};

// ✅ Interactive validation example (with Storybook play function)
export const ValidationExample: Story = {
  args: {
    name: 'mobileValidation',
    label: 'Try entering invalid number',
    required: true,
  },
  play: async ({ canvasElement }) => {
    const input = canvasElement.querySelector('input') as HTMLInputElement;
    input.focus();
    input.value = '12345';
    input.blur(); // triggers validation
  },
};
