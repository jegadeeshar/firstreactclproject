import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import CdfAutoComplete from './CdfAutoComplete';
import type { OptionType } from '@/core/types';

const mockOptions: OptionType[] = [
  { id: 1, label: 'loan' },
  { id: 2, label: 'credit-card' },
  { id: 3, label: 'mortgage' },
];

type FormValues = {
  product: OptionType | null;
};

// ✅ Helper component to wrap with react-hook-form
const Wrapper: React.FC<{
  children: React.ReactNode;
  onSubmit?: (data: FormValues) => void;
}> = ({ children, onSubmit }) => {
  const methods = useForm({
    defaultValues: { product: mockOptions[0] },
    mode: 'onBlur',
  });
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit || (() => {}))}>{children}</form>
    </FormProvider>
  );
};

describe('CdfAutoComplete', () => {
  let handleChange: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    handleChange = vi.fn();
  });

  it('renders with label and options', () => {
    render(
      <Wrapper>
        <CdfAutoComplete
          options={mockOptions}
          value={null}
          handleChange={handleChange}
          label="Product Type"
          name="product"
        />
      </Wrapper>
    );

    // label is rendered
    expect(screen.getByLabelText(/Product Type/i)).toBeInTheDocument();
  });

  it('calls handleChange when user selects an option', async () => {
    render(
      <Wrapper>
        <CdfAutoComplete
          options={mockOptions}
          value={null}
          handleChange={handleChange}
          label="Select Product"
          name="product"
        />
      </Wrapper>
    );

    const input = screen.getByLabelText(/Select Product/i);

    // Simulate typing
    fireEvent.change(input, { target: { value: 'Loan' } });

    // Simulate selecting option
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Enter' });

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalled();
    });
  });

  it('submits form successfully when valid selection is made', async () => {
    const onSubmit = vi.fn();

    render(
      <Wrapper onSubmit={onSubmit}>
        <CdfAutoComplete
          name="product"
          options={mockOptions}
          value={mockOptions[0]}
          handleChange={handleChange}
          label="Product"
          required
        />
        <button type="submit">Submit</button>
      </Wrapper>
    );

    // submit with value
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
  });
});
