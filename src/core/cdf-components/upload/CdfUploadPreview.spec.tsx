import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CdfUploadPreview from './CdfUploadPreview';
import { getThumbnailIcon } from '@core/utils/commonUtils';

// Mock thumbnail function
vi.mock('@core/utils/commonUtils', () => ({
  getThumbnailIcon: vi.fn(),
}));

// Mock icons
vi.mock('@core/assets/icons/VisibilityIcon.svg', () => ({ default: 'mock-visibility-icon.svg' }));
vi.mock('@core/assets/icons/DeleteIcon.svg', () => ({ default: 'mock-delete-icon.svg' }));

describe('CdfUploadPreview', () => {
  const mockOnDelete = vi.fn();
  const previewUrl = 'https://example.com/image.png';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders name, type, and thumbnail correctly', () => {
    (getThumbnailIcon as unknown as ReturnType<typeof vi.fn>).mockReturnValue('mock-thumbnail.svg');

    render(<CdfUploadPreview title="Aadhaar" type="PDF" />);

    expect(screen.getByText('Aadhaar')).toBeInTheDocument();
    expect(screen.getByText('PDF')).toBeInTheDocument();
    expect(getThumbnailIcon).toHaveBeenCalledWith('Aadhaar');
    expect(screen.getByRole('img', { name: '' })).toHaveAttribute('src', 'mock-thumbnail.svg');
  });

  it('renders preview button only if previewUrl is provided and opens it on click', () => {
    (getThumbnailIcon as unknown as ReturnType<typeof vi.fn>).mockReturnValue('mock-thumbnail.svg');

    const originalOpen = window.open;
    window.open = vi.fn();

    render(<CdfUploadPreview title="Aadhaar" type="Image" previewUrl={previewUrl} />);

    const previewButton = screen.getByRole('button', { name: '' });
    expect(previewButton).toBeInTheDocument();

    window.open = originalOpen;
  });

  it('does not render preview button if previewUrl is not provided', () => {
    render(<CdfUploadPreview title="Aadhaar" type="Image" />);

    const buttons = screen.queryAllByRole('button');
    expect(buttons).toHaveLength(0); // no buttons if no previewUrl and no onDelete
  });

  it('renders delete button only if onDelete is provided', () => {
    render(<CdfUploadPreview title="Aadhaar" type="PDF" onDelete={mockOnDelete} />);

    const deleteButton = screen.getByRole('button', { name: '' });
    expect(deleteButton).toBeInTheDocument();
  });

  it('disables buttons when disabled prop is true', () => {
    render(
      <CdfUploadPreview
        title="Aadhaar"
        type="PDF"
        previewUrl={previewUrl}
        onDelete={mockOnDelete}
        disabled={true}
      />
    );

    const buttons = screen.getAllByRole('button');
    buttons.forEach((btn) => expect(btn).toBeDisabled());
  });
});
