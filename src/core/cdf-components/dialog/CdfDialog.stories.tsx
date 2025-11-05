import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Typography, Button, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CdfDialog from '@cdf-components/dialog/CdfDialog';
import type { CdfDialogProps } from '@core/types';
import img from '@core/assets/images/verified.png';

// --- Mock theme with cdf.dialog values ---
const mockTheme = createTheme({
  cdf: {
    dialog: {
      Minwidth: 400,
      Minheight: 300,
      Maxwidth: 800,
      Maxheight: 600,
    },
  },
});

// --- Wrapper Component for Storybook control ---
// We omit 'open' since it’s controlled inside the wrapper.
interface DialogWrapperProps extends Omit<CdfDialogProps, 'open' | 'onClose'> {
  children?: React.ReactNode;
}

const DialogWrapper: React.FC<DialogWrapperProps> = ({
  title,
  submitButtonLabel,
  onButtonClick,
  children,
}) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => setOpen(false);

  return (
    <ThemeProvider theme={mockTheme}>
      <CdfDialog
        open={open}
        title={title}
        submitButtonLabel={submitButtonLabel}
        onButtonClick={onButtonClick}
      >
        {children}
        <Box display="flex" justifyContent="center" mt={2}>
          <Button variant="outlined" onClick={handleClose}>
            Close Dialog
          </Button>
        </Box>
      </CdfDialog>
    </ThemeProvider>
  );
};

// --- Storybook Meta Configuration ---
const meta: Meta<typeof CdfDialog> = {
  title: 'Components/Dialog/CdfDialog',
  component: CdfDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CdfDialog>;

// --- Default Story ---
export const Default: Story = {
  render: () => (
    <DialogWrapper title="Sample Dialog" submitButtonLabel="Confirm">
      <Typography variant="body1" align="center">
        This is a simple dialog component demonstrating header, content, and footer button.
      </Typography>
    </DialogWrapper>
  ),
};

// --- Story with Long Content (Scroll Test) ---
export const WithLongContent: Story = {
  render: () => (
    <DialogWrapper title="Scrollable Content" submitButtonLabel="Save">
      <Typography variant="body2">
        {[...Array(30)]
          .map((_, i) => `Line ${i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. `)
          .join('')}
      </Typography>
    </DialogWrapper>
  ),
};

// --- Story with Image Content ---
export const WithImage: Story = {
  render: () => (
    <DialogWrapper title="Dialog with Image" submitButtonLabel="Proceed">
      <Box display="flex" flexDirection="column" alignItems="center">
        <img src={img} alt="Sample" style={{ width: '100%', height: 'auto', borderRadius: 8 }} />
        <Typography mt={2} variant="body2" color="text.secondary">
          This image is contained within the dialog area and scales properly.
        </Typography>
      </Box>
    </DialogWrapper>
  ),
};

// --- Story without Header ---
export const WithoutHeader: Story = {
  render: () => (
    <ThemeProvider theme={mockTheme}>
      <CdfDialog open={true} submitButtonLabel="Okay" onButtonClick={() => alert('Clicked!')}>
        <Typography variant="body1" align="center">
          This dialog has no header section.
        </Typography>
      </CdfDialog>
    </ThemeProvider>
  ),
};
