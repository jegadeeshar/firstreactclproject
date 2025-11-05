import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import useLabel from './useLabel';
import useLabelLookup from '@/core/hooks/useLabelLookup';
import { toPascalCase } from '@/core/utils/commonUtils';

// ✅ Mock dependencies
vi.mock('@/core/hooks/useLabelLookup', () => ({
  default: vi.fn(),
}));

vi.mock('@/core/utils/commonUtils', () => ({
  toPascalCase: vi.fn(),
  getNestedValue: vi.fn((obj: unknown, path: string) => {
    if (typeof obj !== 'object' || obj === null) return undefined;
    const keys = path.split('.');

    return keys.reduce<unknown>((acc, key) => {
      if (typeof acc === 'object' && acc !== null && key in acc) {
        return (acc as Record<string, unknown>)[key];
      }
      return undefined;
    }, obj);
  }),
}));

describe('useLabel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns an existing label when key is found', () => {
    (useLabelLookup as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      greeting: 'Hello World',
    });

    const { result } = renderHook(() => useLabel());
    const t = result.current;

    const value = t('greeting');
    expect(value).toBe('Hello World');
  });

  it('returns nested label using dot notation', () => {
    (useLabelLookup as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      user: { profile: { name: 'Anupama' } },
    });

    const { result } = renderHook(() => useLabel());
    const t = result.current;

    const value = t('user.profile.name');
    expect(value).toBe('Anupama');
  });

  it('returns an empty string when key is empty', () => {
    (useLabelLookup as unknown as ReturnType<typeof vi.fn>).mockReturnValue({});

    const { result } = renderHook(() => useLabel());
    const t = result.current;

    const value = t('');
    expect(value).toBe('');
  });

  it('calls toPascalCase when key not found and skipPascalCase is false', () => {
    (useLabelLookup as unknown as ReturnType<typeof vi.fn>).mockReturnValue({});
    (toPascalCase as unknown as ReturnType<typeof vi.fn>).mockReturnValue('Pascal Key');

    const { result } = renderHook(() => useLabel());
    const t = result.current;

    const value = t('missing.label');
    expect(toPascalCase).toHaveBeenCalledWith('missing.label');
    expect(value).toBe('Pascal Key');
  });

  it('returns raw key when skipPascalCase is true and label not found', () => {
    (useLabelLookup as unknown as ReturnType<typeof vi.fn>).mockReturnValue({});
    (toPascalCase as unknown as ReturnType<typeof vi.fn>).mockReturnValue('Pascal Key');

    const { result } = renderHook(() => useLabel());
    const t = result.current;

    const value = t('missing.label', true);
    expect(toPascalCase).not.toHaveBeenCalled();
    expect(value).toBe('missing.label');
  });

  it('memoizes correctly and does not recreate function when labels unchanged', () => {
    const mockLabels = { test: 'Label' };
    (useLabelLookup as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockLabels);

    const { result, rerender } = renderHook(() => useLabel());
    const fn1 = result.current;

    rerender();
    const fn2 = result.current;

    expect(fn1).toBe(fn2);
  });
});
