import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useForm, FormProvider } from 'react-hook-form';
import { fireEvent } from '@storybook/testing-library';
import CdfEmail from '@cdf-components/input/CdfEmail';

// ✅ Helper: wraps your component in react-hook-form context
const FormWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const methods = useForm({
    defaultValues: { email: '' },
    mode: 'onBlur', // trigger validation on blur
  });

  type CdfInput = {
    email?: string;
  };

  const onSubmit = (data: CdfInput) => {
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
const meta: Meta<typeof CdfEmail> = {
  title: 'Form/InputText/CdfEmail',
  component: CdfEmail,
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
    rules: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof CdfEmail>;

// ✅ Base story
export const Default: Story = {
  args: {
    name: 'email',
    label: 'Email ID',
    placeholder: 'Enter your email address',
  },
};

// ✅ Required story with visible validation error
export const Required: Story = {
  args: {
    name: 'emailRequired',
    label: 'Email (Required)',
    required: true,
    placeholder: 'Enter your email',
  },
  play: async ({ canvasElement }) => {
    const input = canvasElement.querySelector('input') as HTMLInputElement;
    input.focus();
    input.blur(); // triggers validation
  },
};

// ✅ Disabled story
export const Disabled: Story = {
  args: {
    name: 'emailDisabled',
    label: 'Email (Disabled)',
    disabled: true,
    placeholder: 'read-only@example.com',
  },
};

// ✅ Invalid input demo
export const InvalidPattern: Story = {
  args: {
    name: 'emailInvalid',
    label: 'Custom Validation Example',
    rules: {
      validate: (value: string) => value.endsWith('@test.com') || 'Only @test.com emails allowed',
    },
    placeholder: 'Enter an email ending with @test.com',
  },
  play: async ({ canvasElement }) => {
    const input = canvasElement.querySelector('input') as HTMLInputElement;

    // Trigger change via fireEvent to properly notify RHF
    fireEvent.change(input, { target: { value: 'wrong@gmail.com' } });
    fireEvent.blur(input); // triggers validation
  },
};

// ✅ Interactive example
export const ValidationExample: Story = {
  args: {
    name: 'emailPlay',
    label: 'Try entering an invalid email',
    required: true,
  },
  play: async ({ canvasElement }) => {
    const input = canvasElement.querySelector('input') as HTMLInputElement;
    input.focus();
    input.value = 'invalid_email';
    fireEvent.blur(input); // triggers validation
  },
};
