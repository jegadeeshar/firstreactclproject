import React from 'react';
import { describe, it, expect, vi, type Mock, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
import routes from '@core/routes';
import { useRoutes } from 'react-router-dom';
import type { AppBarCustomProps } from '@/core/types';

// ────────────────────────────────────────────────
// 🧩 Mock react-router-dom
// ────────────────────────────────────────────────
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useRoutes: vi.fn(),
  };
});

// ────────────────────────────────────────────────
// 🧩 Mock useLabel
// ────────────────────────────────────────────────
vi.mock('@/core/hooks/useLabel', () => ({
  default: vi.fn(() => (key: string) => {
    const labels: Record<string, string> = { appTitle: 'Mock App Title' };
    return labels[key] ?? key;
  }),
}));

// ────────────────────────────────────────────────
// 🧩 Mock Zustand stores
// ────────────────────────────────────────────────
const mockUseLoginUserStore = vi.fn();
const mockUseLoaderStore = vi.fn();

vi.mock('@/core/store', () => ({
  useLoginUserStore: () => mockUseLoginUserStore(),
  useLoaderStore: () => mockUseLoaderStore(),
}));

// ────────────────────────────────────────────────
// 🧩 Mock components
// ────────────────────────────────────────────────
vi.mock('@core/components/Alert', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-alert">Mock Alert</div>,
}));

vi.mock('@/core/cdf-components/appbar/CdfAppBar', () => ({
  __esModule: true,
  default: ({ title, userName, branch }: AppBarCustomProps) => (
    <div data-testid="mock-appbar">
      {title} - {userName} - {branch}
    </div>
  ),
}));

vi.mock('@/core/layout/LayoutWrapper', () => ({
  __esModule: true,
  default: ({ layout, children }: { layout?: string; children?: React.ReactNode }) => (
    <div data-testid={`layout-wrapper-${layout || 'none'}`}>{children}</div>
  ),
}));

vi.mock('@/core/layout/LoaderOverlay', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-loader-overlay">Mock Loader</div>,
}));

// ────────────────────────────────────────────────
// 🧪 Test Suite
// ────────────────────────────────────────────────
describe('App component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseLoginUserStore.mockReturnValue({ username: 'testuser', branch: 'testbranch' });
    mockUseLoaderStore.mockReturnValue({ isLoading: false });
  });

  it('renders routes, AppBar, and CommonAlert correctly', () => {
    const mockElement = <div>Mock Routes</div>;
    (useRoutes as Mock).mockReturnValue(mockElement);

    render(<App />);

    // ✅ useRoutes called once
    expect(useRoutes).toHaveBeenCalledTimes(1);

    // ✅ Route mapping verified
    const args = (useRoutes as Mock).mock.calls[0][0];
    expect(Array.isArray(args)).toBe(true);
    expect(args.length).toBe(routes.length);
    expect(args[0]).toHaveProperty('element');

    // ✅ Route content rendered
    expect(screen.getByText('Mock Routes')).toBeInTheDocument();

    // ✅ AppBar rendered with correct props
    const appBar = screen.getByTestId('mock-appbar');
    expect(appBar).toHaveTextContent('Mock App Title - testuser - testbranch');

    // ✅ CommonAlert rendered
    expect(screen.getByTestId('mock-alert')).toBeInTheDocument();
  });

  it('renders LoaderOverlay regardless of loading state', () => {
    (useRoutes as Mock).mockReturnValue(<div>Mock Route</div>);
    mockUseLoaderStore.mockReturnValue({ isLoading: true });

    render(<App />);

    // ✅ LoaderOverlay rendered in DOM
    expect(screen.getByTestId('mock-loader-overlay')).toBeInTheDocument();
  });
});
