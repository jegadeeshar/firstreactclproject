import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import CdfAlert from './CdfAlert';

const meta: Meta<typeof CdfAlert> = {
  title: 'Components/Alert/CdfAlert',
  component: CdfAlert,
  tags: ['autodocs'],
  argTypes: {
    message: { control: 'text' },
    type: { control: 'radio', options: ['success', 'error', 'warning', 'info'] },
    open: { control: 'boolean' },
    autoHideDuration: { control: 'number' },
    index: { control: 'number' },
    onClose: { action: 'closed' },
  },
};

export default meta;
type Story = StoryObj<typeof CdfAlert>;

// ✅ Base Alert
export const Default: Story = {
  args: {
    message: 'This is a default alert',
    type: 'info',
    open: true,
    index: 0,
  },
};

// ✅ Success Alert
export const Success: Story = {
  args: {
    message: 'Operation completed successfully!',
    type: 'success',
    open: true,
    index: 0,
  },
};

// ✅ Error Alert
export const Error: Story = {
  args: {
    message: 'Something went wrong!',
    type: 'error',
    open: true,
    index: 0,
  },
};

// ✅ Warning Alert
export const Warning: Story = {
  args: {
    message: 'This is a warning!',
    type: 'warning',
    open: true,
    index: 0,
  },
};

// ✅ Auto Hide Example
export const AutoHide: Story = {
  args: {
    message: 'This alert will disappear in 2 seconds',
    type: 'info',
    open: true,
    autoHideDuration: 2000,
    index: 0,
  },
};

// ✅ Multiple stacked alerts
export const StackedAlerts: Story = {
  render: () => {
    const [open, setOpen] = useState([true, true, true]);
    return (
      <>
        <CdfAlert
          message="First alert"
          type="success"
          open={open[0]}
          onClose={() => setOpen([false, open[1], open[2]])}
          index={0}
        />
        <CdfAlert
          message="Second alert"
          type="warning"
          open={open[1]}
          onClose={() => setOpen([open[0], false, open[2]])}
          index={1}
        />
        <CdfAlert
          message="Third alert"
          type="error"
          open={open[2]}
          onClose={() => setOpen([open[0], open[1], false])}
          index={2}
        />
      </>
    );
  },
};
