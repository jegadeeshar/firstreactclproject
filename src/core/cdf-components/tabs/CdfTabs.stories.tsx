import type { Meta, StoryObj } from '@storybook/react-vite';
import CdfTabs from './CdfTabs';
import type { TabItem } from '@/core/types';

const meta: Meta<typeof CdfTabs> = {
  title: 'Components/Tabs/CdfTabs',
  component: CdfTabs,
  tags: ['autodocs'],
  argTypes: {
    tabs: {
      control: 'object',
      table: {
        type: { summary: 'TabItem[]' },
        defaultValue: { summary: '[]' },
      },
    },
    defaultValue: {
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CdfTabs>;

// ------------------- Default Tabs -------------------
const defaultTabs: TabItem[] = [
  { label: 'Bureau Validation', value: 'bureau', content: <div>This is Bureau page</div> },
  { label: 'Dedupe Details', value: 'dedupe', content: <div>This is Dedupe page</div> },
];

// ------------------- Stories -------------------
export const Default: Story = {
  args: {
    tabs: defaultTabs,
    defaultValue: 'bureau',
  },
};

// ------------------- Single Tab Active -------------------
export const SingleTabActive: Story = {
  args: {
    tabs: defaultTabs,
    defaultValue: 'dedupe',
  },
};

// ------------------- Custom Tabs -------------------
export const CustomTabs: Story = {
  args: {
    tabs: [
      {
        label: 'Bureau Validation',
        value: 'bureau',
        content: <div>This is Bureau Validation Page</div>,
      },
      { label: 'Dedupe Details', value: 'dedupe', content: <div>This is Dedupe details Page</div> },
      {
        label: 'FI Residence Verification',
        value: 'residence',
        content: <div>This is FI Residence Verification Page</div>,
      },
    ],
    defaultValue: 'dedupe',
  },
};
