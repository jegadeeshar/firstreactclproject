import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SourceByDropdown from '@/core/components/dropdown/SourceNameDropdown';
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
    getSourceName: vi.fn(),
  },
}));

// --- Mock CdfAutoComplete for simpler and stable DOM ---
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

describe('SourceByDropdown', () => {
  const mockSourceNames: OptionType[] = [
    { id: '1', label: 'Online' },
    { id: '2', label: 'Offline' },
  ];

  const mockUseMasterDataStore = useMasterDataStore as unknown as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseMasterDataStore.mockReturnValue({ sourceName: mockSourceNames });
  });

  it('renders with options from store', () => {
    render(<SourceByDropdown value={mockSourceNames[0]} handleChange={vi.fn()} />);

    const options = screen.getAllByTestId('option');
    expect(options).toHaveLength(mockSourceNames.length);
    expect(screen.getByTestId('selected')).toHaveTextContent(mockSourceNames[0].label);
  });

  it('calls handleChange when an option is clicked', () => {
    const onChange = vi.fn();
    render(<SourceByDropdown value={mockSourceNames[0]} handleChange={onChange} />);
    const option = screen.getAllByTestId('option')[1];
    fireEvent.click(option);
    expect(onChange).toHaveBeenCalledWith(mockSourceNames[1]);
  });

  it('calls masterService.getSourceName if store data is empty', async () => {
    mockUseMasterDataStore.mockReturnValue({ sourceName: [] });
    render(<SourceByDropdown value={null} handleChange={vi.fn()} />);

    await waitFor(() => {
      expect(masterService.getSourceName).toHaveBeenCalledTimes(1);
    });
  });

  it('does not call masterService.getSourceName if data already exists in store', async () => {
    mockUseMasterDataStore.mockReturnValue({ sourceName: mockSourceNames });
    render(<SourceByDropdown value={null} handleChange={vi.fn()} />);

    await waitFor(() => {
      expect(masterService.getSourceName).not.toHaveBeenCalled();
    });
  });

  it('renders with custom name prop', () => {
    render(
      <SourceByDropdown name="customSource" value={mockSourceNames[0]} handleChange={vi.fn()} />
    );
    expect(screen.getByTestId('dropdown-name')).toHaveTextContent('customSource');
  });

  it('uses default name="sourceBy" when not provided', () => {
    render(<SourceByDropdown value={mockSourceNames[0]} handleChange={vi.fn()} />);
    expect(screen.getByTestId('dropdown-name')).toHaveTextContent('sourceBy');
  });
});
