import { describe, it, expect, beforeEach, vi, type Mock } from 'vitest';
import { useAlertStore } from '@core/store';
import * as commonUtils from '@core/utils/commonUtils';
import type { AlertItem } from './alertStore';

// Mock the generateUniqueKey util
vi.mock('@core/utils/commonUtils', () => ({
  generateUniqueKey: vi.fn(),
}));

describe('useAlertStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useAlertStore.setState({ alerts: [] });
    vi.clearAllMocks();
  });

  it('should add a new alert with default type "info"', () => {
    (commonUtils.generateUniqueKey as Mock).mockReturnValue('test-id-1');

    useAlertStore.getState().showAlert('Test message');

    const alerts = useAlertStore.getState().alerts;
    expect(alerts).toHaveLength(1);
    expect(alerts[0]).toEqual<AlertItem>({
      id: 'test-id-1',
      message: 'Test message',
      type: 'info',
    });
  });

  it('should add a new alert with a custom type', () => {
    (commonUtils.generateUniqueKey as Mock).mockReturnValue('test-id-2');

    useAlertStore.getState().showAlert('Error message', 'error');

    const alerts = useAlertStore.getState().alerts;
    expect(alerts).toHaveLength(1);
    expect(alerts[0]).toEqual<AlertItem>({
      id: 'test-id-2',
      message: 'Error message',
      type: 'error',
    });
  });

  it('should add multiple alerts', () => {
    (commonUtils.generateUniqueKey as Mock).mockReturnValueOnce('id-1').mockReturnValueOnce('id-2');

    useAlertStore.getState().showAlert('First');
    useAlertStore.getState().showAlert('Second', 'warning');

    const alerts = useAlertStore.getState().alerts;
    expect(alerts).toHaveLength(2);
    expect(alerts.map((a) => a.id)).toEqual(['id-1', 'id-2']);
  });

  it('should remove an alert by id', () => {
    (commonUtils.generateUniqueKey as Mock).mockReturnValueOnce('id-1').mockReturnValueOnce('id-2');

    useAlertStore.getState().showAlert('First');
    useAlertStore.getState().showAlert('Second');

    // Remove first alert
    useAlertStore.getState().hideAlert('id-1');

    const alerts = useAlertStore.getState().alerts;
    expect(alerts).toHaveLength(1);
    expect(alerts[0].id).toBe('id-2');
  });

  it('should do nothing when hiding a non-existent id', () => {
    (commonUtils.generateUniqueKey as Mock).mockReturnValue('id-1');
    useAlertStore.getState().showAlert('Test');

    useAlertStore.getState().hideAlert('non-existent');

    const alerts = useAlertStore.getState().alerts;
    expect(alerts).toHaveLength(1);
  });
});
