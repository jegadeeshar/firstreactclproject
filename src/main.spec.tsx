import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

// 🧩 Mock ReactDOM
const mockRender = vi.fn();
const mockCreateRoot = vi.fn(() => ({ render: mockRender }));
vi.mock('react-dom/client', () => ({
  createRoot: mockCreateRoot,
}));

// 🧩 Mock BrowserRouter
vi.mock('react-router-dom', () => ({
  __esModule: true,
  BrowserRouter: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="browser-router">{children}</div>
  ),
}));

// 🧩 Mock MUI (ThemeProvider + CssBaseline)
vi.mock('@mui/material', () => ({
  __esModule: true,
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="theme-provider">{children}</div>
  ),
  CssBaseline: () => <div data-testid="css-baseline" />,
}));

// 🧩 Mock theme
vi.mock('@core/theme', () => ({
  __esModule: true,
  default: { palette: { mode: 'light' } },
}));

// 🧩 Mock App, ErrorFallback, LabelProvider
vi.mock('@core/containers/App.tsx', () => ({
  __esModule: true,
  default: () => <div data-testid="app" />,
}));

vi.mock('@core/containers/ErrorFallback', () => ({
  __esModule: true,
  default: () => <div data-testid="error-fallback" />,
}));

vi.mock('@/core/providers/LabelProvider', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="label-provider">{children}</div>
  ),
}));

describe('main entry file', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    document.body.innerHTML = '';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('renders the React application when #root exists', async () => {
    document.body.innerHTML = '<div id="root"></div>';
    const rootElement = document.getElementById('root') as HTMLElement;

    // ✅ Dynamically import main AFTER mocks are ready
    await import('./main');

    expect(mockCreateRoot).toHaveBeenCalledWith(rootElement);
    expect(mockRender).toHaveBeenCalledTimes(1);

    // 🔍 Instead of stringifying, actually render the mock React element
    const renderedTree = mockRender.mock.calls[0][0] as React.ReactElement;
    render(renderedTree);

    // ✅ Now we can check for our mocked test IDs
    expect(screen.getByTestId('browser-router')).toBeInTheDocument();
    expect(screen.getByTestId('theme-provider')).toBeInTheDocument();
    expect(screen.getByTestId('label-provider')).toBeInTheDocument();
    expect(screen.getByTestId('app')).toBeInTheDocument();
  });

  it('does nothing if #root does not exist', async () => {
    document.body.innerHTML = '';
    await import('./main');

    expect(mockCreateRoot).not.toHaveBeenCalled();
    expect(mockRender).not.toHaveBeenCalled();
  });
});
