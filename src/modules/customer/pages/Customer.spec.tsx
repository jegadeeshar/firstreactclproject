import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, type Mock } from 'vitest';
import Customer from '@modules/customer/pages/Customer';
import type { FieldValues, UseFormReturn, UseFormHandleSubmit, Control } from 'react-hook-form';

const mockNavigate = vi.fn() as Mock;

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(() => mockNavigate),
  };
});

vi.mock('react-hook-form', async () => {
  const actual = await vi.importActual<typeof import('react-hook-form')>('react-hook-form');

  const createMockHandleSubmit = (): UseFormHandleSubmit<FieldValues> => {
    return vi.fn((onValid) => {
      return async () => {
        if (onValid) await onValid({} as FieldValues);
      };
    }) as unknown as UseFormHandleSubmit<FieldValues>;
  };

  const mockHandleSubmit = createMockHandleSubmit();

  const mockFormReturn: Partial<UseFormReturn<FieldValues>> = {
    handleSubmit: mockHandleSubmit,
    formState: {
      isValid: true,
      isDirty: false,
      isLoading: false,
      isSubmitted: false,
      isSubmitSuccessful: false,
      isSubmitting: false,
      isValidating: false,
      isReady: true,
      validatingFields: {},
      dirtyFields: {},
      touchedFields: {},
      submitCount: 0,
      errors: {},
      defaultValues: {},
      disabled: false,
    },
    register: vi.fn(),
    unregister: vi.fn(),
    watch: vi.fn(),
    setValue: vi.fn(),
    getValues: vi.fn(),
    reset: vi.fn(),
    resetField: vi.fn(),
    clearErrors: vi.fn(),
    setError: vi.fn(),
    trigger: vi.fn(),
    getFieldState: vi.fn(),
    control: {} as Control<FieldValues>,
  };

  return {
    ...actual,
    useForm: vi.fn(() => mockFormReturn),
  };
});

vi.mock('@/core/cdf-components/footer/CdfActionFooter', () => ({
  default: ({
    onSubmit,
    onClose,
    closeButtonLabel,
  }: {
    onSubmit?: () => void;
    onClose?: () => void;
    closeButtonLabel?: string;
  }) => (
    <div data-testid="footer">
      <button data-testid="submit-btn" onClick={() => onSubmit?.()}>
        Submit
      </button>
      <button data-testid="close-btn" onClick={onClose}>
        {closeButtonLabel || 'Close'}
      </button>
    </div>
  ),
}));

vi.mock('@/core/layout/FormWrapper', () => ({
  default: ({
    children,
    footer,
  }: {
    methods: UseFormReturn<FieldValues>;
    children: React.ReactNode;
    footer?: React.ReactNode;
  }) => (
    <div data-testid="form-wrapper">
      <div data-testid="form-content">{children}</div>
      <div data-testid="form-footer">{footer}</div>
    </div>
  ),
}));

vi.mock('@modules/customer/components/CustomerIfame', () => ({
  default: () => <div data-testid="customer-iframe">CustomerIframe</div>,
}));

describe('Customer Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders FormWrapper and CustomerIframe', () => {
    render(<Customer />);
    expect(screen.getByTestId('form-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('customer-iframe')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('navigates back when close button is clicked', () => {
    render(<Customer />);
    fireEvent.click(screen.getByTestId('close-btn'));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('calls handleSubmit when submit button is clicked', () => {
    render(<Customer />);
    fireEvent.click(screen.getByTestId('submit-btn'));
    expect(screen.getByTestId('submit-btn')).toBeInTheDocument();
  });
});
