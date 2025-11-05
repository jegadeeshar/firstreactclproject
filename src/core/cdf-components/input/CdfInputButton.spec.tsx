import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import CdfInputButton from './CdfInputButton';

type FormValues = {
  pancard: string;
};

// Helper wrapper for react-hook-form
const Wrapper: React.FC<{ children: React.ReactNode; onSubmit?: (data: FormValues) => void }> = ({
  children,
  onSubmit,
}) => {
  const methods = useForm<FormValues>({ defaultValues: { pancard: '' }, mode: 'onBlur' });
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit || (() => {}))}>{children}</form>
    </FormProvider>
  );
};

describe('CdfInputButton', () => {
  let handleVerify: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    handleVerify = vi.fn();
  });

  it('renders the input with label and placeholder', () => {
    render(
      <Wrapper>
        <CdfInputButton
          name="pancard"
          label="PAN"
          placeholder="Enter PAN"
          handleVerify={handleVerify}
        />
      </Wrapper>
    );

    expect(screen.getByLabelText('PAN')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter PAN')).toBeInTheDocument();
    expect(screen.getByText('Verify')).toBeInTheDocument();
  });

  it('renders disabled input when disabled prop is true', () => {
    render(
      <Wrapper>
        <CdfInputButton
          name="pancard"
          label="PAN"
          value="ABCDE1234F"
          disabled
          handleVerify={handleVerify}
        />
      </Wrapper>
    );

    const input = screen.getByDisplayValue('ABCDE1234F') as HTMLInputElement;
    expect(input).toBeDisabled();
    expect(screen.queryByText('Verify')).not.toBeInTheDocument();
  });

  it('renders Verified chip when isVerified is true', () => {
    render(
      <Wrapper>
        <CdfInputButton
          name="pancard"
          label="PAN"
          value="ABCDE1234F"
          isVerified
          handleVerify={handleVerify}
        />
      </Wrapper>
    );

    expect(screen.getByText('Verified')).toBeInTheDocument();
    expect(screen.queryByText('Verify')).not.toBeInTheDocument();
  });

  it('shows validation error if required and empty', async () => {
    const onSubmit = vi.fn();

    render(
      <Wrapper onSubmit={onSubmit}>
        <CdfInputButton name="pancard" label="PAN" required handleVerify={handleVerify} />
        <button type="submit">Submit</button>
      </Wrapper>
    );

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText('PAN is required')).toBeInTheDocument();
    });

    expect(onSubmit).not.toHaveBeenCalled();
  });
});
