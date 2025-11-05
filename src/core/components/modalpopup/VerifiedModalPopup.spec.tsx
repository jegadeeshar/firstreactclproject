import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import VerifiedModalPopup from '@core/components/modalpopup/VerifiedModalPopup';

// Mock the image import
vi.mock('@core/assets/images/verified.png', () => ({
  default: 'mocked-image.png',
}));

describe('VerifiedModalPopup Component', () => {
  it('renders modal with default texts', () => {
    render(<VerifiedModalPopup />);

    // Check modal title
    const modalText = screen.getByText(/Thank you for updating your Corporate KYC!/i);
    expect(modalText).toBeInTheDocument();

    // Check image
    const image = screen.getByAltText('Popup Illustration');
    expect(image).toHaveAttribute('src', 'mocked-image.png');

    // Check description
    const description = screen.getByText(/Click the button below to get started with dedupe/i);
    expect(description).toBeInTheDocument();

    // Check action button
    const actionButton = screen.getByRole('button', { name: /initiate dedupe/i });
    expect(actionButton).toBeInTheDocument();
  });

  it('calls onAction callback when clicking the action button', () => {
    const onActionMock = vi.fn();
    render(<VerifiedModalPopup onAction={onActionMock} />);

    const actionButton = screen.getByRole('button', { name: /initiate dedupe/i });
    fireEvent.click(actionButton);

    expect(onActionMock).toHaveBeenCalled();
  });

  it('modal remains visible when clicking overlay', () => {
    render(<VerifiedModalPopup />);

    const overlay = screen.getByTestId('overlay');
    fireEvent.click(overlay);

    // Modal should still be visible because open = true
    const modalText = screen.getByText(/Thank you for updating your Corporate KYC!/i);
    expect(modalText).toBeInTheDocument();
  });

  it('modal content remains visible when clicking inside modal', () => {
    render(<VerifiedModalPopup />);

    const modalText = screen.getByText(/Thank you for updating your Corporate KYC!/i);
    fireEvent.click(modalText);

    expect(modalText).toBeInTheDocument();
  });
});
