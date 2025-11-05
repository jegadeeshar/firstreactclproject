import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider } from '@mui/material';
import CdfFileUpload from '@/core/cdf-components/uploadtype/CdfFileUpload';
import customTheme from '@core/theme';

const meta: Meta<typeof CdfFileUpload> = {
  title: 'Form/Upload/CdfFileUpload',
  component: CdfFileUpload,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider theme={customTheme}>
        <div style={{ padding: '20px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof CdfFileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'file',
  },
};

export const Required: Story = {
  args: {
    name: 'file',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    name: 'file',
    disabled: true,
  },
};
