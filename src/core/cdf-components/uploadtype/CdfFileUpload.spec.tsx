import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ThemeProvider } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import CdfFileUpload from '@/core/cdf-components/uploadtype/CdfFileUpload';
import customTheme from '@core/theme';

// Mock the SVG import
vi.mock('@/core/assets/UploadIcon.svg', () => ({
  default: 'test-upload-icon.svg',
}));

describe('CdfFileUpload Component', () => {
  // Create a proper wrapper component for form context
  const FormWrapper = ({ children }: { children: React.ReactNode }) => {
    const methods = useForm();
    return (
      <ThemeProvider theme={customTheme}>
        <FormProvider {...methods}>{children}</FormProvider>
      </ThemeProvider>
    );
  };

  const renderWithTheme = (component: React.ReactElement) => {
    return render(<ThemeProvider theme={customTheme}>{component}</ThemeProvider>);
  };

  const renderWithForm = (component: React.ReactElement) => {
    return render(component, { wrapper: FormWrapper });
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render without form context', () => {
    renderWithTheme(<CdfFileUpload name="file" />);

    expect(screen.getByText('Upload it from your files')).toBeInTheDocument();
    expect(screen.getByText('Note: Supported formats JPEG, JPG & PNG')).toBeInTheDocument();
    expect(screen.getByAltText('Upload icon')).toBeInTheDocument();
  });

  it('should render with custom label', () => {
    renderWithTheme(<CdfFileUpload name="file" label="Custom upload label" />);

    expect(screen.getByText('Custom upload label')).toBeInTheDocument();
  });

  it('should render with form context', () => {
    renderWithForm(<CdfFileUpload name="file" />);

    expect(screen.getByText('Upload it from your files')).toBeInTheDocument();
  });

  it('should handle file selection without form context', () => {
    const consoleSpy = vi.spyOn(console, 'log');

    renderWithTheme(<CdfFileUpload name="file" />);

    const fileInput = screen.getByDisplayValue('') as HTMLInputElement;
    const file = new File(['test'], 'test.png', { type: 'image/png' });

    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(consoleSpy).toHaveBeenCalledWith(file);

    consoleSpy.mockRestore();
  });

  it('should handle file selection with form context', async () => {
    renderWithForm(<CdfFileUpload name="file" />);

    const fileInput = screen.getByDisplayValue('') as HTMLInputElement;
    const file = new File(['test'], 'test.png', { type: 'image/png' });

    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(fileInput.files?.[0]).toBe(file);
    });
  });

  it('should trigger file input when upload area is clicked', () => {
    renderWithTheme(<CdfFileUpload name="file" />);

    const fileInput = screen.getByDisplayValue('') as HTMLInputElement;
    const mockClick = vi.spyOn(fileInput, 'click');

    const uploadArea = screen.getByText('Upload it from your files').closest('div');
    expect(uploadArea).toBeInTheDocument();

    if (uploadArea) {
      fireEvent.click(uploadArea);
      expect(mockClick).toHaveBeenCalledTimes(1);
    }

    mockClick.mockRestore();
  });

  it('should not trigger file input when disabled', () => {
    renderWithTheme(<CdfFileUpload name="file" disabled />);

    const fileInput = screen.getByDisplayValue('') as HTMLInputElement;
    const mockClick = vi.spyOn(fileInput, 'click');

    const uploadArea = screen.getByText('Upload it from your files').closest('div');
    expect(uploadArea).toBeInTheDocument();

    if (uploadArea) {
      fireEvent.click(uploadArea);
      expect(mockClick).not.toHaveBeenCalled();
    }

    mockClick.mockRestore();
  });
  it('should have correct styling when disabled', () => {
    renderWithTheme(<CdfFileUpload name="file" disabled />);

    const uploadArea = screen.getByText('Upload it from your files').closest('div');
    expect(uploadArea).toHaveStyle({
      cursor: 'not-allowed',
    });
  });

  it('should accept only image files', () => {
    renderWithTheme(<CdfFileUpload name="file" />);

    const fileInput = screen.getByDisplayValue('');
    expect(fileInput).toHaveAttribute('accept', '.jpeg,.jpg,.png');
  });
});
