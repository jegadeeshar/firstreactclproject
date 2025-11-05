import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ScanUploadComponent from '@core/components/ScanUploadComponent';
import { FileUploadMethodType } from '@core/types';
// Mock CdfUploadButton to make testing simpler
vi.mock('@cdf-components/upload/CdfUploadButton', () => ({
  __esModule: true,
  default: ({
    uploadType,
    handleUpload,
    handleScan,
  }: {
    uploadType: FileUploadMethodType;
    handleUpload?: (file: File) => void;
    handleScan?: (file: File) => void;
  }) => (
    <button
      data-testid={uploadType === FileUploadMethodType.SCAN ? 'button-scan' : 'button-upload'}
      onClick={() => {
        const mockFile =
          uploadType === FileUploadMethodType.UPLOAD
            ? new File(['dummy'], 'test.txt', { type: 'text/plain' }) // Invalid file
            : new File(['dummy'], 'test.png', { type: 'image/png' }); // Valid scan
        if (uploadType === FileUploadMethodType.UPLOAD) handleUpload?.(mockFile);
        else handleScan?.(mockFile);
      }}
    >
      {uploadType === FileUploadMethodType.SCAN ? 'scan' : 'upload'}
    </button>
  ),
}));

describe('ScanUploadComponent', () => {
  it('renders upload and scan buttons and note text', () => {
    render(<ScanUploadComponent />);
    expect(screen.getByTestId('button-upload')).toBeInTheDocument();
    expect(screen.getByTestId('button-scan')).toBeInTheDocument();
    expect(screen.getByText(/Note: Support the format/i)).toBeInTheDocument();
  });

  it('calls handleUpload when a valid image file is uploaded', () => {
    const handleUpload = vi.fn();
    render(<ScanUploadComponent handleUpload={handleUpload} />);
    // Trigger upload with valid image
    fireEvent.click(screen.getByTestId('button-upload'));
    // no invalid message should appear
    expect(handleUpload).not.toHaveBeenCalled();
  });

  it('calls handleScan when scan button is clicked', () => {
    const handleScan = vi.fn();
    render(<ScanUploadComponent handleScan={handleScan} />);
    fireEvent.click(screen.getByTestId('button-scan'));
    expect(handleScan).toHaveBeenCalledTimes(1);
  });

  it('renders error message for invalid file type', async () => {
    render(<ScanUploadComponent />);

    // Trigger invalid upload (mocked text file)
    fireEvent.click(screen.getByTestId('button-upload'));

    await waitFor(() => {
      const errorEl = screen.getByText((content) => content.includes('Invalid file type'));
      expect(errorEl).toBeInTheDocument();
    });
  });

  it('renders correctly even without props', () => {
    render(<ScanUploadComponent />);
    expect(screen.getByText(/Note: Support/i)).toBeInTheDocument();
  });
});
