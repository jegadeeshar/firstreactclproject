import type { Meta, StoryObj } from '@storybook/react-vite';
import CdfLinkButton from './CdfLinkButton';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';

const meta: Meta<typeof CdfLinkButton> = {
  title: 'Components/Link/CdfLinkButton',
  component: CdfLinkButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Text displayed inside the CdfLinkButton ',
    },
    href: {
      control: 'text',
      description: 'Destination URL for the CdfLinkButton',
    },
    icon: {
      control: false,
      description: 'Optional icon displayed on the left side',
    },
  },
};

export default meta;

type Story = StoryObj<typeof CdfLinkButton>;

export const Default: Story = {
  args: {
    label: 'VERIFIED',
    href: 'https://www.google.com',
    icon: <VerifiedOutlinedIcon />, // Left-side icon
  },
};

export const WithoutIcon: Story = {
  args: {
    label: 'Click Here',
    href: 'https://www.google.com',
  },
};

export const CustomText: Story = {
  args: {
    label: 'Learn More',
    href: 'https://mui.com/',
    icon: <VerifiedOutlinedIcon />,
  },
};
