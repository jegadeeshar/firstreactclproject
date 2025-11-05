import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import CdfUploadButton from './CdfUploadButton';
import customTheme from '@core/theme';
import { FileUploadMethodType } from '@/core/types';

// Storybook Metadata
const meta: Meta<typeof CdfUploadButton> = {
  title: 'Form/Upload/CdfUploadButton',
  component: CdfUploadButton,
  decorators: [
    (Story) => (
      <ThemeProvider theme={customTheme}>
        <Box
          sx={{
            backgroundColor: '#f9f9f9',
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            alignItems: 'flex-start',
            minHeight: '100vh',
          }}
        >
          <Story />
        </Box>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The **CdfUploadButton** provides Upload and Scan functionality for cheque images. It supports file selection, webcam capture, tick state, and disabled mode.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CdfUploadButton>;

// Default Upload Button
export const DefaultUpload: Story = {
  args: {
    uploadType: FileUploadMethodType.UPLOAD,
    handleUpload: (file: File) => console.log('File uploaded:', file.name),
  },
};

// Scan Button
export const ScanButton: Story = {
  args: {
    uploadType: FileUploadMethodType.SCAN,
    handleScan: (file: File) => console.log('Scanned image:', file.name),
  },
};

// Upload Completed
export const WithTick: Story = {
  args: {
    uploadType: FileUploadMethodType.UPLOAD,
    showTick: true,
  },
};

// Disabled Upload Button
export const Disabled: Story = {
  args: {
    uploadType: FileUploadMethodType.UPLOAD,
    disabled: true,
  },
};
