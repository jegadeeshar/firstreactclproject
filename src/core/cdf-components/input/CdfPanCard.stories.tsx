import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useForm, FormProvider } from 'react-hook-form';
import { fireEvent, waitFor, screen } from '@storybook/testing-library';
import CdfPanCard from '@cdf-components/input/CdfPanCard';

// ✅ Form wrapper for react-hook-form context
const FormWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const methods = useForm({ defaultValues: { pancard: '' }, mode: 'onBlur' });

  return (
    <FormProvider {...methods}>
      <form style={{ width: 400 }}>{children}</form>
    </FormProvider>
  );
};

// ✅ Storybook metadata
const meta: Meta<typeof CdfPanCard> = {
  title: 'Form/InputText/CdfPanCard',
  component: CdfPanCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <FormWrapper>
        <Story />
      </FormWrapper>
    ),
  ],
  argTypes: {
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    value: { control: 'text' },
    isVerified: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof CdfPanCard>;

// ✅ Default Story
export const Default: Story = {
  args: {
    required: false,
    disabled: false,
    value: '',
    isVerified: false,
  },
};

// ✅ Required field (with validation)
export const Required: Story = {
  args: {
    required: true,
    disabled: false,
    value: '',
    isVerified: false,
  },
  play: async ({ canvasElement }) => {
    const input = canvasElement.querySelector('input') as HTMLInputElement;

    // Simulate user focusing and then blurring to trigger validation
    fireEvent.focus(input);
    fireEvent.blur(input);

    // Wait for the error message to appear
    await waitFor(() => {
      screen.getByText(/PAN is required/i);
    });
  },
};

// ✅ Disabled field
export const Disabled: Story = {
  args: {
    required: false,
    disabled: true,
    value: 'ABCDE1234F',
    isVerified: false,
  },
};

// ✅ Verified field (read-only)
export const Verified: Story = {
  args: {
    required: false,
    disabled: false,
    value: 'ABCDE1234F',
    isVerified: true,
  },
};
