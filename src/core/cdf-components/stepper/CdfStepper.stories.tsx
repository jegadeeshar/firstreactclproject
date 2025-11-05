import type { Meta, StoryObj } from '@storybook/react-vite';
import CdfStepper from './CdfStepper';

const meta: Meta<typeof CdfStepper> = {
  title: 'CDF Components/Stage/CdfStepper',
  component: CdfStepper,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CdfStepper>;

const sampleItems = [
  { id: 'step-1', label: 'PAN', completed: true },
  { id: 'step-2', label: 'ID Proof', completed: true },
  { id: 'step-3', label: 'Selfie', completed: false },
  { id: 'step-4', label: 'Address Proof', completed: false },
  { id: 'step-5', label: 'Personal & Employment Details', completed: false },
];

export const Vertical: Story = {
  args: {
    items: sampleItems,
    orientation: 'vertical',
  },
};

export const Horizontal: Story = {
  args: {
    items: sampleItems,
    orientation: 'horizontal',
  },
};

export const WithClickHandler: Story = {
  args: {
    items: sampleItems,
    orientation: 'vertical',
    onItemClick: (itemId) => {
      console.log('Item clicked:', itemId);
    },
  },
};

export const CustomIconSize: Story = {
  args: {
    items: sampleItems,
    orientation: 'vertical',
    iconSize: 40,
  },
};

export const AllCompleted: Story = {
  args: {
    items: sampleItems.map((item) => ({ ...item, completed: true })),
    orientation: 'vertical',
  },
};

export const NoneCompleted: Story = {
  args: {
    items: sampleItems.map((item) => ({ ...item, completed: false })),
    orientation: 'vertical',
  },
};
