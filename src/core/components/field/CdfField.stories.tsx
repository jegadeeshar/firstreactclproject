// src/core/components/layout/CdfField.stories.tsx

import type { Meta, StoryObj } from '@storybook/react-vite';
import CdfField from './CdfField';

const meta: Meta<typeof CdfField> = {
  title: 'Components/Field/CdfField',
  component: CdfField,
  tags: ['autodocs'],
  argTypes: {
    wide: { control: 'boolean' },
    size: { control: 'object' },
    children: { control: false },
  },
} satisfies Meta<typeof CdfField>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default usage: standard size
export const Default: Story = {
  args: {
    children: <div style={{ background: '#eee', padding: '16px' }}>Field Content</div>,
  },
};

// Wide variant
export const Wide: Story = {
  args: {
    wide: true,
    children: <div style={{ background: '#ddd', padding: '16px' }}>Wide Field Content</div>,
  },
};

// Custom size variant
export const CustomSize: Story = {
  args: {
    size: { xs: 12, sm: 6, md: 6 },
    children: <div style={{ background: '#ccc', padding: '16px' }}>Custom Size Field</div>,
  },
};
