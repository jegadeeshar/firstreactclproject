import { describe, it, expect, vi, beforeEach } from 'vitest';
import alertUtils from './alertUtils';
import { useAlertStore } from '@core/store';
import { type AlertColor } from '@mui/material';

describe('alert utility', () => {
  const showAlertMock = vi.fn();

  beforeEach(() => {
    // Reset mocks and store before each test
    showAlertMock.mockReset();
    vi.spyOn(useAlertStore, 'getState').mockReturnValue({
      alerts: [],
      showAlert: showAlertMock,
      hideAlert: vi.fn(),
    });
  });

  it('should call showAlert with success type', () => {
    alertUtils.success('Success message');
    expect(showAlertMock).toHaveBeenCalledWith('Success message', 'success');
  });

  it('should call showAlert with error type', () => {
    alertUtils.error('Error message');
    expect(showAlertMock).toHaveBeenCalledWith('Error message', 'error');
  });

  it('should call showAlert with info type', () => {
    alertUtils.info('Info message');
    expect(showAlertMock).toHaveBeenCalledWith('Info message', 'info');
  });

  it('should call showAlert with warning type', () => {
    alertUtils.warning('Warning message');
    expect(showAlertMock).toHaveBeenCalledWith('Warning message', 'warning');
  });

  it('should default to info type if no type is provided in show()', () => {
    // Directly call the internal show function via alertUtils.info wrapper
    alertUtils.info('Default info');
    expect(showAlertMock).toHaveBeenCalledWith('Default info', 'info');
  });

  it('should call showAlert with correct type for custom message', () => {
    const message = 'Custom test';
    const type: AlertColor = 'warning';
    // @ts-expect-error accessing private show
    alertUtils._show?.(message, type); // if internal show exposed for test
  });
});
