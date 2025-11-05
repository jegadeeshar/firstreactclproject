import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, beforeEach, expect } from 'vitest';
import type { Mock } from 'vitest'; //
import { useForm } from 'react-hook-form';
import ProductDetails from '@/modules/lead/pages/ProductDetails';
import logger from '@/core/utils/loggerUtils';

// --- Mock Dependencies ---
vi.mock('@/core/utils/loggerUtils');
vi.mock('@/core/cdf-components/footer/CdfActionFooter', () => ({
  __esModule: true,
  default: ({ onSubmit, onClose }: { onSubmit: () => void; onClose: () => void }) => (
    <div>
      <button onClick={onSubmit}>Submit</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  ),
}));
vi.mock('@/core/layout/FormWrapper', () => ({
  __esModule: true,
  default: ({ children, footer }: { children: React.ReactNode; footer: React.ReactNode }) => (
    <form>
      {children}
      {footer}
    </form>
  ),
}));
vi.mock('@/modules/lead/components/ProductDetailsForm', () => ({
  __esModule: true,
  default: () => <div data-testid="product-details-form">Product Details Form</div>,
}));

// --- Mock react-hook-form ---
vi.mock('react-hook-form', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-hook-form')>();
  return {
    ...actual,
    useForm: vi.fn(() => ({
      handleSubmit: (fn: unknown) => fn,
      reset: vi.fn(),
      register: vi.fn(),
      formState: { errors: {} },
    })),
  };
});

describe('ProductDetails Component', () => {
  const mockInfo = vi.fn();
  const mockReset = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (logger.info as Mock).mockImplementation(mockInfo); // ✅ Fixed type
    (useForm as Mock).mockReturnValue({
      handleSubmit: (fn: unknown) => fn,
      reset: mockReset,
      register: vi.fn(),
      formState: { errors: {} },
    });
  });

  it('renders the ProductDetailsForm and FormWrapper', () => {
    render(<ProductDetails />);
    expect(screen.getByTestId('product-details-form')).toBeInTheDocument();
  });

  it('calls logger.info with form data on submit', () => {
    render(<ProductDetails />);

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    expect(mockInfo).toHaveBeenCalledWith('Form submitted with data:', expect.any(Object));
  });

  it('resets form on cancel click', () => {
    render(<ProductDetails />);

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(mockReset).toHaveBeenCalledTimes(1);
  });
});
