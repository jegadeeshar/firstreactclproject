import { FormProvider, useForm, type FieldValues } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import CdfCheckbox from './CdfCheckbox';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CdfCheckboxProps } from '@/core/types';

const meta: Meta<typeof CdfCheckbox> = {
  title: 'Form/Checkbox/CdfCheckbox',
  component: CdfCheckbox,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    label: { control: 'text' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof CdfCheckbox>;

const WithFormProvider = (props: CdfCheckboxProps) => {
  const methods = useForm({
    defaultValues: {
      [props.name ?? 'sample']: props.checked ?? false,
    },
    mode: 'onSubmit',
  });

  const onSubmit = (data: FieldValues) => console.log('Form Submit:', data);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <CdfCheckbox {...props} />
        {props.required && (
          <Box sx={{ mt: 1 }}>
            <Button type="submit" variant="contained" size="small">
              Submit
            </Button>
          </Box>
        )}
      </form>
    </FormProvider>
  );
};

export const Default: Story = {
  args: {
    name: 'defaultCheck',
    label: 'Accept Terms and Conditions',
  },
  render: (args) => <CdfCheckbox {...args} />,
};

export const Required: Story = {
  args: {
    name: 'requiredCheck',
    label: 'I agree to the privacy policy',
    required: true,
  },
  render: (args) => <CdfCheckbox {...args} />,
};

export const Disabled: Story = {
  args: {
    name: 'disabledCheck',
    label: 'Disabled Checkbox',
    disabled: true,
    checked: true,
  },
  render: (args) => <CdfCheckbox {...args} />,
};

export const Controlled: Story = {
  args: {
    name: 'controlledCheck',
    label: 'Receive updates',
    checked: true,
  },
  render: (args) => <CdfCheckbox {...args} />,
};

export const WithReactHookForm: Story = {
  args: {
    name: 'terms',
    label: 'Agree to Terms & Conditions',
    required: true,
  },
  render: (args) => <WithFormProvider {...args} />,
};

export const ValidationExample: Story = {
  args: {
    name: 'validationCheck',
    label: 'I accept the terms',
    required: true,
  },
  render: (args) => <WithFormProvider {...args} />,
};
