import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { type ReactNode } from 'react';
import useLabelLookup from './useLabelLookup';
import LabelContext from '@/core/providers/LabelContext';
import type { Labels } from '@/core/types';

describe('useLabelLookup', () => {
  it('throws an error if used outside of a LabelProvider', () => {
    expect(() => renderHook(() => useLabelLookup())).toThrowError(
      'useLabelLookup must be used within a LabelsProvider'
    );
  });

  it('returns label context when used inside a LabelProvider', () => {
    const mockLabels: Labels = {
      greeting: 'Hello',
      farewell: 'Goodbye',
    } as Labels;

    // ✅ Wrapper component for providing context
    const Wrapper = ({ children }: { children?: ReactNode }) => (
      <LabelContext.Provider value={mockLabels}>{children}</LabelContext.Provider>
    );

    const { result } = renderHook(() => useLabelLookup(), { wrapper: Wrapper });

    expect(result.current).toEqual(mockLabels);
    expect(result.current.greeting).toBe('Hello');
    expect(result.current.farewell).toBe('Goodbye');
  });
});
