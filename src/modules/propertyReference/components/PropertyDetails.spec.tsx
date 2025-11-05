import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useForm, FormProvider } from 'react-hook-form';
import type { CdfToggleButtonProps } from '@/core/types';
import PropertyDetails from '@/modules/propertyReference/components/PropertyDetails';
/* ------------------------------------------------------------
 ✅ Mocks
------------------------------------------------------------ */

// Mock: CdfInput
vi.mock('@/core/cdf-components/input/CdfInput', () => ({
  __esModule: true,
  default: ({ label }: { label: string }) => <input data-testid={`input-${label}`} />,
}));

// Mock: CdfToggleButton
vi.mock('@/core/cdf-components/togglebutton/CdfToggleButton', () => ({
  __esModule: true,
  default: ({ label }: CdfToggleButtonProps) => <div data-testid={`toggle-${label}`}>{label}</div>,
}));

// Mock: CdfUploadPreview
vi.mock('@/core/cdf-components/upload/CdfUploadPreview', () => ({
  __esModule: true,
  default: ({ title }: { title: string }) => <div data-testid="upload-preview">{title}</div>,
}));

// Mock: CdfFileUpload
vi.mock('@/core/cdf-components/uploadtype/CdfFileUpload', () => ({
  __esModule: true,
  default: () => <div data-testid="file-upload">FileUpload</div>,
}));

// Mock: CdfAutoComplete (used in PropertyDetails)
vi.mock('@/core/cdf-components/autocomplete/CdfAutoComplete', () => ({
  __esModule: true,
  default: ({ label }: { label: string }) => (
    <div data-testid={`autocomplete-${label}`}>{label}</div>
  ),
}));

/* ------------------------------------------------------------
 ✅ Test Wrapper
------------------------------------------------------------ */
const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

/* ------------------------------------------------------------
 🧪 Tests
------------------------------------------------------------ */
describe('PropertyDetails Component', () => {
  it('renders all fields correctly', () => {
    render(
      <Wrapper>
        <PropertyDetails />
      </Wrapper>
    );

    // Title
    expect(screen.getByText(/property details/i)).toBeInTheDocument();

    // Toggle buttons
    expect(screen.getByTestId('toggle-Property Title')).toBeInTheDocument();
    expect(screen.getByTestId('toggle-Property Ownership')).toBeInTheDocument();

    // Uploads
    expect(screen.getByTestId('file-upload')).toBeInTheDocument();
    expect(screen.getByTestId('upload-preview')).toBeInTheDocument();

    // Autocompletes and Inputs
    expect(screen.getByTestId('autocomplete-Name of purposed Property Owner')).toBeInTheDocument();
    expect(screen.getByTestId('autocomplete-Property Type')).toBeInTheDocument();
    expect(screen.getByTestId('autocomplete-Type Of Document')).toBeInTheDocument();
    expect(screen.getByTestId('input-Buyer Name')).toBeInTheDocument();
    expect(screen.getByTestId('input-Seller Name')).toBeInTheDocument();
  });

  it('handles AutoComplete click gracefully', () => {
    render(
      <Wrapper>
        <PropertyDetails />
      </Wrapper>
    );

    const auto = screen.getByTestId('autocomplete-Property Type');
    fireEvent.click(auto);

    // Just ensuring component rendered and responds
    expect(auto).toBeInTheDocument();
  });
});
