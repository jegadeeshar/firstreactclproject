import type { Meta, StoryObj } from '@storybook/react-vite';
import CdfUploadPreview from './CdfUploadPreview';

const meta: Meta<typeof CdfUploadPreview> = {
  title: 'Form/Upload/CdfUploadPreview',
  component: CdfUploadPreview,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: { control: 'text', description: 'Uploaded document name (e.g. Aadhaar)' },
    type: { control: 'text', description: 'Document type (e.g. PDF, JPEG)' },
    disabled: { control: 'boolean', description: 'Disables all buttons' },
    previewUrl: { control: 'text', description: 'URL of the preview image or document' },
    onDelete: { action: 'deleted', description: 'Triggered when delete icon is clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof CdfUploadPreview>;

// Default example
export const Default: Story = {
  args: {
    title: 'Aadhaar',
    type: 'JPEG',
    previewUrl:
      'https://media.assettype.com/outlookmoney/2025-08-18/vw8vxlhj/PVC-Aadhaar-card.png?w=801&auto=format%2Ccompress&fit=max&format=webp&dpr=1.0',
  },
};

// With delete button
export const WithDelete: Story = {
  args: {
    title: 'Aadhaar',
    type: 'PDF',
    previewUrl:
      'https://media.assettype.com/outlookmoney/2025-08-18/vw8vxlhj/PVC-Aadhaar-card.png?w=801&auto=format%2Ccompress&fit=max&format=webp&dpr=1.0',
    onDelete: () => alert('Delete clicked'),
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    title: 'Aadhaar',
    type: 'Image',
    previewUrl:
      'https://media.assettype.com/outlookmoney/2025-08-18/vw8vxlhj/PVC-Aadhaar-card.png?w=801&auto=format%2Ccompress&fit=max&format=webp&dpr=1.0',
    onDelete: () => alert('Delete clicked'),
    disabled: true,
  },
};

// Without preview URL
export const NoPreview: Story = {
  args: {
    title: 'Aadhaar',
    type: 'PDF',
    onDelete: () => alert('Delete clicked'),
  },
};
