import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Sidebar from '@/core/layout/Sidebar';

// ---- Create mock theme with required custom properties ----
const theme = createTheme({
  customProperties: {
    sidebarWidth: 365,
  },
});

// ---- Helper wrapper to inject theme ----
const renderWithTheme = (ui: React.ReactNode) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe('Sidebar', () => {
  it('renders the sidebar element', () => {
    renderWithTheme(
      <Sidebar>
        <div>Child Content</div>
      </Sidebar>
    );
    const sidebar = screen.getByRole('complementary'); // <aside> defaults to "complementary" role
    expect(sidebar).toBeInTheDocument();
    expect(sidebar).toHaveClass('sidebar');
  });

  it('applies the provided className', () => {
    renderWithTheme(
      <Sidebar className="custom-class">
        <div>Child Content</div>
      </Sidebar>
    );
    const sidebar = screen.getByRole('complementary');
    expect(sidebar).toHaveClass('sidebar custom-class');
  });

  it('renders children correctly', () => {
    renderWithTheme(
      <Sidebar>
        <div>Child Content</div>
      </Sidebar>
    );
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('has correct default inline styles from theme', () => {
    renderWithTheme(
      <Sidebar>
        <div>Child Content</div>
      </Sidebar>
    );
    const sidebar = screen.getByRole('complementary');
    expect(sidebar).toHaveStyle({
      width: `${theme.customProperties.sidebarWidth}px`,
      height: '100vh',
    });
  });
});
