import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { describe, it, expect, vi } from 'vitest';
import CdfCheckbox from './CdfCheckbox';

describe('CdfCheckbox Component', () => {
  const setupWithForm = (props = {}) => {
    const Wrapper: React.FC = () => {
      const methods = useForm({
        defaultValues: { acceptTerms: false },
      });
      return (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(vi.fn())}>
            <CdfCheckbox name="acceptTerms" label="Accept Terms" {...props} />
          </form>
        </FormProvider>
      );
    };
    return render(<Wrapper />);
  };

  const setupWithoutForm = (props = {}) =>
    render(<CdfCheckbox name="test" label="NoForm" {...props} />);

  it('renders label correctly', () => {
    setupWithForm();
    const checkbox = screen.getByRole('checkbox', { name: /Accept Terms/i });
    expect(checkbox).toBeInTheDocument();
  });

  it('toggles checkbox value (without form context)', () => {
    const handleChange = vi.fn();
    setupWithoutForm({ onChange: handleChange });

    const checkbox = screen.getByRole('checkbox', { name: /NoForm/i }) as HTMLInputElement;
    expect(checkbox.checked).toBe(false);

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('shows validation error when required and unchecked (no form context)', () => {
    setupWithoutForm({ required: true, label: 'Agree to terms' });

    // Should immediately show required message when unchecked
    const errorText = screen.getByText('Agree to terms is required');
    expect(errorText).toBeInTheDocument();

    const checkbox = screen.getByRole('checkbox', { name: /Agree to terms/i }) as HTMLInputElement;
    expect(checkbox.checked).toBe(false);

    // Once checked, the error should disappear
    fireEvent.click(checkbox);
    expect(screen.queryByText('Agree to terms is required')).not.toBeInTheDocument();
  });

  it('updates value correctly with react-hook-form', async () => {
    setupWithForm();

    const checkbox = screen.getByRole('checkbox', { name: /Accept Terms/i }) as HTMLInputElement;
    expect(checkbox.checked).toBe(false);

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });

  it('disables checkbox when disabled prop is true', () => {
    setupWithoutForm({ disabled: true });

    const checkbox = screen.getByRole('checkbox', { name: /NoForm/i }) as HTMLInputElement;
    expect(checkbox.disabled).toBe(true);
  });

  it('respects checked prop on initial render', () => {
    setupWithoutForm({ checked: true });

    const checkbox = screen.getByRole('checkbox', { name: /NoForm/i }) as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it('calls onChange callback in react-hook-form mode', () => {
    const handleChange = vi.fn();
    setupWithForm({ onChange: handleChange });

    const checkbox = screen.getByRole('checkbox', { name: /Accept Terms/i }) as HTMLInputElement;
    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledWith(expect.any(Object), true);
  });
});
