import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import CdfToggleButton from './CdfToggleButton';
import { ToggleButtonVariantType } from '@/core/types';

// ✅ Proper mock setup
const mockFn =
  vi.fn<(event: React.MouseEvent<HTMLElement>, value: string | number | boolean) => void>();

const spyWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});

describe('CdfToggleButton Component', () => {
  const options = [
    { title: 'Option A', value: 'A' },
    { title: 'Option B', value: 'B' },
  ];

  it('renders standalone mode without form context', () => {
    render(
      <CdfToggleButton
        name="toggle"
        label="Select Option"
        options={options}
        value="A"
        onChange={mockFn} // ✅ pass function, not call it
      />
    );

    expect(screen.getByText('Select Option')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Option B'));
    expect(mockFn).toHaveBeenCalled();
  });

  it('renders inside FormProvider and handles controlled change', async () => {
    const ControlledWrapper = () => {
      const methods = useForm({ defaultValues: { toggle: 'A' } });
      return (
        <FormProvider {...methods}>
          <CdfToggleButton name="toggle" label="Controlled" options={options} onChange={mockFn} />
        </FormProvider>
      );
    };

    render(<ControlledWrapper />);

    fireEvent.click(screen.getByText('Option B'));
    expect(mockFn).toHaveBeenCalled();
  });

  it('shows validation error when required validation fails', async () => {
    const handleSubmitMock = vi.fn();

    const Wrapper = () => {
      const methods = useForm({ defaultValues: { toggle: '' }, mode: 'onSubmit' });
      return (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmitMock)} role="form">
            <CdfToggleButton name="toggle" label="Choice" required options={options} />
          </form>
        </FormProvider>
      );
    };

    render(<Wrapper />);

    await act(async () => {
      fireEvent.submit(screen.getByRole('form'));
    });

    expect(screen.getByText(/Choice is required/i)).toBeInTheDocument();
  });

  it('renders disabled toggle buttons', () => {
    render(
      <CdfToggleButton
        name="toggle"
        label="Disabled"
        disabled
        options={[{ title: 'Only', value: 'one' }]}
      />
    );

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('uses first option as default when no value is provided', () => {
    const Wrapper = () => {
      const methods = useForm();
      return (
        <FormProvider {...methods}>
          <CdfToggleButton name="toggle" options={options} />
        </FormProvider>
      );
    };

    render(<Wrapper />);
    expect(screen.getByText('Option A')).toBeInTheDocument();
  });

  it('renders correctly with pill variant', () => {
    render(
      <CdfToggleButton
        name="toggle"
        label="Shape"
        variant={ToggleButtonVariantType.PILL}
        options={[{ title: 'Round', value: 'round' }]}
      />
    );

    expect(screen.getByText('Round')).toHaveClass('pill');
  });

  it('renders correctly when label is not provided', () => {
    render(<CdfToggleButton name="toggle" options={[{ title: 'Option A', value: 'A' }]} />);
    // Label not provided, so ensure no stray label is rendered
    expect(screen.queryByText('cdf-toggle-label')).not.toBeInTheDocument();
  });
});

// ✅ restore console after all tests
afterAll(() => {
  spyWarn.mockRestore();
});
