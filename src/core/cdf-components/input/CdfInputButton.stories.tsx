import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { waitFor, screen } from '@storybook/testing-library';
import CdfInputButton from './CdfInputButton';

// Form wrapper
const FormWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const methods = useForm({ defaultValues: { otp: '' }, mode: 'onBlur' });
  return (
    <FormProvider {...methods}>
      <form>{children}</form>
    </FormProvider>
  );
};

// ✅ Storybook metadata
const meta: Meta<typeof CdfInputButton> = {
  title: 'Form/InputText/CdfInputButton',
  component: CdfInputButton,
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
    isVerified: { control: 'boolean' },
    handleVerify: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof CdfInputButton>;

// ✅ Default Story
export const Default: Story = {
  args: {
    name: 'otp',
    label: 'OTP',
    placeholder: 'Enter OTP',
    handleVerify: (val: string) => console.log('Verify clicked:', val),
  },
};

// ✅ Verified state
export const Verified: Story = {
  args: {
    name: 'otpVerified',
    label: 'OTP',
    value: '123456',
    isVerified: true,
    handleVerify: (val: string) => console.log('Verify clicked:', val),
  },
};

// ✅ Disabled field
export const Disabled: Story = {
  args: {
    name: 'otpDisabled',
    label: 'OTP (Disabled)',
    value: '000000',
    disabled: true,
    handleVerify: (val: string) => console.log('Verify clicked:', val),
  },
};

// ✅ Required story with visible validation error
export const Required: Story = {
  args: {
    name: 'otpRequired',
    label: 'OTP',
    required: true,
    placeholder: 'Enter OTP',
    handleVerify: (val: string) => console.log('Verify clicked', val),
  },
  play: async ({ canvasElement }) => {
    const input = canvasElement.querySelector('input') as HTMLInputElement;

    // simulate user interaction
    input.focus();
    input.blur(); // triggers onBlur validation

    await waitFor(() => {
      // match the exact error text your component produces
      screen.getByText(/OTP is required/i);
    });
  },
};
