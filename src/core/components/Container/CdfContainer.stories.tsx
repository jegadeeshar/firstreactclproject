// src/core/components/layout/CdfContainer.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';

import CdfContainer from './CdfContainer';

const meta: Meta<typeof CdfContainer> = {
  title: 'Components/Container/CdfContainer',
  component: CdfContainer,
  tags: ['autodocs'],
  argTypes: {
    rowSpacing: { control: 'number' },
    columnSpacing: { control: 'number' },
    marginBottom: { control: 'number' },
  },
} satisfies Meta<typeof CdfContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rowSpacing: 4,
    columnSpacing: 4,
    marginBottom: 4,
    children: (
      <div style={{ background: '#eee', padding: '16px' }}>
        <p>Child 1</p>
        <p>Child 2</p>
      </div>
    ),
  },
};

export const CustomSpacing: Story = {
  args: {
    rowSpacing: 2,
    columnSpacing: 6,
    marginBottom: 2,
    children: (
      <div style={{ background: '#ddd', padding: '16px' }}>
        <p>With custom spacing</p>
      </div>
    ),
  },
};
