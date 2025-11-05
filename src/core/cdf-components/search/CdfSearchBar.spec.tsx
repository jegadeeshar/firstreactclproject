import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CdfSearchBar from './CdfSearchBar';

describe('CdfSearchBar Component', () => {
  const onSearch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with default placeholder', () => {
    render(<CdfSearchBar onSearch={onSearch} />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    render(<CdfSearchBar placeholder="Find items" onSearch={onSearch} />);
    expect(screen.getByPlaceholderText('Find items')).toBeInTheDocument();
  });

  it('calls onSearch when typing', () => {
    render(<CdfSearchBar onSearch={onSearch} />);
    const input = screen.getByRole('textbox', { name: /search-input/i });

    fireEvent.change(input, { target: { value: 'test' } });
    expect(onSearch).toHaveBeenCalledWith('test');
  });

  it('clears value when clear icon clicked', () => {
    render(<CdfSearchBar onSearch={onSearch} />);
    const input = screen.getByRole('textbox', { name: /search-input/i });

    fireEvent.change(input, { target: { value: 'data' } });
    const clearBtn = screen.getByTestId('clearIcon');
    fireEvent.click(clearBtn);

    expect(onSearch).toHaveBeenCalledWith('');
  });

  it('disables input and clear icon when disabled', () => {
    render(<CdfSearchBar disabled onSearch={onSearch} />);
    const input = screen.getByRole('textbox', { name: /search-input/i });

    expect(input).toBeDisabled();
  });

  it('renders with controlled value', () => {
    const { rerender } = render(<CdfSearchBar value="Controlled" onSearch={onSearch} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('Controlled');

    // change prop value
    rerender(<CdfSearchBar value="Updated" onSearch={onSearch} />);
    expect(screen.getByRole('textbox')).toHaveValue('Updated');
  });
});
