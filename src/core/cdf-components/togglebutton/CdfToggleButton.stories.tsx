import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormProvider, useForm } from 'react-hook-form';
import CdfToggleButton from './CdfToggleButton';
import { ToggleButtonVariantType, type CdfToggleButtonProps } from '@/core/types';

const meta: Meta<typeof CdfToggleButton> = {
  title: 'Components/ToggleButton/CdfToggleButton',
  component: CdfToggleButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: [ToggleButtonVariantType.SQUARE, ToggleButtonVariantType.PILL],
    },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    name: 'toggle',
    label: 'Select Option',
    options: [
      { title: 'Option A', value: 'A' },
      { title: 'Option B', value: 'B' },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof CdfToggleButton>;

/** 🧩 Form wrapper for form-controlled stories */
const FormWrapper = (args: CdfToggleButtonProps) => {
  const methods = useForm({ defaultValues: { [args.name]: args.value ?? '' } });
  return (
    <FormProvider {...methods}>
      <CdfToggleButton {...args} />
    </FormProvider>
  );
};

export const Default: Story = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    variant: ToggleButtonVariantType.SQUARE,
  },
};

export const WithLabel: Story = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    label: 'Select a Color',
    options: [
      { title: 'Red', value: 'red' },
      { title: 'Blue', value: 'blue' },
      { title: 'Green', value: 'green' },
    ],
  },
};

export const Required: Story = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    label: 'Required Field',
    required: true,
  },
};

export const Disabled: Story = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    label: 'Disabled Buttons',
    disabled: true,
    value: 'A',
  },
};

export const PillVariant: Story = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    label: 'Pill Variant',
    variant: ToggleButtonVariantType.PILL,
    options: [
      { title: 'Round', value: 'round' },
      { title: 'Square', value: 'square' },
    ],
  },
};

export const StandaloneMode: Story = {
  render: (args) => (
    <CdfToggleButton {...args} onChange={(_, val) => console.log('Standalone changed:', val)} />
  ),
  args: {
    label: 'Standalone (no FormProvider)',
    value: 'A',
    variant: ToggleButtonVariantType.SQUARE,
  },
};
