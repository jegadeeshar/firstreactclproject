import { render, screen, fireEvent } from '@testing-library/react';
import PropertyTypeDropdown from '@/core/components/dropdown/PropertyTypeDropdown';
import { useMasterDataStore } from '@core/store';
import type { CustomDropdownPropsType, OptionType } from '@core/types';
import { vi, describe, beforeEach, it, expect } from 'vitest';
import { masterService } from '@core/services/masterService';

// --- Mock Zustand store ---
vi.mock('@core/store', () => ({
  useMasterDataStore: vi.fn(),
}));

// --- Mock service ---
vi.mock('@core/services/masterService', () => ({
  masterService: {
    getPropertyTypes: vi.fn(),
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

describe('PropertyTypeDropdown', () => {
  const mockPropertyTypes: OptionType[] = [
    { id: '1', label: 'Apartment' },
    { id: '2', label: 'Villa' },
  ];

  // cast the mocked store for cleaner re-use
  const mockUseMasterDataStore = useMasterDataStore as unknown as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseMasterDataStore.mockReturnValue({ propertyTypes: mockPropertyTypes });
  });

  it('renders with propertyTypes from the store', () => {
    render(<PropertyTypeDropdown value={mockPropertyTypes[0]} handleChange={vi.fn()} />);
    const options = screen.getAllByTestId('option');
    expect(options).toHaveLength(mockPropertyTypes.length);
    expect(screen.getByTestId('selected').textContent).toBe(mockPropertyTypes[0].label);
  });

  it('calls handleChange when an option is clicked', () => {
    const onChange = vi.fn();
    render(<PropertyTypeDropdown value={mockPropertyTypes[0]} handleChange={onChange} />);
    const option = screen.getAllByTestId('option')[1];
    fireEvent.click(option);
    expect(onChange).toHaveBeenCalledWith(mockPropertyTypes[1]);
  });

  it('calls masterService.getPropertyTypes when store data is empty', () => {
    mockUseMasterDataStore.mockReturnValue({ propertyTypes: [] });
    render(<PropertyTypeDropdown value={null} handleChange={vi.fn()} />);
    expect(masterService.getPropertyTypes).toHaveBeenCalled();
  });

  it('does not call masterService.getPropertyTypes when store has data', () => {
    mockUseMasterDataStore.mockReturnValue({ propertyTypes: mockPropertyTypes });
    render(<PropertyTypeDropdown value={null} handleChange={vi.fn()} />);
    expect(masterService.getPropertyTypes).not.toHaveBeenCalled();
  });
});
