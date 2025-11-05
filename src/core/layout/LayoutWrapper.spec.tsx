import React, { Suspense } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import customTheme from '@core/theme';
import LayoutWrapper from './LayoutWrapper';

// ────────────────────────────────────────────────
// 🧩 Mock Sidebar
// ────────────────────────────────────────────────
vi.mock('@/core/layout/Sidebar', () => ({
  __esModule: true,
  default: ({ children }: { children?: React.ReactNode }) => (
    <div data-testid="mock-sidebar">{children}</div>
  ),
}));

// ────────────────────────────────────────────────
// 🧩 Mock PageLayout (lazy import target)
// ────────────────────────────────────────────────
const MockPageLayout = ({
  sidebar,
  children,
}: {
  sidebar?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div data-testid="mock-page-layout">
    {sidebar && <div data-testid="mock-sidebar-slot">{sidebar}</div>}
    <div data-testid="mock-content">{children}</div>
  </div>
);

vi.mock('./PageLayout', () => ({
  __esModule: true,
  default: MockPageLayout,
}));

// ────────────────────────────────────────────────
// 🧪 Tests
// ────────────────────────────────────────────────
describe('LayoutWrapper', () => {
  const renderWithSuspense = (ui: React.ReactNode) =>
    render(
      <ThemeProvider theme={customTheme}>
        <Suspense fallback={<div>loading...</div>}>{ui}</Suspense>
      </ThemeProvider>
    );

  // ✅ Case 1: layout = "main" → should include Sidebar
  it('renders PageLayout with Sidebar when layout="main"', async () => {
    renderWithSuspense(
      <LayoutWrapper layout="main">
        <div data-testid="child">Main Layout Content</div>
      </LayoutWrapper>
    );

    expect(await screen.findByTestId('mock-page-layout')).toBeInTheDocument();
    expect(screen.getByTestId('mock-sidebar-slot')).toBeInTheDocument();
    expect(screen.getByTestId('mock-sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toHaveTextContent('Main Layout Content');
  });

  // ✅ Case 2: layout = "home" → should NOT include Sidebar
  it('renders PageLayout without Sidebar when layout="home"', async () => {
    renderWithSuspense(
      <LayoutWrapper layout="home">
        <div data-testid="child">Home Layout Content</div>
      </LayoutWrapper>
    );

    expect(await screen.findByTestId('mock-page-layout')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-sidebar-slot')).toBeNull();
    expect(screen.getByTestId('child')).toHaveTextContent('Home Layout Content');
  });

  // ✅ Case 3: layout = "auth" → should NOT include Sidebar
  it('renders PageLayout without Sidebar when layout="auth"', async () => {
    renderWithSuspense(
      <LayoutWrapper layout="auth">
        <div data-testid="child">Auth Layout Content</div>
      </LayoutWrapper>
    );

    expect(await screen.findByTestId('mock-page-layout')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-sidebar-slot')).toBeNull();
    expect(screen.getByTestId('child')).toHaveTextContent('Auth Layout Content');
  });

  // ✅ Case 4: layout undefined → should fall back to "main" branch (include Sidebar)
  it('renders PageLayout with Sidebar when layout is undefined (default case)', async () => {
    renderWithSuspense(
      <LayoutWrapper>
        <div data-testid="child">Default Layout Content</div>
      </LayoutWrapper>
    );

    expect(await screen.findByTestId('mock-page-layout')).toBeInTheDocument();
    expect(screen.getByTestId('mock-sidebar-slot')).toBeInTheDocument();
    expect(screen.getByTestId('mock-sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toHaveTextContent('Default Layout Content');
  });
});
