import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import CdfEmail from './CdfEmail';

type FormData = {
  email: string;
};

// Helper wrapper to provide react-hook-form context
const Wrapper: React.FC<{ children: React.ReactNode; onSubmit?: (data: FormData) => void }> = ({
  children,
  onSubmit,
}) => {
  const methods = useForm({
    defaultValues: { email: '' },
    mode: 'onBlur',
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit || (() => {}))}>{children}</form>
    </FormProvider>
  );
};

describe('CdfEmail Component', () => {
  it('renders a disabled TextField when disabled prop is true', () => {
    render(
      <Wrapper>
        <CdfEmail name="email" disabled placeholder="Enter email" />
      </Wrapper>
    );

    const input = screen.getByPlaceholderText('Enter email') as HTMLInputElement;
    expect(input).toBeDisabled();
  });

  it('renders a controlled input when inside a form context', () => {
    render(
      <Wrapper>
        <CdfEmail name="email" placeholder="Enter email" />
      </Wrapper>
    );

    const input = screen.getByPlaceholderText('Enter email') as HTMLInputElement;
    expect(input).not.toBeDisabled();
    expect(input.value).toBe('');
  });

  it('renders an uncontrolled TextField when no form context is provided', () => {
    render(<CdfEmail name="email" placeholder="Enter email" />);
    const input = screen.getByPlaceholderText('Enter email') as HTMLInputElement;

    expect(input).toBeInTheDocument();
    expect(input).not.toBeDisabled();

    // Since it's uncontrolled, changing value should update input directly
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    expect(input.value).toBe('test@example.com');
  });

  it('shows required validation error when field is empty and required', async () => {
    const onSubmit = vi.fn();

    render(
      <Wrapper onSubmit={onSubmit}>
        <CdfEmail name="email" placeholder="Enter email" required />
        <button type="submit">Submit</button>
      </Wrapper>
    );

    fireEvent.click(screen.getByText('Submit'));

    const error = await screen.findByText(/Email ID is required/i);
    expect(error).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('shows pattern validation error for invalid email', async () => {
    const onSubmit = vi.fn();

    render(
      <Wrapper onSubmit={onSubmit}>
        <CdfEmail name="email" placeholder="Enter email" required />
        <button type="submit">Submit</button>
      </Wrapper>
    );

    const input = screen.getByPlaceholderText('Enter email') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'invalid-email' } });
    fireEvent.blur(input);

    const error = await screen.findByText(/Invalid email format/i);
    expect(error).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('allows custom validation rules to override defaults', async () => {
    const customRules = { maxLength: { value: 5, message: 'Max length 5' } };

    render(
      <Wrapper>
        <CdfEmail name="email" placeholder="Enter email" rules={customRules} />
      </Wrapper>
    );

    const input = screen.getByPlaceholderText('Enter email') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'toolong@example.com' } });
    fireEvent.blur(input);

    const error = await screen.findByText(/Max length 5/i);
    expect(error).toBeInTheDocument();
  });
});
