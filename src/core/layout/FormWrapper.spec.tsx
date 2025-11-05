import { describe, it, expect, vi, type Mock } from 'vitest';
import { render, screen } from '@testing-library/react';
import FormWrapper from './FormWrapper';
import type { UseFormReturn } from 'react-hook-form';
import { FormProvider } from 'react-hook-form';
import type { PropsWithChildren } from 'react';

// ────────────────────────────────────────────────
// 🧩 Mock MUI components
// ────────────────────────────────────────────────

type DivLikeProps = PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> & {
  'data-testid'?: string;
};

vi.mock('@mui/material', () => ({
  Box: ({ children, ...props }: DivLikeProps) => (
    <div data-testid="mui-box" {...props}>
      {children}
    </div>
  ),
  Paper: ({ children, ...props }: DivLikeProps) => (
    <div data-testid="mui-paper" {...props}>
      {children}
    </div>
  ),
  FormControl: ({ children, ...props }: DivLikeProps) => (
    <div data-testid="mui-formcontrol" {...props}>
      {children}
    </div>
  ),
}));

// ────────────────────────────────────────────────
// 🧩 Mock FormProvider
// ────────────────────────────────────────────────
vi.mock('react-hook-form', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-hook-form')>();
  return {
    ...actual,
    FormProvider: vi.fn(({ children }) => <div data-testid="form-provider">{children}</div>),
  };
});

// ────────────────────────────────────────────────
// 🧪 TESTS
// ────────────────────────────────────────────────
describe('FormWrapper', () => {
  // ✅ Create a strongly typed mock with all required fields
  const mockMethods = {
    register: vi.fn(),
    handleSubmit: vi.fn(),
    watch: vi.fn(),
    setValue: vi.fn(),
    getValues: vi.fn(),
    reset: vi.fn(),
    trigger: vi.fn(),
    control: {},
    formState: {
      errors: {},
      isDirty: false,
      isValid: true,
      isSubmitting: false,
      isSubmitted: false,
      isSubmitSuccessful: false,
      isLoading: false,
      submitCount: 0,
      touchedFields: {},
      dirtyFields: {},
      disabled: false,
      defaultValues: {},
    },
  } as unknown as UseFormReturn<Record<string, unknown>>;

  it('renders children inside FormProvider and FormControl', () => {
    render(
      <FormWrapper methods={mockMethods}>
        <div data-testid="child">Form Content</div>
      </FormWrapper>
    );

    expect(screen.getByTestId('form-provider')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByTestId('mui-formcontrol')).toBeInTheDocument();
  });

  it('renders footer when provided', () => {
    render(
      <FormWrapper methods={mockMethods} footer={<div data-testid="footer">Footer Content</div>}>
        <div>Form Content</div>
      </FormWrapper>
    );

    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('does not render footer when not provided', () => {
    render(
      <FormWrapper methods={mockMethods}>
        <div>Form Content</div>
      </FormWrapper>
    );

    expect(screen.queryByTestId('footer')).toBeNull();
  });

  it('passes form methods to FormProvider', () => {
    render(
      <FormWrapper methods={mockMethods}>
        <div data-testid="child">Form Content</div>
      </FormWrapper>
    );

    // ✅ Extract the first call argument to FormProvider
    const firstCallArgs = (FormProvider as unknown as Mock).mock.calls[0][0];

    // ✅ Ensure all mock methods are inside the props
    for (const key of Object.keys(mockMethods)) {
      expect(firstCallArgs).toHaveProperty(key);
    }

    // ✅ Ensure children exist (sanity check)
    expect(firstCallArgs.children).toBeDefined();
  });
});
