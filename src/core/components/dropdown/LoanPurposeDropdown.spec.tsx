import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoanPurposeDropdown from '@/core/components/dropdown/LoanPurposeDropdown';
import { useMasterDataStore } from '@core/store';
import type { CdfDropdownPropsType, OptionType } from '@core/types';
import { vi, describe, beforeEach, it, expect } from 'vitest';
import { masterService } from '@core/services/masterService';

// --- Mock store ---
vi.mock('@core/store', () => ({
  useMasterDataStore: vi.fn(),
}));

// --- Mock service ---
vi.mock('@core/services/masterService', () => ({
  masterService: {
    getLoanPurpose: vi.fn(),
  },
}));

// --- Mock CdfAutoComplete for simple testing ---
vi.mock('@cdf-components/autocomplete/CdfAutoComplete', () => ({
  default: ({ options, value, handleChange, name }: CdfDropdownPropsType) => (
    <div data-testid="cdf-autocomplete">
      <div data-testid="dropdown-name">{name}</div>
      <div>
        {options.map((opt: OptionType) => (
          <div key={opt.id} data-testid="option" onClick={() => handleChange && handleChange(opt)}>
            {opt.label}
          </div>
        ))}
      </div>
      <div data-testid="selected">{value ? value.label : 'None'}</div>
    </div>
  ),
}));

describe('LoanPurposeDropdown', () => {
  const mockLoanPurposes: OptionType[] = [
    { id: '1', label: 'Home Loan' },
    { id: '2', label: 'Education Loan' },
  ];

  const mockUseMasterDataStore = useMasterDataStore as unknown as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseMasterDataStore.mockReturnValue({ loanPurpose: mockLoanPurposes });
  });

  it('renders with loan purposes from the store', () => {
    render(<LoanPurposeDropdown value={mockLoanPurposes[0]} handleChange={vi.fn()} />);
    const options = screen.getAllByTestId('option');
    expect(options).toHaveLength(mockLoanPurposes.length);
    expect(screen.getByTestId('selected').textContent).toBe(mockLoanPurposes[0].label);
  });

  it('calls onChange when an option is clicked', () => {
    const onChange = vi.fn();
    render(<LoanPurposeDropdown value={mockLoanPurposes[0]} handleChange={onChange} />);
    const option = screen.getAllByTestId('option')[1];
    fireEvent.click(option);
    expect(onChange).toHaveBeenCalledWith(mockLoanPurposes[1]);
  });

  it('calls masterService.getLoanPurpose if loanPurpose list is empty', async () => {
    mockUseMasterDataStore.mockReturnValue({ loanPurpose: [] });
    render(<LoanPurposeDropdown value={null} handleChange={vi.fn()} />);

    await waitFor(() => {
      expect(masterService.getLoanPurpose).toHaveBeenCalledTimes(1);
    });
  });

  it('does not call masterService.getLoanPurpose if loan purposes already exist', async () => {
    mockUseMasterDataStore.mockReturnValue({ loanPurpose: mockLoanPurposes });
    render(<LoanPurposeDropdown value={null} handleChange={vi.fn()} />);

    await waitFor(() => {
      expect(masterService.getLoanPurpose).not.toHaveBeenCalled();
    });
  });

  it('renders with correct name prop', () => {
    render(
      <LoanPurposeDropdown value={mockLoanPurposes[0]} handleChange={vi.fn()} name="loanPurpose" />
    );
    expect(screen.getByTestId('dropdown-name')).toHaveTextContent('loanPurpose');
  });
});
