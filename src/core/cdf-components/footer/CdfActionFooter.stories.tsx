import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CdfActionFooter from './CdfActionFooter';
import type { CdfActionFooterProps } from '@core/types';

const theme = createTheme();

const meta: Meta<typeof CdfActionFooter> = {
  title: 'Components/Footer/CdfActionFooter',
  component: CdfActionFooter,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
//  Type args using the shared props
type Story = StoryObj<CdfActionFooterProps>;

export const Default: Story = {
  args: {
    closeButtonLabel: 'Cancel',
    submitButtonLabel: 'Submit',
    deleteButtonLabel: 'Delete',
    onClose: () => alert('Cancel clicked'),
    onSubmit: () => alert('Submit clicked'),
    onDelete: () => alert('Delete clicked'),
  },
};

export const WithoutDelete: Story = {
  args: {
    closeButtonLabel: 'Close',
    submitButtonLabel: 'Save',
    onClose: () => alert('Close clicked'),
    onSubmit: () => alert('Save clicked'),
  },
};

export const OnlySubmit: Story = {
  args: {
    submitButtonLabel: 'Save',
    onSubmit: () => alert('Save clicked'),
  },
};

export const OnlyClose: Story = {
  args: {
    closeButtonLabel: 'Go Back',
    onClose: () => alert('Go Back clicked'),
  },
};
