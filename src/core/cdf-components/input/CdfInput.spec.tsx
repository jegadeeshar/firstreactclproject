import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import CdfInput from './CdfInput';

type FormData = {
  inputField: string;
};

// Helper wrapper for react-hook-form
const Wrapper: React.FC<{ children: React.ReactNode; onSubmit?: (data: FormData) => void }> = ({
  children,
  onSubmit,
}) => {
  const methods = useForm({
    defaultValues: { inputField: '' },
    mode: 'onBlur',
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit || (() => {}))}>{children}</form>
    </FormProvider>
  );
};

describe('CdfInput Component', () => {
  it('renders disabled TextField when disabled prop is true', () => {
    render(
      <Wrapper>
        <CdfInput name="inputField" label="Name" value="Test" disabled placeholder="Enter Name" />
      </Wrapper>
    );

    const input = screen.getByPlaceholderText('Enter Name') as HTMLInputElement;
    expect(input).toBeDisabled();
    expect(input.value).toBe('Test');
  });

  it('renders controlled input when not disabled', () => {
    render(
      <Wrapper>
        <CdfInput name="inputField" label="Name" placeholder="Enter Name" />
      </Wrapper>
    );

    const input = screen.getByPlaceholderText('Enter Name') as HTMLInputElement;
    expect(input).not.toBeDisabled();
    expect(input.value).toBe('');
  });

  it('shows required validation error when empty and required', async () => {
    const onSubmit = vi.fn();

    render(
      <Wrapper onSubmit={onSubmit}>
        <CdfInput name="inputField" label="Name" placeholder="Enter Name" required />
        <button type="submit">Submit</button>
      </Wrapper>
    );

    fireEvent.click(screen.getByText('Submit'));

    const error = await screen.findByText(/Name is required/i);
    expect(error).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('shows maxLength validation error when exceeding maxLength', async () => {
    const onSubmit = vi.fn();

    render(
      <Wrapper onSubmit={onSubmit}>
        <CdfInput name="inputField" label="Name" placeholder="Enter Name" maxLength={5} required />
        <button type="submit">Submit</button>
      </Wrapper>
    );

    const input = screen.getByPlaceholderText('Enter Name') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '1234567' } });
    fireEvent.blur(input);

    const error = await screen.findByText(/Max 5 chars/i);
    expect(error).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('merges custom validation rules', async () => {
    const onSubmit = vi.fn();

    render(
      <Wrapper onSubmit={onSubmit}>
        <CdfInput
          name="inputField"
          label="Name"
          placeholder="Enter Name"
          rules={{ minLength: { value: 3, message: 'Min 3 chars' } }}
          required
        />
        <button type="submit">Submit</button>
      </Wrapper>
    );

    const input = screen.getByPlaceholderText('Enter Name') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'A' } });
    fireEvent.click(screen.getByText('Submit'));

    const error = await screen.findByText(/Min 3 chars/i);
    expect(error).toBeInTheDocument();
  });
});
