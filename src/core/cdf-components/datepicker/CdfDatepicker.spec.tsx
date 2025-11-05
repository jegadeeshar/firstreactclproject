import React, { type ComponentType, type ReactElement } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useForm, FormProvider, type UseFormReturn } from 'react-hook-form';
import dayjs, { Dayjs } from 'dayjs';
import CdfDatePicker from '@/core/cdf-components/datepicker/CdfDatepicker';

// Mock SVG import
vi.mock('@/core/assets/Icons/CalendarIcon.svg', () => ({
  default: 'calendar-icon-mock.svg',
}));

// Create a mock for the DatePicker that avoids prop spreading conflicts
interface MockDatePickerProps {
  label?: string;
  value?: Dayjs | null;
  format?: string;
  onChange?: (value: Dayjs | null) => void;
  slotProps?: {
    textField?: {
      placeholder?: string;
      fullWidth?: boolean;
      helperText?: string;
      error?: boolean;
    };
  };
  slots?: {
    openPickerButton?: React.ComponentType<Record<string, never>>;
  };
}

// Type-safe mock implementation for DatePicker
interface MockDatePickerProps {
  label?: string;
  value?: Dayjs | null;
  format?: string;
  onChange?: (value: Dayjs | null) => void;
  slotProps?: {
    textField?: {
      placeholder?: string;
      fullWidth?: boolean;
      helperText?: string;
      error?: boolean;
    };
  };
  slots?: {
    openPickerButton?: ComponentType<Record<string, never>>;
  };
}

vi.mock('@mui/x-date-pickers/DatePicker', () => {
  const MockDatePicker = ({
    label,
    value,
    onChange,
    slotProps,
  }: MockDatePickerProps): ReactElement => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newDate = dayjs(event.target.value, 'MM-DD-YYYY');
      onChange?.(newDate.isValid() ? newDate : null);
    };

    return (
      <div data-testid="mock-datepicker">
        {label && <label>{label}</label>}
        <input
          data-testid="date-input"
          value={value ? dayjs(value).format('MM-DD-YYYY') : ''}
          placeholder={slotProps?.textField?.placeholder}
          onChange={handleChange}
        />
        <div data-testid="calendar-btn">📅</div>
        {slotProps?.textField?.helperText && <span>{slotProps.textField.helperText}</span>}
      </div>
    );
  };

  return { DatePicker: MockDatePicker };
});

// Mock LocalizationProvider to simply render children
vi.mock('@mui/x-date-pickers/LocalizationProvider', () => ({
  LocalizationProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="localization-provider">{children}</div>
  ),
}));

// --- Helper function to render with form context ---
interface TestForm {
  [key: string]: unknown;
}

const renderWithForm = (
  props: Record<string, unknown> = {},
  defaultValues: Record<string, unknown> = {}
) => {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const methods: UseFormReturn<TestForm> = useForm({ defaultValues });
    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  return render(
    <Wrapper>
      <CdfDatePicker name={'Date'} label={'Select Date'} {...props} />
    </Wrapper>
  );
};

describe('CdfDatePicker', () => {
  //  Uncontrolled mode (no useFormContext)
  it('renders uncontrolled DatePicker without crashing', () => {
    const { container } = render(
      <CdfDatePicker
        name="uncontrolled"
        label="Uncontrolled Date"
        value={'2025-10-24'}
        placeholder="Select Date"
      />
    );

    expect(screen.getByTestId('mock-datepicker')).toBeInTheDocument();
    expect(container.querySelector('label')?.textContent).toBe('Uncontrolled Date');
    expect(screen.getByTestId('date-input')).toHaveValue('10-24-2025');
  });

  //  Controlled mode (with form context)
  it('renders controlled DatePicker inside react-hook-form', () => {
    renderWithForm({
      name: 'testDate',
      label: 'Controlled Date',
      required: true,
    });

    expect(screen.getByTestId('mock-datepicker')).toBeInTheDocument();
    expect(screen.getByText('Controlled Date')).toBeInTheDocument();
  });

  //  Handles onChange and updates value
  it('handles date change and updates form value', async () => {
    const onSubmit = vi.fn();

    const Wrapper: React.FC = () => {
      const methods = useForm<{ dateField: Date | null }>({
        defaultValues: { dateField: null },
      });
      return (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <CdfDatePicker name="dateField" label="Date Field" />
            <button type="submit">Submit</button>
          </form>
        </FormProvider>
      );
    };

    render(<Wrapper />);
    const input = screen.getByTestId('date-input');
    fireEvent.change(input, { target: { value: '12-25-2025' } });
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          dateField: expect.any(Date),
        }),
        expect.anything()
      );
    });
  });

  //  Required validation message
  it('shows validation message when required field is missing', async () => {
    const onSubmit = vi.fn();

    const Wrapper: React.FC = () => {
      const methods = useForm<{ myDate: string }>({
        defaultValues: { myDate: '' },
      });
      return (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <CdfDatePicker name="myDate" label="Pick Date" required />
            <button type="submit">Submit</button>
          </form>
        </FormProvider>
      );
    };

    render(<Wrapper />);
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText('Pick Date is required')).toBeInTheDocument();
    });
  });
  //  Placeholder + validation helper text
  it('renders placeholder correctly', () => {
    renderWithForm({
      name: 'dateField',
      label: 'Date Label',
      placeholder: 'Choose a date',
      rules: { validate: () => 'Invalid date' },
    });

    expect(screen.getByTestId('date-input')).toHaveAttribute('placeholder', 'Choose a date');
  });

  // Custom calendar icon slot
  it('renders custom calendar button and responds to click', () => {
    renderWithForm({
      name: 'dateWithIcon',
      label: 'Icon Date',
    });

    const button = screen.getByTestId('calendar-btn');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
  });
});
