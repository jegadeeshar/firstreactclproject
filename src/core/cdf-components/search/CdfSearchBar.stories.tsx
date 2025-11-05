import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import theme from '@/core/theme';
import CdfSearchBar from './CdfSearchBar';
import type { CdfSearchBarProps } from '@/core/types';
import type { InputValue } from '@/core/types';

// --- Storybook metadata ---
const meta: Meta<typeof CdfSearchBar> = {
  title: 'Components/Search/CdfSearchBar',
  component: CdfSearchBar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Box sx={{ p: 4, backgroundColor: '#f8f8f8' }}>
          <Story />
        </Box>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    width: { control: 'number' },
    value: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof CdfSearchBar>;

// ---- Default Story ----
export const Default: Story = {
  args: {
    placeholder: 'Search...',
  },
};

// ---- With Initial Value ----
export const WithInitialValue: Story = {
  args: {
    value: 'Initial Text',
    placeholder: 'Search...',
  },
};

// ---- Disabled ----
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled Search',
  },
};

// ---- Custom Width ----
export const CustomWidth: Story = {
  args: {
    width: 400,
    placeholder: 'Wider search bar',
  },
};

// ---- Controlled (with react-hook-form) ----
export const Controlled: Story = {
  render: (args) => {
    const methods = useForm<InputValue>({
      defaultValues: { search: 'Hello' },
      mode: 'onBlur',
    });

    return (
      <FormProvider {...methods}>
        <ControlledInner {...args} />
      </FormProvider>
    );
  },
};

// ---- Inner component to use useFormContext ----
const ControlledInner: React.FC<CdfSearchBarProps> = (props) => {
  const { setValue, watch } = useFormContext<InputValue>();
  const searchValue = watch('search');

  return <CdfSearchBar {...props} value={searchValue} onSearch={(v) => setValue('search', v)} />;
};
