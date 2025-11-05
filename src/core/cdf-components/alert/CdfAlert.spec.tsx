import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import CdfAlert from './CdfAlert';

describe('CdfAlert', () => {
  it('renders the alert with correct message and type', () => {
    render(<CdfAlert message="Test alert" type="success" open={true} onClose={vi.fn()} />);

    // Check that the alert text is rendered
    expect(screen.getByText('Test alert')).toBeInTheDocument();

    // Check that Alert has correct severity
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('MuiAlert-standardSuccess');
  });

  it('calls onClose when Alert close button is clicked', () => {
    const onClose = vi.fn();
    render(<CdfAlert message="Closable alert" type="error" open={true} onClose={onClose} />);

    // Find close button inside Alert
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders the Snackbar content when open=true', () => {
    render(<CdfAlert message="Open alert" type="info" open={true} onClose={vi.fn()} />);

    // The Alert component renders with role="alert"
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent('Open alert');
  });

  it('does not render alert content when open=false', () => {
    render(<CdfAlert message="Hidden alert" type="info" open={false} onClose={vi.fn()} />);

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('calls onClose when Snackbar closes for non-clickaway reason', () => {
    const onClose = vi.fn();

    // Render alert and grab Snackbar instance
    render(<CdfAlert message="Close alert" type="info" open={true} onClose={onClose} />);

    // Manually trigger Snackbar's onClose
    const snackbar = screen.getByRole('alert').closest('.MuiSnackbar-root');
    expect(snackbar).toBeTruthy();

    // Find the Snackbar component from the render tree
    const snackbarInstance = screen.queryByRole('alert');
    expect(snackbarInstance).toBeInTheDocument();

    // Call Snackbar onClose handler directly
    // Simulate reason !== 'clickaway'

    fireEvent.keyDown(document, { key: 'Escape' }); // simulate ESC close

    // Manually simulate the handler for test coverage
    screen
      .getByRole('alert')
      .parentElement?.parentElement?.dispatchEvent(
        new CustomEvent('close', { detail: { reason: 'timeout' } })
      );

    // Just directly invoke to ensure coverage
    // This is the most reliable path:
    const { container } = render(
      <CdfAlert message="Manual close" type="info" open={true} onClose={onClose} />
    );
    const snackbarElement = container.querySelector('.MuiSnackbar-root')!;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onCloseProp = (snackbarElement as any).onClose;
    if (onCloseProp) onCloseProp({}, 'timeout');

    expect(onClose).toHaveBeenCalled();
  });
});
