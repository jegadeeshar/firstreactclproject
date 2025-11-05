import { render, screen, fireEvent } from '@testing-library/react';
import ProductDropdown from '@/core/components/dropdown/ProductDropdown';
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
    getProducts: vi.fn(),
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

describe('ProductDropdown', () => {
  const mockProducts: OptionType[] = [
    { label: 'Product A', id: 1 },
    { label: 'Product B', id: 2 },
  ];

  // Cast to Vitest mock
  const mockUseMasterDataStore = useMasterDataStore as unknown as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseMasterDataStore.mockReturnValue({ products: mockProducts });
  });

  it('renders with products from the store', () => {
    render(<ProductDropdown value={mockProducts[0]} handleChange={vi.fn()} />);
    const options = screen.getAllByTestId('option');
    expect(options).toHaveLength(mockProducts.length);
    expect(screen.getByTestId('selected').textContent).toBe(mockProducts[0].label);
  });

  it('calls onChange when an option is clicked', () => {
    const onChange = vi.fn();
    render(<ProductDropdown value={mockProducts[0]} handleChange={onChange} />);
    const option = screen.getAllByTestId('option')[0];
    fireEvent.click(option);
    expect(onChange).toHaveBeenCalledWith(mockProducts[0]);
  });

  it('calls masterService.getProducts if products are empty', () => {
    mockUseMasterDataStore.mockReturnValue({ products: [] });
    render(<ProductDropdown value={null} handleChange={vi.fn()} />);
    expect(masterService.getProducts).toHaveBeenCalled();
  });

  it('does not call masterService.getProducts if products already exist', () => {
    mockUseMasterDataStore.mockReturnValue({ products: mockProducts });
    render(<ProductDropdown value={null} handleChange={vi.fn()} />);
    expect(masterService.getProducts).not.toHaveBeenCalled();
  });
});
