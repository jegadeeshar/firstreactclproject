import type { Meta, StoryObj } from '@storybook/react-vite';
import CdfPillTabs from '@cdf-components/tabs/CdfPillTabs';

const meta: Meta<typeof CdfPillTabs> = {
  title: 'Components/Tabs/CdfPillTabs',
  component: CdfPillTabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  argTypes: {
    tabs: {
      control: { type: 'object' },
      description: 'List of tab labels (for now static, later can fetch from API)',
    },
    initialValue: {
      control: { type: 'number' },
      description: 'Index of initially active tab',
    },
  },
};
export default meta;

type Story = StoryObj<typeof CdfPillTabs>;

// ---------- Stories ----------

// Default story with static list
export const Default: Story = {
  args: {
    tabs: ['New leads', 'Assigned', 'Review'],
    initialValue: 0,
  },
};

// Story with a different initial tab
export const WithInitialValue: Story = {
  args: {
    tabs: ['New leads', 'Assigned', 'Review'],
    initialValue: 1,
  },
};

// Story demonstrating "dynamic" data simulation
export const DynamicTabsSimulation: Story = {
  args: {
    tabs: Array.from({ length: 5 }, (_, i) => `Tab ${i + 1}`),
    initialValue: 2,
  },
};
