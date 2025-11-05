import { render, screen, fireEvent } from '@testing-library/react';
import TimePeriodDropdown from '@/core/components/dropdown/TimePeriodDropdown';
import type { CdfDropdownPropsType, OptionType } from '@core/types';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { MASTER_MOCK_DATA } from '@/core/constants';

// --- Mock CdfAutoComplete for testing ---
vi.mock('@cdf-components/autocomplete/CdfAutoComplete', () => ({
  default: ({ options, value, handleChange, name }: CdfDropdownPropsType) => (
    <div data-testid="cdf-autocomplete">
      <div data-testid="dropdown-name">{name}</div>
      <div>
        {options.map((opt: OptionType) => (
          <div key={opt.id} data-testid="option" onClick={() => handleChange?.(opt)}>
            {opt.label}
          </div>
        ))}
      </div>
      <div data-testid="selected">{value ? value.label : 'None'}</div>
    </div>
  ),
}));

// --- Tests ---
describe('TimePeriodDropdown', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with provided options and selected value', () => {
    render(<TimePeriodDropdown value={MASTER_MOCK_DATA.TIME_PERIOD[0]} handleChange={vi.fn()} />);
    const options = screen.getAllByTestId('option');
    expect(options).toHaveLength(MASTER_MOCK_DATA.TIME_PERIOD.length);
    expect(screen.getByTestId('selected')).toHaveTextContent(MASTER_MOCK_DATA.TIME_PERIOD[0].label);
  });

  it('calls handleChange when an option is clicked', () => {
    const handleChange = vi.fn();
    render(
      <TimePeriodDropdown value={MASTER_MOCK_DATA.TIME_PERIOD[0]} handleChange={handleChange} />
    );
    fireEvent.click(screen.getAllByTestId('option')[1]);
    expect(handleChange).toHaveBeenCalledWith(MASTER_MOCK_DATA.TIME_PERIOD[1]);
  });
});
