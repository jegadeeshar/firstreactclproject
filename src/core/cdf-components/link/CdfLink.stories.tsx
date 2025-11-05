import type { Meta, StoryObj } from '@storybook/react-vite';
import CdfLink from './CdfLink';
import ReplayIcon from '@mui/icons-material/Replay';
import { Description } from '@mui/icons-material';

const meta: Meta<typeof CdfLink> = {
  title: 'Components/Link/CdfLink',
  component: CdfLink,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof CdfLink>;

export const Default: Story = {
  args: {
    label: 'Click Me',
    icon: <Description fontSize="inherit" />,
    onClick: () => console.log('Clicked!'),
  },
};

export const CustomStyles: Story = {
  args: {
    label: 'Styled Link',
    icon: <ReplayIcon fontSize="inherit" />,
    onClick: () => console.log('Styled Click'),
  },
};
