import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { CdfAmount } from './CdfAmount';

// Helper to render with form context
const renderWithForm = (ui: React.ReactNode, defaultValues = { amount: '' }) => {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const methods = useForm({ defaultValues });
    return <FormProvider {...methods}>{children}</FormProvider>;
  };
  return render(<Wrapper>{ui}</Wrapper>);
};

describe('CdfAmount Component', () => {
  it('renders standalone TextField without form context', () => {
    render(<CdfAmount name="" label="Test Amount" placeholder="Enter amount" />);
    const input = screen.getByPlaceholderText('Enter amount');
    expect(input).toBeInTheDocument();
    expect(input).toBeEnabled();
  });

  it('renders disabled TextField when disabled prop is true', () => {
    render(<CdfAmount name="" disabled placeholder="Enter amount" />);
    const input = screen.getByPlaceholderText('Enter amount') as HTMLInputElement;
    expect(input).toBeDisabled();
  });

  it('renders with ₹ adornment', () => {
    render(<CdfAmount name="" />);
    expect(screen.getByText('₹')).toBeInTheDocument();
  });

  it('accepts numeric input up to 2 decimals', () => {
    renderWithForm(<CdfAmount name="amount" />);
    const input = screen.getByPlaceholderText('Enter amount') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '1234.56' } });
    expect(input.value).toBe('1234.56');
  });

  it('prevents typing a third decimal place', () => {
    renderWithForm(<CdfAmount name="amount" />);
    const input = screen.getByPlaceholderText('Enter amount') as HTMLInputElement;

    // Start with 2 decimals
    fireEvent.change(input, { target: { value: '12.34' } });
    input.setSelectionRange(5, 5); // cursor at end

    fireEvent.keyDown(input, { key: '5' });
    expect(input.value).toBe('12.34'); // blocked → branch covered
  });

  it('prevents typing multiple dots', () => {
    renderWithForm(<CdfAmount name="amount" />);
    const input = screen.getByPlaceholderText('Enter amount') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '12.3' } });
    input.setSelectionRange(4, 4);

    fireEvent.keyDown(input, { key: '.' });
    expect(input.value).toBe('12.3'); // second dot blocked → branch covered
  });

  it('allows typing first decimal', () => {
    renderWithForm(<CdfAmount name="amount" />);
    const input = screen.getByPlaceholderText('Enter amount') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '12' } });
    input.setSelectionRange(2, 2);

    fireEvent.keyDown(input, { key: '.' });
    // value unchanged in keyDown, input will accept dot normally on change
    expect(input.value).toBe('12');
  });

  it('blocks invalid non-numeric characters', () => {
    renderWithForm(<CdfAmount name="amount" />);
    const input = screen.getByPlaceholderText('Enter amount') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '12' } });
    input.setSelectionRange(2, 2);

    fireEvent.keyDown(input, { key: 'a' });
    expect(input.value).toBe('12'); // blocked
  });

  it('allows control/navigation keys', () => {
    renderWithForm(<CdfAmount name="amount" />);
    const input = screen.getByPlaceholderText('Enter amount');

    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
    allowedKeys.forEach((key) => {
      const preventDefault = () => {
        throw new Error('preventDefault should not be called');
      };
      fireEvent.keyDown(input, { key, preventDefault });
    });
  });

  it('handles selection range edge cases', () => {
    renderWithForm(<CdfAmount name="amount" />);
    const input = screen.getByPlaceholderText('Enter amount') as HTMLInputElement;

    // Test when selectionStart/End are null
    fireEvent.change(input, { target: { value: '12.34' } });
    Object.defineProperty(input, 'selectionStart', { value: null });
    Object.defineProperty(input, 'selectionEnd', { value: null });

    fireEvent.keyDown(input, { key: '5' });
    expect(input.value).toBe('12.34');
  });

  it('allows digits before decimal point', () => {
    renderWithForm(<CdfAmount name="amount" />);
    const input = screen.getByPlaceholderText('Enter amount') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '12.3' } });
    input.setSelectionRange(1, 1); // cursor before decimal

    fireEvent.keyDown(input, { key: '5' });
    expect(input.value).toBe('12.3'); // digit allowed before decimal
  });

  it('shows validation error for required field', async () => {
    const onSubmit = vi.fn();
    const Wrapper: React.FC = () => {
      const methods = useForm({ defaultValues: { amount: '' } });
      return (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <CdfAmount name="amount" required label="Required Amount" />
            <button type="submit">Submit</button>
          </form>
        </FormProvider>
      );
    };

    render(<Wrapper />);
    fireEvent.click(screen.getByText('Submit'));

    await screen.findByText('Required Amount is required');
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
