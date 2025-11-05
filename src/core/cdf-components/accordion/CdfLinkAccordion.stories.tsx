import type { Meta, StoryObj } from '@storybook/react-vite';
import CdfLinkAccordion from './CdfLinkAccordion';

const meta: Meta<typeof CdfLinkAccordion> = {
  title: 'Components/CdfLinkAccordion',
  component: CdfLinkAccordion,
  tags: ['autodocs'],
  argTypes: {
    expandedText: { control: 'text', description: 'Text displayed when expanded' },
    collapsedText: { control: 'text', description: 'Text displayed when collapsed' },
    children: { control: 'text', description: 'Accordion content' },
  },
};

export default meta;
type Story = StoryObj<typeof CdfLinkAccordion>;

/**
 * Default example showing how the accordion toggles between collapsed and expanded states.
 */
export const Default: Story = {
  args: {
    expandedText: 'Hide Details',
    collapsedText: 'Show Details',
    children:
      'This is a simple accordion where the link text toggles between "Show Details" and "Hide Details".',
  },
};

/**
 * Example with a longer detail section to showcase dynamic content rendering.
 */
export const LongContent: Story = {
  args: {
    expandedText: 'Hide More Info',
    collapsedText: 'Show More Info',
    children: `Biryani is a flavorful rice dish made with aromatic spices and meat or vegetables. 
It's often served with raita, boiled eggs, and salad. 
This example demonstrates how the accordion handles multiline content gracefully.`,
  },
};

/**
 * Example with custom theming or text variations.
 */
export const CustomLabels: Story = {
  args: {
    expandedText: 'Collapse Section',
    collapsedText: 'Expand Section',
    children:
      'This variant shows custom text labels that differ from the traditional "Show/Hide" pattern.',
  },
};
