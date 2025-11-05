import type { Meta, StoryObj } from '@storybook/react-vite';
import CdfAppBar from '@/core/cdf-components/appbar/CdfAppBar';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import type { AppBarCustomProps } from '@/core/types';

const meta: Meta<typeof CdfAppBar> = {
  title: 'Components/Header/CdfAppBar',
  component: CdfAppBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={createTheme()}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CdfAppBar>;

const defaultArgs: AppBarCustomProps = {
  title: 'LAP',
  userName: 'Dhanu Varsha R',
  branch: 'Chennai ',
  notificationCount: 3,
};

// APPBAR
export const Default: Story = {
  name: 'Desktop View',
  args: defaultArgs,
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};

//--Notifcation
export const NoNotifications: Story = {
  args: {
    ...defaultArgs,
    notificationCount: 0,
  },
};

// Without Username
export const NoUserName: Story = {
  name: 'No Username',
  args: {
    ...defaultArgs,
    userName: '',
  },
};
