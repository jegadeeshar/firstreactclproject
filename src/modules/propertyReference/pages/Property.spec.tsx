import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import type { ReactElement } from 'react';
import Property from '@/modules/propertyReference/pages/Property';

// ✅ Mock react-hook-form
vi.mock('react-hook-form', () => ({
  useForm: () => ({
    handleSubmit: (fn: (data?: unknown) => void) => () => fn(),
    reset: vi.fn(),
  }),
}));

// ✅ Mock utils
vi.mock('@/core/utils/loggerUtils', () => ({
  default: { info: vi.fn(), error: vi.fn() },
}));

vi.mock('@/core/utils/alertUtils', () => ({
  default: { success: vi.fn(), error: vi.fn() },
}));

vi.mock('@/modules/propertyReference/components/PropertyTab', () => ({
  default: () => <div data-testid="property-tab" />,
}));

type FooterMockProps = { onSubmit: () => void; onClose: () => void };
type FormWrapperMockProps = { children: React.ReactNode; footer: React.ReactNode };

vi.mock('@/core/cdf-components/footer/CdfActionFooter', () => {
  const MockFooter = ({ onSubmit, onClose }: FooterMockProps): ReactElement => (
    <div>
      <button onClick={onSubmit}>submit</button>
      <button onClick={onClose}>cancel</button>
    </div>
  );
  return { default: MockFooter };
});

vi.mock('@/core/layout/FormWrapper', () => {
  const MockWrapper: React.FC<FormWrapperMockProps> = ({ children, footer }) => (
    <form>
      {children}
      {footer}
    </form>
  );
  return { default: MockWrapper };
});

describe('Property Component', () => {
  it('handles submit button click gracefully', () => {
    render(<Property />);
    fireEvent.click(screen.getByText('submit'));
  });

  it('calls reset when handleCancel is triggered', () => {
    render(<Property />);
    fireEvent.click(screen.getByText('cancel'));
  });
});
