import { describe, it, expect, vi, beforeEach } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import api from './axiosInterceptor';
import { useLoginUserStore } from '@core/store';

// Use vi.hoisted to ensure the mock variables are available when vi.mock is executed.
const { mockAlertUtils } = vi.hoisted(() => {
  const mockAlertUtils = {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warning: vi.fn(),
  };
  return { mockAlertUtils };
});

// Now, vi.mock can reference the hoisted mockAlertUtils.
vi.mock('@core/utils/alertUtils', () => ({
  default: mockAlertUtils,
}));

// Mock Zustand store
vi.mock('@core/store', () => {
  const logout = vi.fn();
  const store: {
    token: string | null;
    logout: typeof logout;
  } = {
    token: null,
    logout,
  };

  return {
    useLoginUserStore: {
      getState: () => store,
    },
  };
});

describe('api Axios instance', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(api);
    mock.reset();

    // Reset store values and alert mocks before each test
    const store = useLoginUserStore.getState();
    store.token = null;
    (store.logout as ReturnType<typeof vi.fn>).mockClear();
    mockAlertUtils.error.mockClear();
    mockAlertUtils.warning.mockClear();
  });

  it('should attach Authorization header when token exists', async () => {
    const store = useLoginUserStore.getState();
    store.token = 'abc123';

    mock.onGet('/test').reply((config) => {
      expect(config.headers?.Authorization).toBe('Bearer abc123');
      return [200, { ok: true }];
    });

    const response = await api.get('/test');
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ ok: true });
  });

  it('should not attach Authorization header when no token', async () => {
    const store = useLoginUserStore.getState();
    store.token = null;

    mock.onGet('/test').reply((config) => {
      expect(config.headers?.Authorization).toBeUndefined();
      return [200, { ok: true }];
    });

    const response = await api.get('/test');
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ ok: true });
  });

  it('should call logout and show a warning alert on 401 response', async () => {
    const store = useLoginUserStore.getState();
    store.token = 'expired-token';

    mock.onGet('/protected').reply(401);

    await expect(api.get('/protected')).rejects.toBeTruthy();
    expect(store.logout).toHaveBeenCalledTimes(1);
    expect(mockAlertUtils.warning).toHaveBeenCalledWith(
      'Your session has expired. Please log in again.'
    );
  });

  it('should show an error alert for 4xx errors with a custom message', async () => {
    const store = useLoginUserStore.getState();
    store.token = 'valid-token';

    mock.onPost('/invalid-request').reply(400, { message: 'Invalid data provided.' });

    await expect(api.post('/invalid-request')).rejects.toBeTruthy();
    expect(mockAlertUtils.error).toHaveBeenCalledWith('Invalid data provided.');
  });

  it('should show a generic error alert for 4xx errors without a custom message', async () => {
    const store = useLoginUserStore.getState();
    store.token = 'valid-token';

    mock.onPost('/invalid-request').reply(404);

    await expect(api.post('/invalid-request')).rejects.toBeTruthy();
    expect(mockAlertUtils.error).toHaveBeenCalledWith('A client-side error occurred.');
  });

  it('should show an error alert for 5xx errors', async () => {
    const store = useLoginUserStore.getState();
    store.token = 'valid-token';

    mock.onGet('/server-error').reply(500);

    await expect(api.get('/server-error')).rejects.toBeTruthy();
    expect(store.logout).not.toHaveBeenCalled();
    expect(mockAlertUtils.error).toHaveBeenCalledWith('Server error. Please try again later.');
  });

  it('should show an error alert for network errors (no response)', async () => {
    // Mock a network error by using the networkError() helper
    mock.onGet('/network-error').networkError();

    await expect(api.get('/network-error')).rejects.toBeTruthy();
    expect(mockAlertUtils.error).toHaveBeenCalledWith(
      'Network error. Please check your internet connection.'
    );
  });
});
