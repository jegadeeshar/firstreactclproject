import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import CdfDatePicker from '@/core/cdf-components/datepicker/CdfDatepicker';

type InputValue = {
  [key: string]: Date | null;
};

// react-hook-form context
const FormWrapper: React.FC<{
  children: React.ReactNode;
  defaultValues: InputValue;
}> = ({ children, defaultValues }) => {
  const methods = useForm({
    defaultValues,
    // trigger validation on blur
    mode: 'onBlur',
  });

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

// Storybook metadata
const meta: Meta<typeof CdfDatePicker> = {
  title: 'Form/Datepicker/CdfDatepicker',
  component: CdfDatePicker,
  tags: ['autodocs'],
  decorators: [
    (Story, context) => (
      <FormWrapper defaultValues={context.parameters.formDefaultValues}>
        <Story />
      </FormWrapper>
    ),
  ],
  argTypes: {
    name: { control: 'text' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    required: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof CdfDatePicker>;

export const Default: Story = {
  args: {
    name: 'optionalDate',
    label: 'Date',
    placeholder: 'Select a date',
  },
  parameters: {
    formDefaultValues: { optionalDate: null },
  },
};

export const Required: Story = {
  args: {
    name: 'requiredDate',
    label: 'Date (Required)',
    required: true,
    placeholder: 'Select a date',
  },
  parameters: {
    formDefaultValues: { requiredDate: null },
  },
  render: (args) => {
    // Custom wrapper component to access form context and call trigger
    const RenderWithTrigger = () => {
      const { trigger } = useFormContext();

      React.useEffect(() => {
        // Trigger validation on mount for the required field
        trigger(args.name);
      }, [trigger]);

      return <CdfDatePicker {...args} />;
    };

    return <RenderWithTrigger />;
  },
};
