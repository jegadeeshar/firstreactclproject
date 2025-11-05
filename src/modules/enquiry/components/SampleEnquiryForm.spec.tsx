import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import SampleEnquiryForm from '@/modules/enquiry/components/SampleEnquiryForm';
import { useMediaQuery, useTheme } from '@mui/material';
import logger from '@core/utils/loggerUtils';

// ────────────────────────────────────────────────
// Mock external dependencies
// ────────────────────────────────────────────────
vi.mock('@core/utils/loggerUtils', () => ({
  default: { debug: vi.fn() },
}));

vi.mock('@mui/material', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@mui/material')>();
  return {
    ...actual,
    useMediaQuery: vi.fn(),
    useTheme: vi.fn(),
  };
});

vi.mock('@/core/hooks/useLabel', () => ({
  default: vi.fn(() => (key: string) => {
    const labels: Record<string, string> = {
      appTitle: 'This is a Test Form',
      email: 'Email',
      mobile: 'Mobile Number',
      branch: 'Branch',
    };
    return labels[key] ?? key;
  }),
}));

// ────────────────────────────────────────────────
// ✅ Mock the barrel file (index.ts)
// ────────────────────────────────────────────────
vi.mock('@/core/components/dropdown', () => ({
  BranchDropdown: ({ label }: { label: string }) => (
    <div data-testid="branch-dropdown">{label}</div>
  ),
  BankDropdown: ({ label }: { label: string }) => <div data-testid="bank-dropdown">{label}</div>,
  LanguageDropdown: ({ label }: { label: string }) => (
    <div data-testid="language-dropdown">{label}</div>
  ),
  LoanPurposeDropdown: ({ label }: { label: string }) => (
    <div data-testid="loan-purpose-dropdown">{label}</div>
  ),
  LoanTypeDropdown: ({ label }: { label: string }) => (
    <div data-testid="loan-type-dropdown">{label}</div>
  ),
  ProductDropdown: ({ label }: { label: string }) => (
    <div data-testid="product-dropdown">{label}</div>
  ),
  PropertyTypeDropdown: ({ label }: { label: string }) => (
    <div data-testid="property-type-dropdown">{label}</div>
  ),
  SourceNameDropdown: ({ label }: { label: string }) => (
    <div data-testid="source-name-dropdown">{label}</div>
  ),
  TimePeriodDropdown: ({ label }: { label: string }) => (
    <div data-testid="time-period-dropdown">{label}</div>
  ),
  VendorDropdown: ({ label }: { label: string }) => (
    <div data-testid="vendor-dropdown">{label}</div>
  ),
  LoanAmountDropdown: ({ label }: { label: string }) => (
    <div data-testid="loan-amount-dropdown">{label}</div>
  ),
}));

// Mock input components
vi.mock('@cdf-components/input/CdfEmail', () => ({
  default: ({ label }: { label: string }) => <input data-testid="cdf-email" placeholder={label} />,
}));

vi.mock('@cdf-components/input/CdfMobile', () => ({
  default: ({ label }: { label: string }) => <input data-testid="cdf-mobile" placeholder={label} />,
}));

// ────────────────────────────────────────────────
// Tests
// ────────────────────────────────────────────────
describe('SampleEnquiryForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useMediaQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue(false);
    (useTheme as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      breakpoints: { down: vi.fn(() => '(max-width:600px)') },
    });
  });

  it('renders form fields with correct labels', () => {
    render(<SampleEnquiryForm />);

    expect(screen.getByText('This is a Test Form')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Mobile Number')).toBeInTheDocument();
    expect(screen.getByText('Branch')).toBeInTheDocument();
    expect(screen.getByTestId('bank-dropdown')).toBeInTheDocument();
    expect(screen.getByTestId('language-dropdown')).toBeInTheDocument();
  });

  it('logs mobile view state using logger.debug', () => {
    (useMediaQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue(true);
    render(<SampleEnquiryForm />);
    expect(logger.debug).toHaveBeenCalledWith('Is Mobile View: ', true);
  });
});
