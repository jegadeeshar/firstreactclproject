import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import CdfNumberInput from './CdfNumberInput';

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const methods = useForm({
    defaultValues: { amount: '' },
    mode: 'onBlur', // triggers validation on blur
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('CdfNumberInput Component', () => {
  it('renders without crashing', () => {
    render(
      <Wrapper>
        <CdfNumberInput name="amount" label="Amount" />
      </Wrapper>
    );
    expect(screen.getByLabelText('Amount')).toBeInTheDocument();
  });

  it('updates value correctly on change', () => {
    render(
      <Wrapper>
        <CdfNumberInput name="amount" label="Amount" />
      </Wrapper>
    );
    const input = screen.getByLabelText('Amount') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '42' } });
    expect(input.value).toBe('42');
  });

  it('shows min and max validation errors', async () => {
    render(
      <Wrapper>
        <CdfNumberInput name="amount" label="Amount" min={10} max={100} />
        <button type="submit">Submit</button>
      </Wrapper>
    );

    const input = screen.getByLabelText('Amount');
    fireEvent.change(input, { target: { value: '5' } });
    fireEvent.blur(input);

    await waitFor(() => {
      const helperText = screen.getByText((content) => content.includes('Value must be ≥ 10'));
      expect(helperText).toBeInTheDocument();
    });
  });

  it('works without FormProvider', () => {
    render(<CdfNumberInput name="amount" label="Amount" value="50" />);
    const input = screen.getByLabelText('Amount') as HTMLInputElement;
    expect(input.value).toBe('50');
  });
});
