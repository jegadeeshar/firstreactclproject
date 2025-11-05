import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import ReferenceDetails from './ReferenceDetails';
import logger from '@core/utils/loggerUtils';
import alertUtils from '@core/utils/alertUtils';

// ────────────────────────────────────────────────
// ✅ Mocks
// ────────────────────────────────────────────────
vi.mock('@/modules/propertyReference/components/ReferenceDetailsForm', () => ({
  default: () => <div data-testid="reference-details-form">Reference Details Form</div>,
}));

vi.mock('@/core/layout/FormWrapper', () => ({
  default: ({ footer, children }: { footer: React.ReactNode; children: React.ReactNode }) => (
    <div data-testid="form-wrapper">
      <div data-testid="layout-children">{children}</div>
      <div data-testid="layout-footer">{footer}</div>
    </div>
  ),
}));

vi.mock('@cdf-components/footer/CdfActionFooter', () => ({
  default: ({
    onSubmit,
    onClose,
  }: {
    onSubmit?: React.FormEventHandler<HTMLButtonElement>;
    onClose?: () => void;
  }) => (
    <div data-testid="action-footer">
      <button data-testid="submit-button" onClick={onSubmit as () => void}>
        Submit
      </button>
      <button data-testid="close-button" onClick={onClose}>
        Close
      </button>
    </div>
  ),
}));

vi.mock('@core/utils/loggerUtils', () => ({ default: { info: vi.fn(), error: vi.fn() } }));
vi.mock('@core/utils/alertUtils', () => ({ default: { success: vi.fn(), error: vi.fn() } }));

// ────────────────────────────────────────────────
// ✅ Test Suite
// ────────────────────────────────────────────────
describe('ReferenceDetails Component', () => {
  const DEFAULT_VALUES = {
    referenceFullName: '',
    mobileNo: '',
    addressLine1: '',
    addressLine2: '',
    landmark: '',
    city: '',
    state: '',
    pinCode: '',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render all required elements', () => {
      render(<ReferenceDetails />);
      [
        'form-wrapper',
        'action-footer',
        'reference-details-form',
        'layout-children',
        'layout-footer',
        'submit-button',
        'close-button',
      ].forEach((testId) => expect(screen.getByTestId(testId)).toBeInTheDocument());
    });
  });

  describe('Form Submission', () => {
    it('should submit form successfully with default empty values', async () => {
      render(<ReferenceDetails />);
      fireEvent.click(screen.getByTestId('submit-button'));

      await waitFor(() =>
        expect(logger.info).toHaveBeenCalledWith(
          'Form submitted with data:',
          expect.objectContaining(DEFAULT_VALUES)
        )
      );
      await waitFor(() =>
        expect(alertUtils.success).toHaveBeenCalledWith('Reference details saved successfully!')
      );

      const payloadValues = {
        referenceFullName: '',
        mobileNo: '',
        addressLine1: '',
        landmark: '',
        city: '',
        state: '',
        pinCode: '',
      };
      await waitFor(() =>
        expect(logger.info).toHaveBeenCalledWith(
          'API Response:',
          expect.objectContaining(payloadValues)
        )
      );
    });

    it('should handle submission errors gracefully', async () => {
      const mockError = new Error('Network error');
      vi.mocked(logger.info).mockImplementationOnce(() => {
        throw mockError;
      });

      render(<ReferenceDetails />);
      fireEvent.click(screen.getByTestId('submit-button'));

      await waitFor(() =>
        expect(logger.error).toHaveBeenCalledWith('Failed to save reference details:', mockError)
      );
      await waitFor(() =>
        expect(alertUtils.error).toHaveBeenCalledWith('Failed to save reference details')
      );
    });

    it('should call logger.info twice and not call logger.error on success', async () => {
      render(<ReferenceDetails />);
      fireEvent.click(screen.getByTestId('submit-button'));

      await waitFor(() => expect(logger.info).toHaveBeenCalledTimes(2));
      await waitFor(() => expect(alertUtils.success).toHaveBeenCalled());
      expect(logger.error).not.toHaveBeenCalled();
    });
  });

  describe('Form Reset/Cancel', () => {
    it('should handle close button clicks gracefully', () => {
      render(<ReferenceDetails />);
      const closeButton = screen.getByTestId('close-button');
      expect(closeButton).toBeInTheDocument();
      fireEvent.click(closeButton);
      fireEvent.click(closeButton);
    });
  });

  describe('Integration Tests', () => {
    it('should handle multiple submissions successfully', async () => {
      render(<ReferenceDetails />);
      for (let i = 1; i <= 3; i++) {
        fireEvent.click(screen.getByTestId('submit-button'));
        await waitFor(() => expect(alertUtils.success).toHaveBeenCalledTimes(i));
      }
    });

    it('should handle submit after cancel', async () => {
      render(<ReferenceDetails />);
      fireEvent.click(screen.getByTestId('close-button'));
      fireEvent.click(screen.getByTestId('submit-button'));
      await waitFor(() => expect(alertUtils.success).toHaveBeenCalled());
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid alternating clicks', async () => {
      render(<ReferenceDetails />);
      const submit = screen.getByTestId('submit-button');
      const close = screen.getByTestId('close-button');

      fireEvent.click(submit);
      fireEvent.click(submit);
      fireEvent.click(close);
      fireEvent.click(submit);

      await waitFor(() => expect(alertUtils.success).toHaveBeenCalled());
      expect(logger.info).toHaveBeenCalled();
    });

    it('should not throw and handle errors gracefully', async () => {
      render(<ReferenceDetails />);
      expect(() => fireEvent.click(screen.getByTestId('submit-button'))).not.toThrow();
      await waitFor(() => expect(alertUtils.success).toHaveBeenCalled());

      vi.mocked(logger.info).mockImplementationOnce(() => {
        throw new Error('Test error');
      });

      expect(() => fireEvent.click(screen.getByTestId('submit-button'))).not.toThrow();
      await waitFor(() => expect(alertUtils.error).toHaveBeenCalled());
    });
  });

  describe('Form Configuration', () => {
    it('should initialize with correct default values', async () => {
      render(<ReferenceDetails />);
      fireEvent.click(screen.getByTestId('submit-button'));

      await waitFor(() =>
        expect(logger.info).toHaveBeenCalledWith(
          'Form submitted with data:',
          expect.objectContaining(DEFAULT_VALUES)
        )
      );
    });
  });
});
