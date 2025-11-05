import { render, screen, fireEvent } from '@testing-library/react';
import BranchDropdown from '@/core/components/dropdown/BranchDropdown';
import { useMasterDataStore } from '@core/store';
import type { BranchType, CdfDropdownPropsType, OptionType } from '@core/types';
import { vi, describe, beforeEach, it, expect } from 'vitest';
import { masterService } from '@core/services/masterService';

// Mock the zustand store
vi.mock('@/store', () => ({
  useMasterDataStore: vi.fn(),
}));

// Mock the store
vi.mock('@core/store', () => {
  return {
    useMasterDataStore: vi.fn(),
  };
});

// Mock service
vi.mock('@core/services/masterService', () => ({
  masterService: {
    getBranches: vi.fn(),
  },
}));

// Mock CdfAutoComplete to simplify testing
vi.mock('@cdf-components/autocomplete/CdfAutoComplete', () => {
  return {
    default: ({ options, value, handleChange }: CdfDropdownPropsType) => (
      <div>
        <div data-testid="cdf-autocomplete">
          {options.map((opt: OptionType) => (
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

describe('BranchDropdown', () => {
  const mockBranches: BranchType[] = [
    {
      branchId: '1',
      branchDesc: 'KALYANI VF',
    },
  ];

  const mockOption: OptionType[] = mockBranches.map((branch) => ({
    id: branch.branchId,
    label: branch.branchDesc,
  }));

  // Cast to Vitest mock
  const mockUseMasterDataStore = useMasterDataStore as unknown as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseMasterDataStore.mockReturnValue({ branches: mockBranches });
  });

  it('renders with branches from the store', () => {
    render(<BranchDropdown value={mockOption[0]} handleChange={vi.fn()} />);
    const options = screen.getAllByTestId('option');
    expect(options).toHaveLength(mockBranches.length);
    expect(screen.getByTestId('selected').textContent).toBe(mockBranches[0].branchDesc);
  });

  it('calls onChange when an option is clicked', () => {
    const onChange = vi.fn();
    render(<BranchDropdown value={mockOption[0]} handleChange={onChange} />);
    const option = screen.getAllByTestId('option')[0];
    fireEvent.click(option);
    expect(onChange).toHaveBeenCalledWith(mockOption[0]);
  });

  it('calls masterService.fetchMasterData if branches are empty', () => {
    // Return empty branches
    mockUseMasterDataStore.mockReturnValue({ branches: [] });

    render(<BranchDropdown value={null} handleChange={vi.fn()} />);
    expect(masterService.getBranches).toHaveBeenCalled();
  });

  it('does not call masterService.fetchMasterData if branches already exist', () => {
    mockUseMasterDataStore.mockReturnValue({ branches: mockBranches });

    render(<BranchDropdown value={null} handleChange={vi.fn()} />);
    expect(masterService.getBranches).not.toHaveBeenCalled();
  });
});
