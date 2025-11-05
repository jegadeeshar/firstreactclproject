import type { Meta, StoryObj } from '@storybook/react-vite';
import ScanUploadComponent from '@core/components/ScanUploadComponent';
import { ThemeProvider, CssBaseline } from '@mui/material';
import customTheme from '@core/theme';

const meta: Meta<typeof ScanUploadComponent> = {
  title: 'Components/ScanUpload/ScanUploadComponent',
  component: ScanUploadComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ScanUploadComponent>;

// Default Upload Component View
export const Default: Story = {
  args: {
    noteText: 'Note: Support the format JPEG, JPG & PNG',
    handleUpload: (file: File) => console.log('File uploaded:', file.name),
    handleScan: (file: File) => console.log('Scanned file:', file.name),
  },
};

// Upload and Scan Functional preview
export const UploadAndScanPreview: Story = {
  render: (args) => (
    <ScanUploadComponent
      {...args}
      handleUpload={(file) => alert(`Pretend file "${file.name}" uploaded successfully!`)}
      handleScan={(file) => alert(`Pretend scanned image "${file.name}" successfully!`)}
    />
  ),
};

// Invalid File Type Simulation
export const InvalidFileType: Story = {
  render: (args) => (
    <ScanUploadComponent
      {...args}
      handleUpload={() => alert('Invalid file type! Please upload only JPG or PNG images.')}
    />
  ),
};
