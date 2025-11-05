import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BankDropdown from '@/core/components/dropdown/BankDropdown';
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
    getBank: vi.fn(),
  },
}));

// --- Mock CdfAutoComplete for easier testing ---
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

describe('BankDropdown', () => {
  const mockBanks: OptionType[] = [
    { id: '1', label: 'Bank A' },
    { id: '2', label: 'Bank B' },
  ];

  const mockUseMasterDataStore = useMasterDataStore as unknown as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseMasterDataStore.mockReturnValue({ bank: mockBanks });
  });

  it('renders with banks from the store', () => {
    render(<BankDropdown value={mockBanks[0]} handleChange={vi.fn()} />);
    const options = screen.getAllByTestId('option');
    expect(options).toHaveLength(mockBanks.length);
    expect(screen.getByTestId('selected').textContent).toBe(mockBanks[0].label);
  });

  it('calls onChange when an option is clicked', () => {
    const onChange = vi.fn();
    render(<BankDropdown value={mockBanks[0]} handleChange={onChange} />);
    const option = screen.getAllByTestId('option')[0];
    fireEvent.click(option);
    expect(onChange).toHaveBeenCalledWith(mockBanks[0]);
  });

  it('calls masterService.getBank if bank list is empty', async () => {
    mockUseMasterDataStore.mockReturnValue({ bank: [] });
    render(<BankDropdown value={null} handleChange={vi.fn()} />);

    await waitFor(() => {
      expect(masterService.getBank).toHaveBeenCalledTimes(1);
    });
  });

  it('does not call masterService.getBank if banks already exist', async () => {
    mockUseMasterDataStore.mockReturnValue({ bank: mockBanks });
    render(<BankDropdown value={null} handleChange={vi.fn()} />);

    await waitFor(() => {
      expect(masterService.getBank).not.toHaveBeenCalled();
    });
  });

  it('renders with correct name prop', () => {
    render(<BankDropdown value={mockBanks[0]} handleChange={vi.fn()} name="bank" />);
    expect(screen.getByTestId('dropdown-name')).toHaveTextContent('bank');
  });
});
