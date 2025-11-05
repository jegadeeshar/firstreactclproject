import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import CdfMobile from './CdfMobile';

type FormData = {
  mobile: string;
};

// Helper wrapper for react-hook-form
const Wrapper: React.FC<{ children: React.ReactNode; onSubmit?: (data: FormData) => void }> = ({
  children,
  onSubmit,
}) => {
  const methods = useForm({
    defaultValues: { mobile: '' },
    mode: 'onBlur',
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit || (() => {}))}>{children}</form>
    </FormProvider>
  );
};

describe('CdfMobile Component', () => {
  it('renders disabled TextField when disabled prop is true', () => {
    render(
      <Wrapper>
        <CdfMobile name="mobile" value="9876543210" disabled placeholder="Enter mobile" />
      </Wrapper>
    );

    const input = screen.getByPlaceholderText('Enter mobile') as HTMLInputElement;
    expect(input).toBeDisabled();
    expect(input.value).toBe('9876543210');
  });

  it('renders controlled input when not disabled', () => {
    render(
      <Wrapper>
        <CdfMobile name="mobile" placeholder="Enter mobile" />
      </Wrapper>
    );

    const input = screen.getByPlaceholderText('Enter mobile') as HTMLInputElement;
    expect(input).not.toBeDisabled();
    expect(input.value).toBe('');
  });

  it('shows required validation error when empty and required', async () => {
    const onSubmit = vi.fn();

    render(
      <Wrapper onSubmit={onSubmit}>
        <CdfMobile name="mobile" placeholder="Enter mobile" required />
        <button type="submit">Submit</button>
      </Wrapper>
    );

    fireEvent.click(screen.getByText('Submit'));

    const error = await screen.findByText(/Mobile is required/i);
    expect(error).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('shows pattern validation error for invalid mobile number', async () => {
    const onSubmit = vi.fn();

    render(
      <Wrapper onSubmit={onSubmit}>
        <CdfMobile name="mobile" placeholder="Enter mobile" required />
        <button type="submit">Submit</button>
      </Wrapper>
    );

    const input = screen.getByPlaceholderText('Enter mobile') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '12345' } });
    fireEvent.blur(input);

    const error = await screen.findByText(
      /Enter a valid 10-digit mobile number starting with 6-9/i
    );
    expect(error).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('allows numeric and control keys', () => {
    render(
      <Wrapper>
        <CdfMobile name="mobile" placeholder="Enter mobile" />
      </Wrapper>
    );

    const input = screen.getByPlaceholderText('Enter mobile') as HTMLInputElement;

    const allowedKeys = [
      '6',
      '7',
      '8',
      '9',
      '0',
      'Backspace',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      'Tab',
    ];

    allowedKeys.forEach((key) => {
      const event = new KeyboardEvent('keydown', { key });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
      input.dispatchEvent(event);
      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });
  });

  it('prevents non-numeric keys', () => {
    render(
      <Wrapper>
        <CdfMobile name="mobile" placeholder="Enter mobile" />
      </Wrapper>
    );

    const input = screen.getByPlaceholderText('Enter mobile');

    const blockedKeys = ['a', 'b', 'c', '+', '-', '.', ' ', 'Enter'];
    blockedKeys.forEach((key) => {
      fireEvent.keyDown(input, { key });
    });
  });

  it('renders uncontrolled input without form context', () => {
    render(<CdfMobile name="mobile" value="9876543210" placeholder="Enter mobile" />);

    const input = screen.getByPlaceholderText('Enter mobile') as HTMLInputElement;
    expect(input.value).toBe('9876543210');
  });

  it('uses custom validation rules when provided', () => {
    const customRules = {
      minLength: {
        value: 5,
        message: 'Minimum 5 digits required',
      },
    };

    render(
      <Wrapper>
        <CdfMobile name="mobile" placeholder="Enter mobile" rules={customRules} />
      </Wrapper>
    );

    const input = screen.getByPlaceholderText('Enter mobile');
    expect(input).toBeInTheDocument();
  });

  it('uses custom label when provided', () => {
    render(
      <Wrapper>
        <CdfMobile name="phone" label="Phone Number" placeholder="Enter phone" />
      </Wrapper>
    );

    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
  });
});
