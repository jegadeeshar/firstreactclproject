import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SubLoanTypeDropdown from '@/core/components/dropdown/SubLoanTypeDropdown';
import { useMasterDataStore } from '@core/store';
import { masterService } from '@core/services/masterService';
import { vi, describe, beforeEach, it, expect } from 'vitest';
import type { CdfDropdownPropsType, OptionType } from '@core/types';

// --- Mock store ---
vi.mock('@core/store', () => ({
  useMasterDataStore: vi.fn(),
}));

// --- Mock service ---
vi.mock('@core/services/masterService', () => ({
  masterService: {
    getSubLoanType: vi.fn(),
  },
}));

// --- Mock CdfAutoComplete ---
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

describe('SubLoanTypeDropdown', () => {
  const mockSubLoanTypes: OptionType[] = [
    { id: '1', label: 'SubLoan Type A' },
    { id: '2', label: 'SubLoan Type B' },
  ];

  const mockUseMasterDataStore = useMasterDataStore as unknown as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseMasterDataStore.mockReturnValue({ subLoanType: mockSubLoanTypes });
  });

  it('renders with sub-loan types from store', () => {
    render(<SubLoanTypeDropdown value={mockSubLoanTypes[0]} handleChange={vi.fn()} />);
    const options = screen.getAllByTestId('option');
    expect(options).toHaveLength(mockSubLoanTypes.length);
    expect(screen.getByTestId('selected')).toHaveTextContent(mockSubLoanTypes[0].label);
  });

  it('calls handleChange when an option is clicked', () => {
    const onChange = vi.fn();
    render(<SubLoanTypeDropdown value={mockSubLoanTypes[0]} handleChange={onChange} />);
    const option = screen.getAllByTestId('option')[1];
    fireEvent.click(option);
    expect(onChange).toHaveBeenCalledWith(mockSubLoanTypes[1]);
  });

  it('calls masterService.getSubLoanType if store is empty', async () => {
    mockUseMasterDataStore.mockReturnValue({ subLoanType: [] });
    render(<SubLoanTypeDropdown value={null} handleChange={vi.fn()} />);

    await waitFor(() => {
      expect(masterService.getSubLoanType).toHaveBeenCalledTimes(1);
    });
  });

  it('does not call masterService.getSubLoanType if store already has data', async () => {
    mockUseMasterDataStore.mockReturnValue({ subLoanType: mockSubLoanTypes });
    render(<SubLoanTypeDropdown value={null} handleChange={vi.fn()} />);

    await waitFor(() => {
      expect(masterService.getSubLoanType).not.toHaveBeenCalled();
    });
  });

  it('renders with correct name prop', () => {
    render(
      <SubLoanTypeDropdown
        name="subloanTypeField"
        value={mockSubLoanTypes[0]}
        handleChange={vi.fn()}
      />
    );
    expect(screen.getByTestId('dropdown-name')).toHaveTextContent('subloanTypeField');
  });

  it('uses default name if not provided', () => {
    render(<SubLoanTypeDropdown value={mockSubLoanTypes[0]} handleChange={vi.fn()} />);
    expect(screen.getByTestId('dropdown-name')).toHaveTextContent('subloanType');
  });
});
