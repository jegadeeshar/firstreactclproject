import { render, screen, fireEvent } from '@testing-library/react';
import LoanTypeDropdown from '@/core/components/dropdown/LoanTypeDropdown';
import { useMasterDataStore } from '@core/store';
import type { CustomDropdownPropsType, OptionType } from '@core/types';
import { vi, describe, beforeEach, it, expect } from 'vitest';
import { masterService } from '@core/services/masterService';

// --- Mock the zustand store ---
vi.mock('@core/store', () => ({
  useMasterDataStore: vi.fn(),
}));

// --- Mock service ---
vi.mock('@core/services/masterService', () => ({
  masterService: {
    getLoanTypes: vi.fn(),
  },
}));

// --- Mock CdfAutoComplete ---
vi.mock('@cdf-components/autocomplete/CdfAutoComplete', () => {
  return {
    default: ({
      options,
      value,
      handleChange,
    }: CustomDropdownPropsType & { options: OptionType[] }) => (
      <div>
        <div data-testid="cdf-autocomplete">
          {options?.map((opt: OptionType) => (
            <div
              key={opt.id}
              data-testid="option"
              onClick={() => handleChange && handleChange(opt)}
            >
              {opt.label}
            </div>
          ))}
        </div>
        <div data-testid="selected">{value ? value.label : 'None'}</div>
      </div>
    ),
  };
});

describe('LoanTypeDropdown', () => {
  const mockLoanTypes: OptionType[] = [
    { label: 'Home Loan', id: 1 },
    { label: 'Personal Loan', id: 2 },
  ];

  // Cast to Vitest mock
  const mockUseMasterDataStore = useMasterDataStore as unknown as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseMasterDataStore.mockReturnValue({ loanTypes: mockLoanTypes });
  });

  it('renders with loanTypes from the store', () => {
    render(<LoanTypeDropdown value={mockLoanTypes[0]} handleChange={vi.fn()} />);
    const options = screen.getAllByTestId('option');
    expect(options).toHaveLength(mockLoanTypes.length);
    expect(screen.getByTestId('selected').textContent).toBe(mockLoanTypes[0].label);
  });

  it('calls onChange when an option is clicked', () => {
    const onChange = vi.fn();
    render(<LoanTypeDropdown value={mockLoanTypes[0]} handleChange={onChange} />);
    const option = screen.getAllByTestId('option')[0];
    fireEvent.click(option);
    expect(onChange).toHaveBeenCalledWith(mockLoanTypes[0]);
  });

  it('calls masterService.getLoanTypes if loanTypes are empty', () => {
    mockUseMasterDataStore.mockReturnValue({ loanTypes: [] });
    render(<LoanTypeDropdown value={null} handleChange={vi.fn()} />);
    expect(masterService.getLoanTypes).toHaveBeenCalled();
  });

  it('does not call masterService.getLoanTypes if loanTypes already exist', () => {
    mockUseMasterDataStore.mockReturnValue({ loanTypes: mockLoanTypes });
    render(<LoanTypeDropdown value={null} handleChange={vi.fn()} />);
    expect(masterService.getLoanTypes).not.toHaveBeenCalled();
  });
});
