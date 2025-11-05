import { describe, it, expect, vi, beforeEach } from 'vitest';
import api from '@core/interceptors/axiosInterceptor';
import { get, post, put, del } from './httpUtils';

vi.mock('@core/interceptors/axiosInterceptor', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('httpUtils', () => {
  const mockData = { success: true };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('get should call api.get and return data', async () => {
    (api.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ data: mockData });

    const result = await get('/test');
    expect(api.get).toHaveBeenCalledWith('/test', undefined);
    expect(result).toEqual(mockData);
  });

  it('post should call api.post and return data', async () => {
    (api.post as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ data: mockData });

    const payload = { name: 'test' };
    const result = await post('/test', payload);
    expect(api.post).toHaveBeenCalledWith('/test', payload, undefined);
    expect(result).toEqual(mockData);
  });

  it('put should call api.put and return data', async () => {
    (api.put as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ data: mockData });

    const payload = { name: 'update' };
    const result = await put('/test', payload);
    expect(api.put).toHaveBeenCalledWith('/test', payload, undefined);
    expect(result).toEqual(mockData);
  });

  it('del should call api.delete and return data', async () => {
    (api.delete as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ data: mockData });

    const result = await del('/test');
    expect(api.delete).toHaveBeenCalledWith('/test', undefined);
    expect(result).toEqual(mockData);
  });
});
