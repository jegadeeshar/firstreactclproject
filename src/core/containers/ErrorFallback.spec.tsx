import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import ErrorFallback from './ErrorFallback';

describe('ErrorFallback Component', () => {
  const mockError = new Error('Test error message');
  const mockReset = vi.fn();

  it('renders error message and button', () => {
    render(<ErrorFallback error={mockError} resetErrorBoundary={mockReset} />);

    // Check for heading
    expect(screen.getByText(/Something went wrong!/i)).toBeInTheDocument();

    // Check for error message
    expect(screen.getByText(/Test error message/i)).toBeInTheDocument();

    // Check for button
    const button = screen.getByRole('button', { name: /Try again/i });
    expect(button).toBeInTheDocument();
  });

  it('calls resetErrorBoundary when button is clicked', () => {
    render(<ErrorFallback error={mockError} resetErrorBoundary={mockReset} />);

    const button = screen.getByRole('button', { name: /Try again/i });
    fireEvent.click(button);

    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it('displays the error inside <pre> tag', () => {
    render(<ErrorFallback error={mockError} resetErrorBoundary={mockReset} />);

    const preElement = screen.getByText(/Test error message/i);
    expect(preElement.tagName).toBe('PRE');
  });
});
