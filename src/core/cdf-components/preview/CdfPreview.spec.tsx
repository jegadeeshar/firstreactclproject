import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CdfPreview from './CdfPreview';
import type { CdfPreviewProps } from '@core/types';

describe('CdfPreview Component', () => {
  const defaultProps: CdfPreviewProps = {
    open: true,
    imageUrl: 'https://via.placeholder.com/600x400',
    title: 'Test Preview',
    onClose: vi.fn(),
  };

  it('renders modal when open is true', () => {
    render(<CdfPreview {...defaultProps} />);
    const modalTitle = screen.getByText(defaultProps.title!);
    expect(modalTitle).toBeInTheDocument();
  });

  it('renders image with correct src', () => {
    render(<CdfPreview {...defaultProps} />);
    const image = screen.getByAltText('Preview') as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(defaultProps.imageUrl);
  });

  it('calls onClose when close button is clicked', () => {
    render(<CdfPreview {...defaultProps} />);
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('does not render modal content when open is false', () => {
    render(<CdfPreview {...defaultProps} open={false} />);
    const modalTitle = screen.queryByText(defaultProps.title!);
    expect(modalTitle).not.toBeInTheDocument();
  });
});
