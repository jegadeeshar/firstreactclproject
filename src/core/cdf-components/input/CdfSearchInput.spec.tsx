import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import userEvent from '@testing-library/user-event';
import CdfSearchInput from './CdfSearchInput';

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('CdfSearchInput', () => {
  it('renders disabled TextField when disabled is true', () => {
    render(
      <Wrapper>
        <CdfSearchInput name="query" disabled value="test" label="Search" onSearch={vi.fn()} />
      </Wrapper>
    );

    const input = screen.getByLabelText('Search') as HTMLInputElement;
    expect(input).toBeDisabled();
    expect(input.value).toBe('test');
  });

  it('calls onSearch when clicking search button', async () => {
    const onSearch = vi.fn();
    render(
      <Wrapper>
        <CdfSearchInput name="query" onSearch={onSearch} />
      </Wrapper>
    );

    const input = screen.getByLabelText('Search') as HTMLInputElement;
    await userEvent.type(input, 'hello');

    const button = screen.getByRole('button', { name: /search/i });
    await userEvent.click(button);

    await waitFor(() => expect(onSearch).toHaveBeenCalledWith('hello'));
  });

  it('calls onSearch when pressing Enter', async () => {
    const onSearch = vi.fn();
    render(
      <Wrapper>
        <CdfSearchInput name="query" onSearch={onSearch} />
      </Wrapper>
    );

    const input = screen.getByLabelText('Search') as HTMLInputElement;
    await userEvent.type(input, 'world{enter}');

    await waitFor(() => expect(onSearch).toHaveBeenCalledWith('world'));
  });

  it('does not call onSearch with empty or whitespace input', async () => {
    const onSearch = vi.fn();
    render(
      <Wrapper>
        <CdfSearchInput name="query" onSearch={onSearch} />
      </Wrapper>
    );

    const input = screen.getByLabelText('Search') as HTMLInputElement;
    await userEvent.type(input, '   ');

    const button = screen.getByRole('button', { name: /search/i });

    // The button should be disabled for empty/whitespace input
    expect(button).toBeDisabled();

    // Try pressing Enter as well (should not trigger search)
    await fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    await waitFor(() => expect(onSearch).not.toHaveBeenCalled());
  });

  // ✅ NEW TEST: shows loading spinner and disables button during search
  it('shows loading spinner and disables button while search is running', async () => {
    const onSearch = vi
      .fn()
      .mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 300)));

    render(
      <Wrapper>
        <CdfSearchInput name="query" onSearch={onSearch} />
      </Wrapper>
    );

    const input = screen.getByLabelText('Search') as HTMLInputElement;
    await userEvent.type(input, 'delayed');

    const button = screen.getByRole('button', { name: /search/i });

    // Trigger search
    await userEvent.click(button);

    // Spinner should appear and button should be disabled
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(button).toBeDisabled();

    // Wait for onSearch to finish
    await waitFor(() => expect(onSearch).toHaveBeenCalledWith('delayed'));

    // Spinner should disappear after completion
    await waitFor(() => expect(screen.queryByRole('progressbar')).not.toBeInTheDocument());
  });
});
