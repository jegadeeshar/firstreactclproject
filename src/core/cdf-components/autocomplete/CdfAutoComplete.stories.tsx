import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useForm, FormProvider } from 'react-hook-form';
import { fireEvent } from '@storybook/testing-library';
import CdfAutoComplete from './CdfAutoComplete';
import type { OptionType } from '@/core/types';

// Sample options
const options: OptionType[] = [
  { id: 1, label: 'loan' },
  { id: 2, label: 'credit-card' },
  { id: 3, label: 'mortgage' },
];

type FormValues = {
  product: OptionType | null;
};

// ------------------------------
// Form wrapper for RHF context
// ------------------------------
const FormWrapper: React.FC<{
  children: React.ReactNode;
  onSubmit?: (data: FormValues) => void;
}> = ({ children, onSubmit }) => {
  const methods = useForm({
    defaultValues: { product: null },
    mode: 'onBlur', // validate on blur
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit || (() => {}))} style={{ width: 400 }}>
        {children}
        <button type="submit" style={{ display: 'none' }} />
      </form>
    </FormProvider>
  );
};

// ------------------------------
// Storybook metadata
// ------------------------------
const meta: Meta<typeof CdfAutoComplete> = {
  title: 'Form/AutoComplete/CdfAutoComplete',
  component: CdfAutoComplete,
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
    options: { control: false },
    value: { control: false },
    handleChange: { control: false },
    label: { control: 'text' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof CdfAutoComplete>;

// ------------------------------
// Stories
// ------------------------------

// Default story
export const Default: Story = {
  args: {
    options,
    value: null,
    handleChange: (val: OptionType | null) => console.log('Selected:', val),
    label: 'Select Product',
    name: 'product',
  },
  parameters: {
    docs: { source: { type: 'dynamic' } },
  },
};

// Required story (shows validation error)
export const Required: Story = {
  args: {
    options,
    value: null,
    handleChange: (val: OptionType | null) => console.log('Selected:', val),
    label: 'Required Product',
    required: true,
    name: 'product',
  },
  play: async ({ canvasElement }) => {
    const input = canvasElement.querySelector('input') as HTMLInputElement;
    input.focus();
    input.blur(); // triggers onBlur validation
  },
};

// Disabled story
export const Disabled: Story = {
  args: {
    options,
    value: options[0],
    handleChange: (val: OptionType | null) => console.log('Selected:', val),
    label: 'Disabled Product',
    disabled: true,
    name: 'product',
  },
};

// Interactive story
export const Interactive: Story = {
  args: {
    options,
    value: null,
    handleChange: (val: OptionType | null) => console.log('Selected:', val),
    label: 'Interactive Product',
    name: 'product',
  },
  play: async ({ canvasElement }) => {
    const input = canvasElement.querySelector('input') as HTMLInputElement;
    input.focus();
    input.value = 'loan';
    fireEvent.blur(input);
  },
};
