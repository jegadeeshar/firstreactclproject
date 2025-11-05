import { describe, it, expect, vi, beforeEach } from 'vitest';
import logger from './loggerUtils';

describe('logger', () => {
  beforeEach(() => {
    // Spy on console methods and reset mocks
    vi.spyOn(console, 'info').mockImplementation(() => {});
    vi.spyOn(console, 'debug').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.clearAllMocks();
  });

  it('should call console.info when info is called', () => {
    logger.info('Test info', 123);

    expect(console.info).toHaveBeenCalledWith('[INFO]', 'Test info', 123);
  });

  it('should call console.debug when debug is called', () => {
    logger.debug('Test debug');

    expect(console.debug).toHaveBeenCalledWith('[DEBUG]', 'Test debug');
  });

  it('should call console.warn when warn is called', () => {
    logger.warn('Test warn');

    expect(console.warn).toHaveBeenCalledWith('[WARN]', 'Test warn');
  });

  it('should call console.error when error is called', () => {
    logger.error('Test error', { code: 500 });

    expect(console.error).toHaveBeenCalledWith('[ERROR]', 'Test error', { code: 500 });
  });
});
