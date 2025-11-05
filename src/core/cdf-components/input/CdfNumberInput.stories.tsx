import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useForm, FormProvider } from 'react-hook-form';
import { ThemeProvider, CssBaseline } from '@mui/material';
import customTheme from '@core/theme';
import CdfNumberInput from '@cdf-components/input/CdfNumberInput';

const meta: Meta<typeof CdfNumberInput> = {
  title: 'Components/CdfNumberInput/CdfNumberInput',
  component: CdfNumberInput,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CdfNumberInput>;

const FormWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const methods = useForm({
    defaultValues: { amount: '' },
    mode: 'onBlur',
  });

  const onSubmit = () => {
    console.log('Form submitted:');
  };

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {children}
          <button type="submit" style={{ marginTop: '16px' }}>
            Submit
          </button>
        </form>
      </FormProvider>
    </ThemeProvider>
  );
};

// Default Story
export const Default: Story = {
  render: () => (
    <FormWrapper>
      <CdfNumberInput name="amount" label="Amount" />
    </FormWrapper>
  ),
};

// With min/max validation
export const WithMinMax: Story = {
  render: () => (
    <FormWrapper>
      <CdfNumberInput name="amount" label="Amount" min={10} max={100} />
    </FormWrapper>
  ),
};

// Required field
export const WithRequired: Story = {
  render: () => (
    <FormWrapper>
      <CdfNumberInput name="amount" label="Amount" required />
    </FormWrapper>
  ),
};

// Disabled field
export const OnDisabled: Story = {
  render: () => (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <CdfNumberInput name="amount" label="Amount" value="50" disabled />
    </ThemeProvider>
  ),
};
