import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PropertyUsageDropdown from '@/core/components/dropdown/PropertyUsageDropdown';
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
    getPropertyUsage: vi.fn(),
  },
}));

// --- Mock CdfAutoComplete for stable DOM testing ---
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

describe('PropertyUsageDropdown', () => {
  const mockPropertyUsage: OptionType[] = [
    { id: '1', label: 'Residential' },
    { id: '2', label: 'Commercial' },
  ];

  const mockUseMasterDataStore = useMasterDataStore as unknown as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseMasterDataStore.mockReturnValue({ propertyUsage: mockPropertyUsage });
  });

  it('renders with property usage options from store', () => {
    render(<PropertyUsageDropdown value={mockPropertyUsage[0]} handleChange={vi.fn()} />);
    const options = screen.getAllByTestId('option');
    expect(options).toHaveLength(mockPropertyUsage.length);
    expect(screen.getByTestId('selected')).toHaveTextContent(mockPropertyUsage[0].label);
  });

  it('calls handleChange when an option is clicked', () => {
    const onChange = vi.fn();
    render(<PropertyUsageDropdown value={mockPropertyUsage[0]} handleChange={onChange} />);
    const option = screen.getAllByTestId('option')[1];
    fireEvent.click(option);
    expect(onChange).toHaveBeenCalledWith(mockPropertyUsage[1]);
  });

  it('calls masterService.getPropertyUsage if store is empty', async () => {
    mockUseMasterDataStore.mockReturnValue({ propertyUsage: [] });
    render(<PropertyUsageDropdown value={null} handleChange={vi.fn()} />);

    await waitFor(() => {
      expect(masterService.getPropertyUsage).toHaveBeenCalledTimes(1);
    });
  });

  it('does not call masterService.getPropertyUsage if store already has data', async () => {
    mockUseMasterDataStore.mockReturnValue({ propertyUsage: mockPropertyUsage });
    render(<PropertyUsageDropdown value={null} handleChange={vi.fn()} />);

    await waitFor(() => {
      expect(masterService.getPropertyUsage).not.toHaveBeenCalled();
    });
  });

  it('renders with correct name prop', () => {
    render(
      <PropertyUsageDropdown
        name="customPropertyUsage"
        value={mockPropertyUsage[0]}
        handleChange={vi.fn()}
      />
    );
    expect(screen.getByTestId('dropdown-name')).toHaveTextContent('customPropertyUsage');
  });

  it('uses default name if not provided', () => {
    render(<PropertyUsageDropdown value={mockPropertyUsage[0]} handleChange={vi.fn()} />);
    expect(screen.getByTestId('dropdown-name')).toHaveTextContent('propertyUsage');
  });
});
