import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import LoaderOverlay from './LoaderOverlay';

// ✅ Mock MUI styled to just return its component for testing simplicity
vi.mock('@mui/material', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@mui/material')>();
  return {
    ...actual,
    styled: (component: BoxProps) => () => component,
  };
});

// ✅ Mock store hook
vi.mock('@/core/store', () => ({
  useLoaderStore: vi.fn(),
}));

import { useLoaderStore } from '@/core/store';
import type { BoxProps } from '@mui/material';

describe('LoaderOverlay', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders nothing when isLoading is false', () => {
    (useLoaderStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ isLoading: false });

    const { container } = render(<LoaderOverlay />);
    expect(container.firstChild).toBeNull();
  });

  it('renders loader overlay when isLoading is true', () => {
    (useLoaderStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ isLoading: true });

    render(<LoaderOverlay />);
    const progress = screen.getByRole('progressbar');
    expect(progress).toBeInTheDocument();
  });
});
