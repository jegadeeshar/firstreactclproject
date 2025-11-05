import type { Meta, StoryObj } from '@storybook/react-vite';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import CdfSearchInput from './CdfSearchInput';

// Wrap the component with React Hook Form provider
const FormWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const methods = useForm({
    defaultValues: { search: '' },
    mode: 'onBlur', // triggers required validation properly
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

// Storybook meta configuration
const meta: Meta<typeof CdfSearchInput> = {
  title: 'Form/InputText/CdfSearchInput',
  component: CdfSearchInput,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 420, margin: '2rem auto', padding: '1rem' }}>
        <FormWrapper>
          <Story />
        </FormWrapper>
      </div>
    ),
  ],
  argTypes: {
    name: {
      control: false,
      description: 'React Hook Form field name',
    },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    onSearch: { action: 'onSearch' },
  },
};

export default meta;
type Story = StoryObj<typeof CdfSearchInput>;

// Default Story
export const Default: Story = {
  args: {
    name: 'search',
    label: 'Search',
    placeholder: 'Enter a keyword',
    fullWidth: true,
    required: false,
    onSearch: async (query: string) => {
      console.log('Search triggered for:', query);
      await new Promise((res) => setTimeout(res, 1000));
      alert(`You searched for: ${query}`);
    },
  },
};

// Required Field Story (shows validation message)
export const RequiredField: Story = {
  args: {
    ...Default.args,
    required: true,
    placeholder: 'Type something and blur or press search',
  },
};

// Disabled Input Story
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
    value: 'Search Disabled',
  },
};

// Slow API Simulation Story
export const LoadingExample: Story = {
  args: {
    ...Default.args,
    onSearch: async (query: string) => {
      console.log('Simulating slow API search for:', query);
      await new Promise((res) => setTimeout(res, 3000));
      alert(`Results loaded for: ${query}`);
    },
  },
};
