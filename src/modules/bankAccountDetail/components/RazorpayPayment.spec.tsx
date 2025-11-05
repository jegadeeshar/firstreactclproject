import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import RazorpayPayment from '@/modules/bankAccountDetail/components/RazorpayPayment';

// Mock appConfig
vi.mock('@core/config/appConfig', () => ({
  appConfig: {
    RAZORPAY_KEY: 'test_key',
    RAZORPAY_CHECKOUT_URL: 'https://checkout.razorpay.com/v1/checkout.js',
    RAZORPAY_CURRENCY: 'INR',
    RAZORPAY_AMOUNT: 10000,
    RAZORPAY_NAME: 'Test',
    RAZORPAY_DESCRIPTION: 'Test Payment',
    RAZORPAY_PREFILL: {
      name: 'John Doe',
      email: 'john@example.com',
      contact: '9999999999',
    },
  },
}));

// Mock alertUtils
vi.mock('@core/utils/alertUtils', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock CdfSubmitButton
vi.mock('@cdf-components/buttons/CdfButtons', () => ({
  CdfSubmitButton: vi.fn(({ label, onClick, disabled }) => (
    <button data-testid="pay-button" onClick={onClick} disabled={disabled}>
      {label}
    </button>
  )),
}));

// Mock window.Razorpay
const mockRazorpay = {
  open: vi.fn(),
  on: vi.fn(),
};

Object.defineProperty(window, 'Razorpay', {
  writable: true,
  value: vi.fn(() => mockRazorpay),
});

describe('RazorpayPayment', () => {
  let alertUtils: {
    success: (message: string) => void;
    error: (message: string) => void;
    info: (message: string) => void;
    warning: (message: string) => void;
  };

  beforeEach(async () => {
    const alertUtilsModule = vi.mocked(await import('@core/utils/alertUtils'));
    alertUtils = alertUtilsModule.default;
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it('renders the payment button', () => {
    render(<RazorpayPayment />);
    expect(screen.getByTestId('pay-button')).toBeInTheDocument();
    expect(screen.getByText('Pay Now')).toBeInTheDocument();
  });

  it('loads Razorpay script successfully', async () => {
    render(<RazorpayPayment />);

    // Wait for script to load
    await waitFor(() => {
      expect(
        document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')
      ).toBeInTheDocument();
    });

    // Trigger onload manually since jsdom doesn't execute scripts
    const script = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    ) as HTMLScriptElement;
    if (script && script.onload) {
      script.onload(new Event('load'));
    }
  });

  it('handles script loading error', async () => {
    // Mock script error
    const originalCreateElement = document.createElement;
    document.createElement = vi.fn().mockImplementation((tagName) => {
      const element = originalCreateElement.call(document, tagName);
      if (tagName === 'script') {
        element.onerror = vi.fn();
        setTimeout(() => {
          if (element.onerror) element.onerror(new Event('error'));
        }, 0);
      }
      return element;
    });

    render(<RazorpayPayment />);

    await waitFor(() => {
      expect(alertUtils.error).toHaveBeenCalledWith('Failed to load Razorpay');
    });

    document.createElement = originalCreateElement;
  });

  it('disables button when script is not loaded', () => {
    render(<RazorpayPayment />);
    expect(screen.getByTestId('pay-button')).toBeDisabled();
  });

  it('enables button when script is loaded', async () => {
    render(<RazorpayPayment />);

    // Trigger script load
    const script = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    ) as HTMLScriptElement;
    if (script && script.onload) {
      script.onload(new Event('load'));
    }

    await waitFor(() => {
      expect(screen.getByTestId('pay-button')).not.toBeDisabled();
    });
  });

  it('initiates payment successfully', async () => {
    render(<RazorpayPayment />);

    // Trigger script load
    const script = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    ) as HTMLScriptElement;
    if (script && script.onload) {
      script.onload(new Event('load'));
    }

    await waitFor(() => {
      expect(screen.getByTestId('pay-button')).not.toBeDisabled();
    });

    fireEvent.click(screen.getByTestId('pay-button'));

    expect(window.Razorpay).toHaveBeenCalledWith({
      key: 'test_key',
      amount: 10000,
      currency: 'INR',
      name: 'Test',
      description: 'Test Payment',
      handler: expect.any(Function),
      prefill: {
        name: 'John Doe',
        email: 'john@example.com',
        contact: '9999999999',
      },
      modal: {
        ondismiss: expect.any(Function),
      },
    });

    expect(mockRazorpay.on).toHaveBeenCalledWith('payment.failed', expect.any(Function));
    expect(mockRazorpay.open).toHaveBeenCalled();
  });

  it('handles payment success', async () => {
    render(<RazorpayPayment />);

    // Trigger script load
    const script = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    ) as HTMLScriptElement;
    if (script && script.onload) {
      script.onload(new Event('load'));
    }

    await waitFor(() => {
      expect(screen.getByTestId('pay-button')).not.toBeDisabled();
    });

    fireEvent.click(screen.getByTestId('pay-button'));

    // Get the handler function
    const options = (window.Razorpay as jest.Mock).mock.calls[0][0];
    const successHandler = options.handler;

    successHandler({ razorpay_payment_id: 'pay_123' });

    expect(alertUtils.success).toHaveBeenCalledWith('Payment successful! Payment ID: pay_123');
  });

  it('handles payment failure', async () => {
    render(<RazorpayPayment />);

    // Trigger script load
    const script = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    ) as HTMLScriptElement;
    if (script && script.onload) {
      script.onload(new Event('load'));
    }

    await waitFor(() => {
      expect(screen.getByTestId('pay-button')).not.toBeDisabled();
    });

    fireEvent.click(screen.getByTestId('pay-button'));

    // Get the failure handler
    const failureCall = mockRazorpay.on.mock.calls.find((call) => call[0] === 'payment.failed');
    const failureHandler = failureCall ? failureCall[1] : () => {};

    failureHandler({ error: { description: 'Payment failed' } });

    expect(alertUtils.error).toHaveBeenCalledWith('Payment failed: Payment failed');
  });

  it('handles Razorpay not loaded error', async () => {
    // Temporarily remove Razorpay from window
    const originalRazorpay = window.Razorpay;
    Object.defineProperty(window, 'Razorpay', {
      writable: true,
      value: undefined,
    });

    render(<RazorpayPayment />);

    // Trigger script load
    const script = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    ) as HTMLScriptElement;
    if (script && script.onload) {
      script.onload(new Event('load'));
    }

    await waitFor(() => {
      expect(screen.getByTestId('pay-button')).not.toBeDisabled();
    });

    fireEvent.click(screen.getByTestId('pay-button'));

    expect(alertUtils.error).toHaveBeenCalledWith('Failed to load Razorpay Script');

    // Restore
    window.Razorpay = originalRazorpay;
  });

  it('handles initialization error', async () => {
    // Mock Razorpay constructor to throw
    const originalRazorpay = window.Razorpay;
    window.Razorpay = vi.fn(() => {
      throw new Error('Init error');
    });

    render(<RazorpayPayment />);

    // Trigger script load
    const script = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    ) as HTMLScriptElement;
    if (script && script.onload) {
      script.onload(new Event('load'));
    }

    await waitFor(() => {
      expect(screen.getByTestId('pay-button')).not.toBeDisabled();
    });

    fireEvent.click(screen.getByTestId('pay-button'));

    expect(alertUtils.error).toHaveBeenCalledWith('Error initializing payment: Init error');

    // Restore
    window.Razorpay = originalRazorpay;
  });
});
