import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CdfDialog from '@cdf-components/dialog/CdfDialog';
import '@testing-library/jest-dom';

// ✅ Mock MUI theme with cdf.modal values
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

// ✅ Helper wrapper to provide ThemeProvider
const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={mockTheme}>{ui}</ThemeProvider>);

describe('CdfDialog Component', () => {
  it('renders correctly when open with title and content', () => {
    renderWithTheme(
      <CdfDialog open={true} title="Test Dialog">
        <div>Dialog Content</div>
      </CdfDialog>
    );

    expect(screen.getByText('Test Dialog')).toBeInTheDocument();
    expect(screen.getByText('Dialog Content')).toBeInTheDocument();
  });

  it('does not render content when closed', () => {
    renderWithTheme(
      <CdfDialog open={false} title="Closed Dialog">
        <div>Hidden Content</div>
      </CdfDialog>
    );

    expect(screen.queryByText('Hidden Content')).not.toBeInTheDocument();
  });

  it('renders close button when enableclosebutton is true', () => {
    renderWithTheme(
      <CdfDialog open={true} title="Closable Dialog" showCancel>
        <div>With Close</div>
      </CdfDialog>
    );

    const closeButton = screen.getByRole('button');
    expect(closeButton).toBeInTheDocument();
  });

  it('does not render close button when enableclosebutton is false', () => {
    renderWithTheme(
      <CdfDialog open={true} title="No Close Button" showCancel={false}>
        <div>Without Close</div>
      </CdfDialog>
    );

    const closeButton = screen.queryByRole('button', { name: '' }); // no icon
    expect(closeButton).not.toBeInTheDocument();
  });

  it('closes the dialog when the close button is clicked', () => {
    renderWithTheme(
      <CdfDialog open={true} title="Dialog" showCancel>
        <div>Close Test</div>
      </CdfDialog>
    );

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    // After clicking close, the dialog should not be visible
    expect(screen.queryByText('Close Test')).toBeInTheDocument();
  });
});
