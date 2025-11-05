import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SourceTypeDropdown from '@/core/components/dropdown/SourceTypeDropdown';
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
    getSourceType: vi.fn(() => Promise.resolve([])), // ✅ ensure it resolves cleanly
  },
}));

// --- Mock CdfAutoComplete for simpler testing ---
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

describe('SourceTypeDropdown', () => {
  const mockSourceTypes: OptionType[] = [
    { id: '1', label: 'Online' },
    { id: '2', label: 'Offline' },
  ];

  const mockUseMasterDataStore = useMasterDataStore as unknown as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseMasterDataStore.mockReturnValue({ sourceType: mockSourceTypes });
  });

  it('renders with source types from the store', () => {
    render(<SourceTypeDropdown value={mockSourceTypes[0]} handleChange={vi.fn()} />);
    const options = screen.getAllByTestId('option');
    expect(options).toHaveLength(mockSourceTypes.length);
    expect(screen.getByTestId('selected').textContent).toBe(mockSourceTypes[0].label);
  });

  it('calls handleChange when an option is clicked', () => {
    const onChange = vi.fn();
    render(<SourceTypeDropdown value={mockSourceTypes[0]} handleChange={onChange} />);
    const option = screen.getAllByTestId('option')[0];
    fireEvent.click(option);
    expect(onChange).toHaveBeenCalledWith(mockSourceTypes[0]);
  });

  it('calls masterService.getSourceType if store data is empty', async () => {
    mockUseMasterDataStore.mockReturnValue({ sourceType: [] });
    render(<SourceTypeDropdown value={null} handleChange={vi.fn()} />);

    await waitFor(() => {
      expect(masterService.getSourceType).toHaveBeenCalledTimes(1);
    });
  });

  it('does not call masterService.getSourceType if sourceType already exists', async () => {
    mockUseMasterDataStore.mockReturnValue({ sourceType: mockSourceTypes });
    render(<SourceTypeDropdown value={null} handleChange={vi.fn()} />);

    await waitFor(() => {
      expect(masterService.getSourceType).not.toHaveBeenCalled();
    });
  });

  it('renders with correct name prop', () => {
    render(
      <SourceTypeDropdown value={mockSourceTypes[0]} handleChange={vi.fn()} name="sourceType" />
    );
    expect(screen.getByTestId('dropdown-name')).toHaveTextContent('sourceType');
  });
});
