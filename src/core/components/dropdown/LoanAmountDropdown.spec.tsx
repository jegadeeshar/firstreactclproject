import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import LoanAmountDropdown from './LoanAmountDropdown';
import type { FC } from 'react';

// --------------------
// Mock CdfAutoComplete
// --------------------
interface Option {
  id: string;
  label: string;
}

interface MockProps {
  name?: string;
  options?: Option[];
}

vi.mock('@cdf-components/autocomplete/CdfAutoComplete', () => ({
  default: (({ name, options }: MockProps) => (
    <div data-testid="cdf-autocomplete">
      <div data-testid="dropdown-name">{name}</div>
      <div data-testid="options">
        {options?.length ? options.map((opt) => <div key={opt.id}>{opt.label}</div>) : 'No options'}
      </div>
    </div>
  )) as FC<MockProps>,
}));

// --------------------
// Mock MASTER_MOCK_DATA constant
// --------------------
vi.mock('@/core/constants', () => ({
  MASTER_MOCK_DATA: {
    LOAN_AMOUNTS: [
      { id: '1', label: '₹5,00,000' },
      { id: '2', label: '₹10,00,000' },
      { id: '3', label: '₹20,00,000' },
    ],
  },
}));

// --------------------
// Tests
// --------------------
describe('LoanAmountDropdown', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders dropdown with default name and mock loan amount options', () => {
    render(<LoanAmountDropdown handleChange={vi.fn()} />);

    expect(screen.getByTestId('dropdown-name')).toHaveTextContent('loanAmount');
    expect(screen.getByText('₹5,00,000')).toBeInTheDocument();
    expect(screen.getByText('₹10,00,000')).toBeInTheDocument();
    expect(screen.getByText('₹20,00,000')).toBeInTheDocument();
  });

  it('uses custom name prop when provided', () => {
    render(<LoanAmountDropdown name="customLoanAmount" handleChange={vi.fn()} />);
    expect(screen.getByTestId('dropdown-name')).toHaveTextContent('customLoanAmount');
  });
});
