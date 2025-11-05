import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, vi, beforeEach, expect } from 'vitest';
import SampleEnquiry from '@/modules/enquiry/pages/SampleEnquiry';
import { enquiryService } from '@/modules/enquiry/services/enquiryService';
import logger from '@/core/utils/loggerUtils';
import alertUtils from '@/core/utils/alertUtils';

// --- Mock child components ---
vi.mock('@/modules/enquiry/components/SampleEnquiryForm', () => ({
  default: () => <div data-testid="sample-enquiry-form">Sample Enquiry Form</div>,
}));

vi.mock('@/core/layout/FormWrapper', () => ({
  default: ({ footer, children }: { footer: React.ReactNode; children: React.ReactNode }) => (
    <div data-testid="form-wrapper">
      <div data-testid="layout-children">{children}</div>
      <div data-testid="layout-footer">{footer}</div>
    </div>
  ),
}));

vi.mock('@/core/cdf-components/footer/CdfActionFooter', () => ({
  default: ({ onSubmit, onClose }: { onSubmit?: () => void; onClose?: () => void }) => (
    <div>
      <button data-testid="submit-button" onClick={onSubmit}>
        Submit
      </button>
      <button data-testid="close-button" onClick={onClose}>
        Close
      </button>
    </div>
  ),
}));

// --- Mock utilities ---
vi.mock('@/core/utils/loggerUtils', () => ({
  default: {
    info: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock('@/core/utils/alertUtils', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock('@/modules/enquiry/services/enquiryService', () => ({
  enquiryService: {
    saveEnquiry: vi.fn(),
  },
}));

describe('SampleEnquiry', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the layout and form correctly', () => {
    render(<SampleEnquiry />);
    expect(screen.getByTestId('form-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('sample-enquiry-form')).toBeInTheDocument();
  });

  it('handles form submission successfully', async () => {
    const mockResponse = { id: 123, status: 'success' };
    (enquiryService.saveEnquiry as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(
      mockResponse
    );

    render(<SampleEnquiry />);
    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(logger.info).toHaveBeenCalledWith(
        'Form submitted with data:',
        expect.objectContaining({ email: '', mobileNo: '' })
      );
      expect(alertUtils.success).toHaveBeenCalledWith('Enquiry created successfully!');
      expect(logger.info).toHaveBeenCalledWith('API Response:', mockResponse);
    });
  });

  it('handles form submission failure', async () => {
    vi.mocked(enquiryService.saveEnquiry).mockRejectedValue(new Error('Network Error'));

    render(<SampleEnquiry />);
    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(logger.error).toHaveBeenCalledWith('Failed to create enquiry:', expect.any(Error));
      expect(alertUtils.error).toHaveBeenCalledWith('Failed to create enquiry');
    });
  });

  it('handles cancel/reset action', () => {
    render(<SampleEnquiry />);
    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);
    expect(closeButton).toBeInTheDocument();
  });
});
