import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import CdfInput from '@cdf-components/input/CdfInput';

// ✅ Helper wrapper to provide react-hook-form context
const FormWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const methods = useForm({
    defaultValues: {
      firstName: '',
    },
    mode: 'onBlur', // trigger validation on blur
  });

  type InputValue = {
    firstName?: string;
  };

  const onSubmit = (data: InputValue) => {
    console.log('Form submit:', data);
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
const meta: Meta<typeof CdfInput> = {
  title: 'Form/InputText/CdfInput',
  component: CdfInput,
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
    multiline: { control: 'boolean' },
    placeholder: { control: 'text' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    maxLength: { control: 'number' },
    value: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof CdfInput>;

// ✅ Base Template
export const Default: Story = {
  args: {
    name: 'firstName',
    label: 'First Name',
    placeholder: 'Enter your first name',
    multiline: false,
  },
};

export const Multiline: Story = {
  args: {
    name: 'address',
    label: 'Address',
    placeholder: 'Enter your full address',
    multiline: true, // ✅ assuming CdfInput supports this prop
    rows: 4, // optional: control height if supported
  },
};

// ✅ Required story with visible validation error
export const Required: Story = {
  args: {
    name: 'email',
    label: 'Email',
    required: true,
    placeholder: 'Enter email',
  },
  play: async ({ canvasElement }) => {
    const input = canvasElement.querySelector('input') as HTMLInputElement;
    input.focus();
    input.blur(); // triggers onBlur validation
  },
};

export const WithMaxLength: Story = {
  args: {
    name: 'username',
    label: 'Username',
    placeholder: 'Max 10 chars',
    maxLength: 10,
  },
};

export const Disabled: Story = {
  args: {
    name: 'disabledField',
    label: 'Disabled Field',
    disabled: true,
    value: 'Read-only value',
  },
};

export const WithError: Story = {
  args: {
    name: 'customError',
    label: 'Custom Error Example',
    rules: {
      validate: (value: string) => value === 'error' || 'Enter "error" to trigger this message',
    },
    placeholder: 'Type anything other than "error"',
  },
  play: async ({ canvasElement }) => {
    const input = canvasElement.querySelector('input') as HTMLInputElement;

    // Focus and blur to trigger validation
    input.focus();
    input.value = 'wrong';
    input.blur();
  },
};
