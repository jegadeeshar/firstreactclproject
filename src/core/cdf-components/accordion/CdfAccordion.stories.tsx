import type { Meta, StoryObj } from '@storybook/react-vite';
import { CdfAccordion } from './CdfAccordion';

const meta: Meta<typeof CdfAccordion> = {
  title: 'Components/Accordion/CdfAccordion',
  component: CdfAccordion,
  tags: ['autodocs'],
  argTypes: {
    expanded: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof CdfAccordion>;

// ✅ Default Accordion
export const Default: Story = {
  args: {
    summary: 'Accordion 1',
    details: 'This is a accordion component.',
  },
};

// ✅ Expanded Accordion
export const Expanded: Story = {
  args: {
    defaultExpanded: true,
    summary: 'Accordion 2',
    details: 'This is a accordion component.',
  },
};

// ✅ Multiple Accordions Example
export const MultipleAccordions: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <CdfAccordion summary="Accordion 1" details="This is the first accordion content." />
      <CdfAccordion summary="Accordion 2" details="This is the second accordion content." />
      <CdfAccordion
        summary="Accordion 3"
        details="This is the third accordion content."
        defaultExpanded
      />
    </div>
  ),
};
