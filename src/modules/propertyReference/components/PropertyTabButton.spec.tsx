import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import PropertyTabButton from '@/modules/propertyReference/components/PropertyTabButton';
import logger from '@/core/utils/loggerUtils';
import type { BoxProps, GridProps } from '@mui/material';
import type { CdfLinkProps } from '@/core/cdf-components/link/CdfLink';
import type { CdfTabsProps } from '@/core/types';

/* ------------------------------------------------------------
 ✅ Define types for props of mocked components
------------------------------------------------------------ */

/* ------------------------------------------------------------
 🧩 Safe Mocks
------------------------------------------------------------ */

// Mock logger
vi.mock('@/core/utils/loggerUtils', () => ({
  __esModule: true,
  default: {
    debug: vi.fn(),
  },
}));

// Mock MUI components
const mockUseTheme = vi.fn();
const mockUseMediaQuery = vi.fn();

vi.mock('@mui/material', () => ({
  __esModule: true,

  Box: ({ children, ...props }: BoxProps) => (
    <div data-testid="box" className={props.className}>
      {children}
    </div>
  ),

  Grid: ({ children, className }: GridProps) => (
    <div data-testid="grid" className={className}>
      {children}
    </div>
  ),

  useTheme: () => mockUseTheme(),
  useMediaQuery: (query: string) => mockUseMediaQuery(query),
}));

// Mock MUI icon
vi.mock('@mui/icons-material/AddCircleOutline', () => ({
  __esModule: true,
  default: () => <div data-testid="add-icon">Icon</div>,
}));

// Mock CdfLink
vi.mock('@/core/cdf-components/link/CdfLink', () => ({
  __esModule: true,
  default: ({ icon, label, onClick }: CdfLinkProps) => (
    <button data-testid="cdf-link" onClick={onClick}>
      {icon}
      {label}
    </button>
  ),
}));

// Mock CdfTabs
vi.mock('@/core/cdf-components/tabs/CdfTabs', () => ({
  __esModule: true,
  default: ({ defaultValue, tabs }: CdfTabsProps) => (
    <div data-testid="cdf-tabs">
      <span>Default: {defaultValue}</span>
      {tabs.map((tab) => (
        <div key={tab.value} data-testid={`tab-${tab.value}`}>
          {tab.label}
        </div>
      ))}
    </div>
  ),
}));

/* ------------------------------------------------------------
 🧪 Test Suite
------------------------------------------------------------ */

describe('PropertyTabButton Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders Box, Grid, Tabs, and Link correctly', () => {
    mockUseTheme.mockReturnValue({ breakpoints: { down: vi.fn(() => 'sm-query') } });
    mockUseMediaQuery.mockReturnValue(false);

    render(<PropertyTabButton />);

    expect(screen.getByTestId('box')).toBeInTheDocument();
    expect(screen.getAllByTestId('grid').length).toBeGreaterThan(0);
    expect(screen.getByTestId('cdf-tabs')).toBeInTheDocument();
    expect(screen.getByTestId('cdf-link')).toBeInTheDocument();
    expect(screen.getByTestId('add-icon')).toBeInTheDocument();
  });

  it('calls logger.debug with correct mobile view status', () => {
    mockUseTheme.mockReturnValue({ breakpoints: { down: vi.fn(() => 'sm-query') } });
    mockUseMediaQuery.mockReturnValue(true);

    render(<PropertyTabButton />);
    expect(logger.debug).toHaveBeenCalledWith('Is Mobile View: ', true);
  });

  it('renders the correct tab label and value', () => {
    mockUseTheme.mockReturnValue({ breakpoints: { down: vi.fn(() => 'sm-query') } });
    mockUseMediaQuery.mockReturnValue(false);

    render(<PropertyTabButton />);
    expect(screen.getByTestId('tab-property1')).toHaveTextContent('Property 1');
  });

  it('handles Add Link click correctly', () => {
    mockUseTheme.mockReturnValue({ breakpoints: { down: vi.fn(() => 'sm-query') } });
    mockUseMediaQuery.mockReturnValue(false);

    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    render(<PropertyTabButton />);
    const addLink = screen.getByTestId('cdf-link');
    fireEvent.click(addLink);

    expect(consoleSpy).toHaveBeenCalledWith('Add Account clicked');
    consoleSpy.mockRestore();
  });
});
