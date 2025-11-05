import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import DynamicGrid from './DynamicGrid';
import type { DynamicGridProps } from '@core/types';
import LabelProvider from '@/core/providers/LabelProvider';

const theme = createTheme();

const meta: Meta<typeof DynamicGrid> = {
  title: 'Layout/DynamicGrid',
  component: DynamicGrid,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LabelProvider>
          <Story />
        </LabelProvider>
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DynamicGrid>;

export const Default: Story = {
  args: {
    title: 'User Details',
    data: {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      age: 29,
      city: 'New York',
      occupation: 'Designer',
    },
  } satisfies DynamicGridProps,
};

export const FourColumnLayout: Story = {
  args: {
    title: 'Product Specs',
    data: {
      Model: 'X200',
      Brand: 'SuperTech',
      Weight: '1.4 kg',
      Battery: '5000 mAh',
      Display: '13.3" OLED',
      Processor: 'Intel i7',
      Memory: '16 GB RAM',
      Storage: '512 GB SSD',
    },
  } satisfies DynamicGridProps,
};

export const Empty: Story = {
  args: {
    title: 'Empty Grid',
    data: {},
  } satisfies DynamicGridProps,
};
