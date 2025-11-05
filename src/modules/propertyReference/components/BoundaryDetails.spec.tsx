import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import BoundaryDetails from '@/modules/propertyReference/components/BoundaryDetails';
import { useMediaQuery } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import type { CdfInputProps, CdfToggleButtonProps } from '@/core/types';

/* ------------------------------------------------------------
 ✅ Mocks
------------------------------------------------------------ */

// Mock: CdfInput
vi.mock('@/core/cdf-components/input/CdfInput', () => ({
  __esModule: true,
  default: ({ name, placeholder, label, onChange }: CdfInputProps) => (
    <input data-testid={name} placeholder={placeholder} aria-label={label} onChange={onChange} />
  ),
}));

// Mock: PropertyUsageDropdown
vi.mock('@/core/components/dropdown', () => ({
  PropertyUsageDropdown: ({ label }: { label: string }) => (
    <div data-testid="property-type-dropdown">{label}</div>
  ),
}));

// Mock: CdfToggleButton
vi.mock('@/core/cdf-components/togglebutton/CdfToggleButton', () => ({
  __esModule: true,
  default: ({ name, label, options = [], onChange }: CdfToggleButtonProps) => (
    <div data-testid={name}>
      <span>{label}</span>
      {options.map((opt) => (
        <button key={opt.value} onClick={(e) => onChange?.(e, opt.value)}>
          {opt.title}
        </button>
      ))}
    </div>
  ),
}));

// Mock: loggerUtils
vi.mock('@/core/utils/loggerUtils', () => ({
  __esModule: true,
  default: { debug: vi.fn() },
}));

// Mock: MUI utilities
vi.mock('@mui/material', async () => {
  const actual = await vi.importActual<typeof import('@mui/material')>('@mui/material');
  return {
    ...actual,
    useMediaQuery: vi.fn(),
    useTheme: vi.fn(() => ({
      breakpoints: { down: vi.fn(() => 'sm') },
    })),
  };
});

/* ------------------------------------------------------------
 🧪 Test Wrapper
------------------------------------------------------------ */

const TestWrapper = () => {
  const methods = useForm({
    defaultValues: {
      northBoundary: '',
      southBoundary: '',
      eastBoundary: '',
      westBoundary: '',
      approvedPlanAvailable: '',
    },
  });

  return (
    <FormProvider {...methods}>
      <BoundaryDetails />
    </FormProvider>
  );
};

/* ------------------------------------------------------------
 🧪 Tests
------------------------------------------------------------ */

describe('BoundaryDetails Component', () => {
  beforeEach(() => {
    (useMediaQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue(false);
    vi.clearAllMocks();
  });

  it('renders Boundary Details title', () => {
    render(<TestWrapper />);
    expect(screen.getByText(/boundary details/i)).toBeInTheDocument();
  });
});
