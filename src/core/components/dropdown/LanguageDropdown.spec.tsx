import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LanguageDropdown from '@/core/components/dropdown/LanguageDropdown';
import { useMasterDataStore } from '@core/store';
import { vi, describe, beforeEach, it, expect } from 'vitest';
import { masterService } from '@core/services/masterService';
import type { OptionType } from '@core/types';

// --- Mock the zustand store ---
vi.mock('@core/store', () => ({
  useMasterDataStore: vi.fn(),
}));

// --- Mock service ---
vi.mock('@core/services/masterService', () => ({
  masterService: {
    getLanguages: vi.fn(),
  },
}));

// --- Mock CdfAutoComplete to simplify testing ---
vi.mock('@cdf-components/autocomplete/CdfAutoComplete', () => {
  return {
    default: ({
      options,
      value,
      handleChange,
    }: {
      options: OptionType[];
      value: OptionType | null;
      handleChange: (option: OptionType) => void;
    }) => (
      <div>
        <div data-testid="cdf-autocomplete">
          {options?.map((opt) => (
            <div key={opt.id} data-testid="option" onClick={() => handleChange(opt)}>
              {opt.label}
            </div>
          ))}
        </div>
        <div data-testid="selected">{value ? value.label : 'None'}</div>
      </div>
    ),
  };
});

describe('LanguageDropdown', () => {
  const mockLanguages: OptionType[] = [
    { label: 'English', id: 1 },
    { label: 'Spanish', id: 2 },
  ];

  // Cast to Vitest mock
  const mockUseMasterDataStore = useMasterDataStore as unknown as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render with languages from the store', () => {
    mockUseMasterDataStore.mockReturnValue({ languages: mockLanguages });

    render(<LanguageDropdown value={mockLanguages[0]} handleChange={vi.fn()} />);

    const options = screen.getAllByTestId('option');
    expect(options).toHaveLength(mockLanguages.length);
    expect(screen.getByTestId('selected').textContent).toBe(mockLanguages[0].label);
  });

  it('should call masterService.getLanguages if languages is empty', async () => {
    // Mocking an empty languages array
    mockUseMasterDataStore.mockReturnValue({ languages: [] });

    render(<LanguageDropdown value={null} handleChange={vi.fn()} />);

    // Wait for the effect to trigger and the API call to be made
    await waitFor(() => {
      expect(masterService.getLanguages).toHaveBeenCalled();
    });
  });

  it('should not call masterService.getLanguages if languages already exist', () => {
    // Simulating languages already loaded in store
    mockUseMasterDataStore.mockReturnValue({ languages: mockLanguages });

    render(<LanguageDropdown value={null} handleChange={vi.fn()} />);

    // masterService.getLanguages should not be called as languages are already available in the store
    expect(masterService.getLanguages).not.toHaveBeenCalled();
  });

  it('should handle option click and call handleChange', () => {
    const handleChange = vi.fn();
    mockUseMasterDataStore.mockReturnValue({ languages: mockLanguages });

    render(<LanguageDropdown value={mockLanguages[0]} handleChange={handleChange} />);

    const option = screen.getAllByTestId('option')[1]; // Clicking on the second option (Spanish)
    fireEvent.click(option);

    expect(handleChange).toHaveBeenCalledWith(mockLanguages[1]);
  });
});
