import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CdfUploadButton from './CdfUploadButton';
import { FileUploadMethodType } from '@/core/types';

// Create a valid Base64 PNG so atob() doesn’t throw
const validBase64PNG =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4z8DwHwAFgwJ/lmlNUwAAAABJRU5ErkJggg==';

// Mock react-webcam correctly
vi.mock('react-webcam', async () => {
  const React = await import('react');
  return {
    __esModule: true,
    default: React.forwardRef(
      (
        props: Record<string, unknown>,
        ref: React.ForwardedRef<{ getScreenshot: () => string }>
      ) => {
        if (ref && typeof ref === 'object') {
          ref.current = {
            getScreenshot: vi.fn(() => validBase64PNG),
          };
        }
        return <div data-testid="mock-webcam" {...props} />;
      }
    ),
  };
});

const theme = createTheme({
  palette: {
    blue: { main: '#1976d2', dark: '#115293' },
    blond: { main: '#f7e1a0', dark: '#c4a463' },
    action: { disabledBackground: '#f0f0f0' },
    text: { primary: '#000000', disabled: '#a0a0a0' },
    success: { main: '#4caf50' },
  },
});

const renderWithTheme = (ui: React.ReactNode) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe('CdfUploadButton Component', () => {
  it('renders upload button with correct text and icon', () => {
    renderWithTheme(<CdfUploadButton />);
    expect(screen.getByText(/Upload/i)).toBeInTheDocument();
    expect(screen.getByAltText('Upload')).toBeInTheDocument();
  });

  it('renders scan button with correct text and icon', () => {
    renderWithTheme(<CdfUploadButton uploadType={FileUploadMethodType.SCAN} />);
    expect(screen.getByText(/Scan/i)).toBeInTheDocument();
    expect(screen.getByAltText('Scan')).toBeInTheDocument();
  });

  it('shows tick immediately when showTick is true (upload)', () => {
    renderWithTheme(<CdfUploadButton showTick />);
    expect(screen.getByTestId('TickIcon')).toBeInTheDocument();
  });

  it('calls handleUpload after selecting a file', () => {
    const handleUpload = vi.fn();
    const { container } = renderWithTheme(<CdfUploadButton handleUpload={handleUpload} />);
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
    fireEvent.change(input, { target: { files: [file] } });
    expect(handleUpload).toHaveBeenCalledWith(file);
  });

  it('does not trigger upload when disabled', () => {
    const handleUpload = vi.fn();
    const { container } = renderWithTheme(<CdfUploadButton disabled handleUpload={handleUpload} />);
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(['dummy'], 'dummy.png', { type: 'image/png' });
    fireEvent.change(input, { target: { files: [file] } });
    expect(handleUpload).not.toHaveBeenCalled();
  });

  it('opens camera modal on scan button click', async () => {
    renderWithTheme(<CdfUploadButton uploadType={FileUploadMethodType.SCAN} />);
    const button = screen.getByText(/Scan/i);
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.getByText(/Scan Cheque/i)).toBeInTheDocument();
      expect(screen.getByTestId('mock-webcam')).toBeInTheDocument();
    });
  });

  it('calls handleScan when Capture is clicked in modal', async () => {
    const handleScan = vi.fn();
    renderWithTheme(
      <CdfUploadButton uploadType={FileUploadMethodType.SCAN} handleScan={handleScan} />
    );

    // Open modal
    fireEvent.click(screen.getByText(/Scan/i));
    // Wait for modal and webcam to render
    await waitFor(() => expect(screen.getByTestId('mock-webcam')).toBeInTheDocument());
    // Click Capture button
    fireEvent.click(screen.getByText(/Capture/i));
    // Expect handleScan to be called with a File
    await waitFor(() => {
      expect(handleScan).toHaveBeenCalledTimes(1);
      const fileArg = handleScan.mock.calls[0][0];
      expect(fileArg).toBeInstanceOf(File);
      expect(fileArg.name).toBe('scanned-image.png');
    });
  });
});
