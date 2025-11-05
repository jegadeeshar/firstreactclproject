import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack } from '@mui/material';
import { CdfSubmitButton, CdfDeleteButton, CdfCancelButton, CdfIconButton } from './CdfButtons';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// ✅ Storybook metadata
const meta: Meta<typeof CdfSubmitButton> = {
  title: 'Form/Buttons/CdfButtons',
  component: CdfSubmitButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof CdfSubmitButton>;

// 🟩 Submit Button
export const Submit: Story = {
  args: {
    label: 'Submit',
    onClick: () => alert('Submit clicked!'),
  },
};

// 🟥 Delete Button
export const Delete: Story = {
  render: (args) => <CdfDeleteButton {...args} />,
  args: {
    label: 'Delete',
    onClick: () => alert('Delete clicked!'),
  },
};

// 🟨 Cancel Button
export const Cancel: Story = {
  render: (args) => <CdfCancelButton {...args} />,
  args: {
    label: 'Cancel',
    onClick: () => alert('Cancel clicked!'),
  },
};

// 🟦 Update Icon Button (replaces CdfUpdateButton)
export const UpdateIconButton: Story = {
  render: () => (
    <CdfIconButton
      icon={<EditIcon />}
      label="Update"
      variant="outlined"
      color="secondary"
      onClick={() => alert('Update clicked!')}
    />
  ),
};

// 🟦 Summary Icon Button (replaces CdfSummaryButton)
export const SummaryIconButton: Story = {
  render: () => (
    <CdfIconButton
      icon={<VisibilityIcon />}
      label="Summary"
      variant="outlined"
      color="info"
      onClick={() => alert('Summary clicked!')}
    />
  ),
};

// 🟦 Continue Icon Button (replaces CdfContinueButton)
export const ContinueIconButton: Story = {
  render: () => (
    <CdfIconButton
      icon={<ArrowForwardIcon />}
      label="Continue"
      variant="contained"
      color="info"
      onClick={() => alert('Continue clicked!')}
    />
  ),
};

// 🔘 Icon Button (Icon Only)
export const IconButton: Story = {
  render: () => (
    <CdfIconButton icon={<EditIcon />} label="Edit" onClick={() => alert('Icon clicked!')} />
  ),
};

// 🔘 Icon Button with Label
export const IconButtonWithLabel: Story = {
  render: () => (
    <Stack spacing={2} direction="row">
      <CdfIconButton icon={<EditIcon />} label="Edit" onClick={() => alert('Edit!')} />
      <CdfIconButton
        icon={<VisibilityIcon />}
        label="View"
        variant="contained"
        onClick={() => alert('View!')}
      />
      <CdfIconButton
        icon={<ArrowForwardIcon />}
        label="Next"
        variant="outlined"
        color="info"
        onClick={() => alert('Next!')}
      />
    </Stack>
  ),
};

// 🔘 Icon Button Colors
export const IconButtonColors: Story = {
  render: () => (
    <Stack spacing={2} direction="row">
      <CdfIconButton
        icon={<EditIcon />}
        label="Primary"
        color="primary"
        onClick={() => alert('Primary!')}
      />
      <CdfIconButton
        icon={<VisibilityIcon />}
        label="Secondary"
        color="secondary"
        onClick={() => alert('Secondary!')}
      />
      <CdfIconButton
        icon={<ArrowForwardIcon />}
        label="Info"
        color="info"
        onClick={() => alert('Info!')}
      />
    </Stack>
  ),
};

// 🧩 All Buttons Together
export const AllButtons: Story = {
  render: () => (
    <Stack spacing={2} direction="row" flexWrap="wrap">
      <CdfSubmitButton label="Submit" onClick={() => alert('Submit clicked!')} />
      <CdfDeleteButton label="Delete" onClick={() => alert('Delete clicked!')} />
      <CdfCancelButton label="Cancel" onClick={() => alert('Cancel clicked!')} />
      <CdfIconButton
        icon={<EditIcon />}
        label="Update"
        variant="outlined"
        color="secondary"
        onClick={() => alert('Update clicked!')}
      />
      <CdfIconButton
        icon={<VisibilityIcon />}
        label="Summary"
        variant="outlined"
        color="info"
        onClick={() => alert('Summary clicked!')}
      />
      <CdfIconButton
        icon={<ArrowForwardIcon />}
        label="Continue"
        variant="contained"
        color="info"
        onClick={() => alert('Continue clicked!')}
      />
      <CdfIconButton icon={<EditIcon />} label="Edit" onClick={() => alert('Icon only clicked!')} />
    </Stack>
  ),
};
