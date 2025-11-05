import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, beforeEach, expect } from 'vitest';
import { FormProvider, useForm } from 'react-hook-form';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ReferenceDetailsForm from '@/modules/propertyReference/components/ReferenceDetailsForm';
import type { ReferenceDetail } from '@/modules/propertyReference/types';

vi.mock('@core/utils/loggerUtils', () => ({
  default: { debug: vi.fn(), info: vi.fn(), error: vi.fn() },
}));
vi.mock('@core/hooks/useLabels', () => ({ default: vi.fn(() => ({})) }));
vi.mock('@core/utils/alertUtils', () => ({
  default: { info: vi.fn(), success: vi.fn(), error: vi.fn() },
}));

vi.mock('@cdf-components/input/CdfInput', () => ({
  default: ({ name, label }: { name: string; label: string }) => (
    <input data-testid={`cdfinput-${name}`} placeholder={label} name={name} aria-label={label} />
  ),
}));

vi.mock('@cdf-components/link/CdfLink', () => ({
  default: ({ label, onClick }: { label: string; onClick: () => void }) => (
    <button data-testid="add-reference-link" onClick={onClick}>
      {label}
    </button>
  ),
}));

vi.mock('@/core/cdf-components/accordion/CdfAccordion', () => ({
  CdfAccordion: ({ summary, details }: { summary: React.ReactNode; details: React.ReactNode }) => (
    <div data-testid="cdf-accordion">
      <div data-testid="accordion-summary">{summary}</div>
      <div data-testid="accordion-details">{details}</div>
    </div>
  ),
}));

describe('ReferenceDetailsForm Component', () => {
  const theme = createTheme();
  const FormWrapper = ({ children }: { children: React.ReactNode }) => {
    const methods = useForm<ReferenceDetail>({
      defaultValues: {
        referenceFullName: '',
        mobileNo: '',
        addressLine1: '',
        addressLine2: '',
        landmark: '',
        city: '',
        state: '',
        pinCode: '',
      },
      mode: 'onBlur',
    });
    return (
      <FormProvider {...methods}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </FormProvider>
    );
  };

  const renderWithFormContext = () =>
    render(
      <FormWrapper>
        <ReferenceDetailsForm />
      </FormWrapper>
    );

  beforeEach(() => vi.clearAllMocks());

  const FIELD_NAMES = [
    'referenceName',
    'relationship',
    'mobileNumber',
    'addressLine1',
    'addressLine2',
    'landmark',
    'pincode',
    'city',
    'state',
  ];
  const FIELD_LABELS = {
    referenceName: 'Reference Full Name',
    relationship: 'Relationship',
    mobileNumber: 'Mobile No.',
    addressLine1: 'Address Line 1',
    pincode: 'Pincode',
  };

  describe('Rendering', () => {
    it('should render all required elements', () => {
      renderWithFormContext();
      expect(screen.getByTestId('cdf-accordion')).toBeInTheDocument();
      expect(screen.getByTestId('add-reference-link')).toBeInTheDocument();
      expect(screen.getByTestId('accordion-summary')).toBeInTheDocument();
      expect(screen.getByTestId('accordion-details')).toBeInTheDocument();
    });

    it('should render all input fields', () => {
      renderWithFormContext();
      FIELD_NAMES.forEach((field) =>
        expect(screen.getByTestId(`cdfinput-${field}`)).toBeInTheDocument()
      );
    });

    it('should render inputs with correct placeholders', () => {
      renderWithFormContext();
      Object.entries(FIELD_LABELS).forEach(([field, label]) => {
        expect(screen.getByTestId(`cdfinput-${field}`)).toHaveAttribute('placeholder', label);
      });
    });

    it('should have proper name and aria-label attributes', () => {
      renderWithFormContext();
      FIELD_NAMES.forEach((field) => {
        const input = screen.getByTestId(`cdfinput-${field}`);
        expect(input).toHaveAttribute('name', field);
        expect(input).toHaveAttribute('aria-label');
      });
    });
  });

  describe('User Interactions', () => {
    it('should handle Add Reference link clicks', () => {
      renderWithFormContext();
      const addRefButton = screen.getByTestId('add-reference-link');
      fireEvent.click(addRefButton);
      fireEvent.click(addRefButton);
      expect(addRefButton).toBeInTheDocument();
    });

    it('should handle accordion interactions', () => {
      renderWithFormContext();
      const accordionSummary = screen.getByTestId('accordion-summary');
      fireEvent.click(accordionSummary);
      expect(accordionSummary).toBeInTheDocument();
    });

    it('should maintain structure after rapid interactions', () => {
      renderWithFormContext();
      const addRefButton = screen.getByTestId('add-reference-link');
      const accordionSummary = screen.getByTestId('accordion-summary');

      fireEvent.click(addRefButton);
      fireEvent.click(accordionSummary);
      fireEvent.click(addRefButton);

      FIELD_NAMES.slice(0, 3).forEach((field) => {
        expect(screen.getByTestId(`cdfinput-${field}`)).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility & Theme', () => {
    it('should have accessible Add Reference button', () => {
      renderWithFormContext();
      const addRefButton = screen.getByTestId('add-reference-link');
      expect(addRefButton).toBeEnabled();
      expect(addRefButton).toHaveTextContent('Add Reference');
    });

    it('should render correctly with MUI theme', () => {
      const { container } = renderWithFormContext();
      expect(container).toBeInTheDocument();
      expect(screen.getByTestId('cdf-accordion')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should render without errors', () => {
      expect(() => renderWithFormContext()).not.toThrow();
    });

    it('should have accordion containing form fields', () => {
      renderWithFormContext();
      const accordion = screen.getByTestId('cdf-accordion');
      const details = screen.getByTestId('accordion-details');
      expect(accordion).toContainElement(details);
    });
  });
});
