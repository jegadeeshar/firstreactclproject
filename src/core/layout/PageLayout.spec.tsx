import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import PageLayout from '@/core/layout/PageLayout';

// ✅ Properly mock MUI's useMediaQuery hook
vi.mock('@mui/material/useMediaQuery', () => ({
  __esModule: true,
  default: vi.fn(),
}));

import useMediaQuery from '@mui/material/useMediaQuery';
const mockedUseMediaQuery = vi.mocked(useMediaQuery);

// ---- Base MUI theme with custom properties ----
const theme = createTheme({
  customProperties: {
    headerHeight: 64,
    sidebarWidth: 375,
  },
});

describe('PageLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseMediaQuery.mockReturnValue(false); // default: desktop
  });

  const Wrapper = ({ sidebar }: { sidebar?: React.ReactNode }) => (
    <ThemeProvider theme={theme}>
      <PageLayout sidebar={sidebar}>
        <div data-testid="childContent">Main Content</div>
      </PageLayout>
    </ThemeProvider>
  );

  it('renders the main layout container', () => {
    render(<Wrapper />);
    expect(screen.getByTestId('pageLayout')).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    render(<Wrapper />);
    expect(screen.getByTestId('childContent')).toBeInTheDocument();
  });

  it('renders sidebar when provided', () => {
    render(<Wrapper sidebar={<div data-testid="sidebar">Sidebar Content</div>} />);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  it('renders correctly on mobile (isMobile = true)', () => {
    mockedUseMediaQuery.mockReturnValue(true);
    render(<Wrapper sidebar={<div data-testid="sidebar">Sidebar Content</div>} />);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  it('renders even if customProperties.sidebarWidth is missing', () => {
    const themeWithoutSidebarWidth = createTheme({
      customProperties: { headerHeight: 64 },
    });

    mockedUseMediaQuery.mockReturnValue(false);
    render(
      <ThemeProvider theme={themeWithoutSidebarWidth}>
        <PageLayout>
          <div data-testid="content">Form content</div>
        </PageLayout>
      </ThemeProvider>
    );

    expect(screen.getByTestId('content')).toBeInTheDocument();
  });
});
