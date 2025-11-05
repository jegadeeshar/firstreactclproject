import { render, screen, fireEvent } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useAlertStore } from '@core/store';
import CommonAlert from './Alert';

// Mock the store and CdfAlert
vi.mock('@core/store', () => ({
  useAlertStore: vi.fn(),
}));

vi.mock('@cdf-components/alert/CdfAlert', () => ({
  __esModule: true,
  default: vi.fn(({ message, onClose }) => (
    <div data-testid="alert">
      <span>{message}</span>
      <button data-testid="close-btn" onClick={onClose}>
        Close
      </button>
    </div>
  )),
}));

describe('CommonAlert', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders alerts from the store', () => {
    (useAlertStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      alerts: [
        { id: '1', type: 'success', message: 'Success Alert' },
        { id: '2', type: 'error', message: 'Error Alert' },
      ],
      hideAlert: vi.fn(),
    });

    render(<CommonAlert />);

    const alerts = screen.getAllByTestId('alert');
    expect(alerts).toHaveLength(2);
    expect(screen.getByText('Success Alert')).toBeInTheDocument();
    expect(screen.getByText('Error Alert')).toBeInTheDocument();
  });

  it('calls hideAlert with correct id when closed', () => {
    const hideAlert = vi.fn();
    (useAlertStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      alerts: [{ id: '123', type: 'info', message: 'Info Alert' }],
      hideAlert,
    });

    render(<CommonAlert />);

    fireEvent.click(screen.getByTestId('close-btn'));
    expect(hideAlert).toHaveBeenCalledWith('123');
  });

  it('renders nothing when there are no alerts', () => {
    (useAlertStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      alerts: [],
      hideAlert: vi.fn(),
    });

    render(<CommonAlert />);
    expect(screen.queryByTestId('alert')).not.toBeInTheDocument();
  });
});
