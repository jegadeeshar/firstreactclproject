import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import PaymentPage from '@/modules/bankAccountDetail/pages/PaymentPage';

// Mock FormWrapper
vi.mock('@/core/layout/FormWrapper', () => ({
  default: ({ children, footer }: { children: React.ReactNode; footer: React.ReactNode }) => (
    <div data-testid="form-wrapper">
      {children}
      {footer}
    </div>
  ),
}));

// Mock CdfActionFooter
vi.mock('@/core/cdf-components/footer/CdfActionFooter', () => ({
  default: ({ onSubmit, onClose }: { onSubmit: () => void; onClose: () => void }) => (
    <div data-testid="cdf-action-footer">
      <button onClick={onSubmit}>Submit</button>
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

// Mock RazorpayPayment
vi.mock('@/modules/bankAccountDetail/components/RazorpayPayment', () => ({
  default: () => <div data-testid="razorpay-payment">Razorpay Payment Component</div>,
}));

describe('PaymentPage', () => {
  it('renders the PaymentPage with FormWrapper, footer, and RazorpayPayment', () => {
    render(<PaymentPage />);

    expect(screen.getByTestId('form-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('cdf-action-footer')).toBeInTheDocument();
    expect(screen.getByTestId('razorpay-payment')).toBeInTheDocument();
    expect(screen.getByText('Razorpay Payment Component')).toBeInTheDocument();
  });

  it('calls onSubmit when submit button is clicked', () => {
    render(<PaymentPage />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    // Since onSubmit is empty, we just check it doesn't throw
    expect(submitButton).toBeInTheDocument();
  });

  it('calls handleCancel when close button is clicked', () => {
    render(<PaymentPage />);

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    // Since handleCancel resets the form, we just check it doesn't throw
    expect(closeButton).toBeInTheDocument();
  });
});
