import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Button } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import CdfSlider from '@cdf-components/slider/CdfSlider';
import type { CdfSliderProps } from '@/core/types';

const meta: Meta<typeof CdfSlider> = {
  title: 'Components/Slider/CdfSlider',
  component: CdfSlider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  argTypes: {
    title: { control: 'text', description: 'Label displayed above the slider' },
    minValue: { control: 'number', description: 'Minimum slider value' },
    maxValue: { control: 'number', description: 'Maximum slider value' },
    step: { control: 'number', description: 'Step increment' },
    marksStep: { control: 'number', description: 'Marks spacing along the slider' },
  },
};
export default meta;

type Story = StoryObj<typeof CdfSlider>;

type FormData = {
  tenure: number;
};

// ---------- Helper Wrapper ----------
// This ensures CdfSlider works properly with react-hook-form context in Storybook
const WithFormProvider = (args: CdfSliderProps) => {
  const methods = useForm({
    defaultValues: { tenure: args.minValue || 10 },
    mode: 'onChange',
  });

  const onSubmit = (data: FormData) => {
    alert(`Form submitted:\n${JSON.stringify(data, null, 2)}`);
  };

  return (
    <FormProvider {...methods}>
      <Box sx={{ width: 500 }}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <CdfSlider {...args} />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </Box>
    </FormProvider>
  );
};

// ---------- Stories ----------

export const Default: Story = {
  render: (args) => <WithFormProvider {...args} />,
  args: {
    title: 'Request Tenure (in Years)',
    minValue: 10,
    maxValue: 35,
    step: 1,
    marksStep: 5,
  },
};

export const CustomRange: Story = {
  render: (args) => <WithFormProvider {...args} />,
  args: {
    title: 'Loan Duration (in Months)',
    minValue: 6,
    maxValue: 60,
    step: 3,
    marksStep: 12,
  },
};

export const TightSteps: Story = {
  render: (args) => <WithFormProvider {...args} />,
  args: {
    title: 'Duration (Short Range)',
    minValue: 1,
    maxValue: 10,
    step: 1,
    marksStep: 2,
  },
};
