import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useForm, FormProvider } from 'react-hook-form';
import ProductDetailsForm from '@/modules/lead/components/ProductDetailsForm';

/* ------------------------------------------------------------
✅ Mocks
------------------------------------------------------------ */

// Mock MUI hooks
vi.mock('@mui/material/styles', () => ({
  useTheme: () => ({
    breakpoints: {
      down: () => '(max-width:600px)',
    },
  }),
}));

vi.mock('@mui/material/useMediaQuery', () => ({
  __esModule: true,
  default: vi.fn(() => false), // simulate desktop view
}));

// Mock logger
vi.mock('@core/utils/loggerUtils', () => ({
  __esModule: true,
  default: { debug: vi.fn() },
}));

// Mock useLabel hook
vi.mock('@/core/hooks/useLabel', () => ({
  __esModule: true,
  default: vi.fn(() => (key: string) => key),
}));

// Mock Container & Field
vi.mock('@/core/components/Container/CdfContainer', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="cdf-container">{children}</div>
  ),
}));

vi.mock('@/core/components/field/CdfField', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="cdf-field">{children}</div>
  ),
}));

// Mock CDF components
vi.mock('@/core/cdf-components/input/CdfPanCard', () => ({
  __esModule: true,
  default: ({ label }: { label: string }) => (
    <input data-testid={`pancard-${label.trim()}`} placeholder={label} />
  ),
}));

vi.mock('@/core/cdf-components/togglebutton/CdfToggleButton', () => ({
  __esModule: true,
  default: ({ label }: { label: string }) => (
    <div data-testid={`toggle-${label.trim()}`}>{label}</div>
  ),
}));

vi.mock('@/core/cdf-components/input/CdfNumberInput', () => ({
  __esModule: true,
  default: ({ label }: { label: string }) => (
    <input data-testid={`numberinput-${label.trim()}`} placeholder={label} />
  ),
}));

vi.mock('@/core/cdf-components/slider/CdfSlider', () => ({
  __esModule: true,
  default: ({ title }: { title: string }) => (
    <div data-testid={`slider-${title.trim()}`}>{title}</div>
  ),
}));

/* ------------------------------------------------------------
✅ Mock Dropdown Components (Fixed version)
------------------------------------------------------------ */
vi.mock('@/core/components/dropdown', () => ({
  __esModule: true,
  ProductDropdown: ({ label }: { label: string }) => (
    <div data-testid={`dropdown-${label.trim()}`}>{label}</div>
  ),
  BranchDropdown: ({ label }: { label: string }) => (
    <div data-testid={`dropdown-${label.trim()}`}>{label}</div>
  ),
  LoanTypeDropdown: ({ label }: { label: string }) => (
    <div data-testid={`dropdown-${label.trim()}`}>{label}</div>
  ),
  SubLoanTypeDropdown: ({ label }: { label: string }) => (
    <div data-testid={`dropdown-${label.trim()}`}>{label}</div>
  ),
  SourceTypeDropdown: ({ label }: { label: string }) => (
    <div data-testid={`dropdown-${label.trim()}`}>{label}</div>
  ),
  SourceNameDropdown: ({ label }: { label: string }) => (
    <div data-testid={`dropdown-${label.trim()}`}>{label}</div>
  ),
  PropertyTypeDropdown: ({ label }: { label: string }) => (
    <div data-testid={`dropdown-${label.trim()}`}>{label}</div>
  ),
  PropertyUsageDropdown: ({ label }: { label: string }) => (
    <div data-testid={`dropdown-${label.trim()}`}>{label}</div>
  ),
  LoanPurposeDropdown: ({ label }: { label: string }) => (
    <div data-testid={`dropdown-${label.trim()}`}>{label}</div>
  ),
  LanguageDropdown: ({ label }: { label: string }) => (
    <div data-testid={`dropdown-${label.trim()}`}>{label}</div>
  ),
}));

/* ------------------------------------------------------------
✅ Test Wrapper
------------------------------------------------------------ */
const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

/* ------------------------------------------------------------
🧪 Tests
------------------------------------------------------------ */
describe('ProductDetailsForm Component', () => {
  it('renders all form fields correctly', () => {
    render(
      <Wrapper>
        <ProductDetailsForm />
      </Wrapper>
    );

    // Title
    expect(screen.getByText(/appTitle/i)).toBeInTheDocument();

    // Toggle button
    expect(screen.getByTestId('toggle-Customer Type ?')).toBeInTheDocument();

    // PAN card input
    expect(screen.getByTestId('pancard-PAN Number / CKYC ID')).toBeInTheDocument();

    // Dropdowns
    expect(screen.getByTestId('dropdown-Product')).toBeInTheDocument();
    expect(screen.getByTestId('dropdown-branch')).toBeInTheDocument();
    expect(screen.getByTestId('dropdown-Loan Type')).toBeInTheDocument();
    expect(screen.getByTestId('dropdown-Sub-Loan Type')).toBeInTheDocument();
    expect(screen.getByTestId('dropdown-Source Type')).toBeInTheDocument();
    expect(screen.getByTestId('dropdown-Source Name')).toBeInTheDocument();
    expect(screen.getByTestId('dropdown-Property Type')).toBeInTheDocument();
    expect(screen.getByTestId('dropdown-Property Usage')).toBeInTheDocument();
    expect(screen.getByTestId('dropdown-Loan Purpose')).toBeInTheDocument();
    expect(screen.getByTestId('dropdown-Preferred Language')).toBeInTheDocument();

    // Number input
    expect(screen.getByTestId('numberinput-Request Loan Amount')).toBeInTheDocument();

    // Slider
    expect(screen.getByTestId('slider-Request Tenure (in Years)')).toBeInTheDocument();
  });

  it('handles toggle button click gracefully', () => {
    render(
      <Wrapper>
        <ProductDetailsForm />
      </Wrapper>
    );

    const toggle = screen.getByTestId('toggle-Customer Type ?');
    fireEvent.click(toggle);
    expect(toggle).toBeInTheDocument();
  });
});
