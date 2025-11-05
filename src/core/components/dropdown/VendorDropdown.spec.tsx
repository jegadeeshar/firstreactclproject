import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import VendorDropdown from '@/core/components/dropdown/VendorDropdown';
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
    getVendor: vi.fn(),
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

describe('VendorDropdown', () => {
  const mockVendors: OptionType[] = [
    { id: '1', label: 'Vendor A' },
    { id: '2', label: 'Vendor B' },
  ];

  const mockUseMasterDataStore = useMasterDataStore as unknown as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseMasterDataStore.mockReturnValue({ vendor: mockVendors });
  });

  it('renders with vendors from the store', () => {
    render(<VendorDropdown value={mockVendors[0]} handleChange={vi.fn()} />);
    const options = screen.getAllByTestId('option');
    expect(options).toHaveLength(mockVendors.length);
    expect(screen.getByTestId('selected').textContent).toBe(mockVendors[0].label);
  });

  it('calls onChange when an option is clicked', () => {
    const onChange = vi.fn();
    render(<VendorDropdown value={mockVendors[0]} handleChange={onChange} />);
    const option = screen.getAllByTestId('option')[0];
    fireEvent.click(option);
    expect(onChange).toHaveBeenCalledWith(mockVendors[0]);
  });

  it('calls masterService.getVendor if vendor list is empty', async () => {
    mockUseMasterDataStore.mockReturnValue({ vendor: [] });
    render(<VendorDropdown value={null} handleChange={vi.fn()} />);

    await waitFor(() => {
      expect(masterService.getVendor).toHaveBeenCalledTimes(1);
    });
  });

  it('does not call masterService.getVendor if vendors already exist', async () => {
    mockUseMasterDataStore.mockReturnValue({ vendor: mockVendors });
    render(<VendorDropdown value={null} handleChange={vi.fn()} />);

    await waitFor(() => {
      expect(masterService.getVendor).not.toHaveBeenCalled();
    });
  });

  it('renders with correct name prop', () => {
    render(<VendorDropdown value={mockVendors[0]} handleChange={vi.fn()} name="vendors" />);
    expect(screen.getByTestId('dropdown-name')).toHaveTextContent('vendors');
  });
});
