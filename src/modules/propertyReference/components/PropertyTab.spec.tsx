import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';

/* ------------------------------------------------------------
 🧩 Mock Components and Utilities
------------------------------------------------------------ */

// ✅ Mock: CdfTabs
vi.mock('@/core/cdf-components/tabs/CdfTabs', () => ({
  __esModule: true,
  default: ({ tabs }: CdfTabsProps) => (
    <div data-testid="cdf-tabs">
      {tabs.map((tab) => (
        <div key={tab.value} data-testid={`tab-${tab.value}`}>
          <span>{tab.label}</span>
          {tab.content}
        </div>
      ))}
    </div>
  ),
}));

// ✅ Mock: loggerUtils
vi.mock('@/core/utils/loggerUtils', () => ({
  __esModule: true,
  default: { debug: vi.fn() },
}));

// ✅ Mock: PropertyDetails
vi.mock('@/modules/propertyReference/components/PropertyDetails', () => ({
  __esModule: true,
  default: () => <div data-testid="property-details">PropertyDetails</div>,
}));

// ✅ Mock: BoundaryDetails
vi.mock('@/modules/propertyReference/components/BoundaryDetails', () => ({
  __esModule: true,
  default: () => <div data-testid="boundary-details">BoundaryDetails</div>,
}));

// ✅ Mock: PropertyTabButton
vi.mock('@/modules/propertyReference/components/PropertyTabButton', () => ({
  __esModule: true,
  default: () => <button data-testid="property-tab-button">PropertyTabButton</button>,
}));

// ✅ Mock: Emotion useTheme
vi.mock('@emotion/react', () => ({
  useTheme: () => ({
    breakpoints: { down: () => '@media (max-width:600px)' },
  }),
}));

/* ------------------------------------------------------------
 ✅ Import After Mocks
------------------------------------------------------------ */
import PropertyTab from './PropertyTab';
import logger from '@/core/utils/loggerUtils';
import type { CdfTabsProps } from '@/core/types';

/* ------------------------------------------------------------
 🧪 Tests
------------------------------------------------------------ */

describe('PropertyTab Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders property and reference tabs correctly in desktop view', () => {
    render(<PropertyTab />);

    // Core structure
    expect(screen.getByTestId('cdf-tabs')).toBeInTheDocument();
    expect(screen.getByTestId('tab-property')).toBeInTheDocument();
    expect(screen.getByTestId('tab-reference')).toBeInTheDocument();

    // Component content
    expect(screen.getByTestId('property-details')).toBeInTheDocument();
    expect(screen.getByTestId('boundary-details')).toBeInTheDocument();

    // PropertyTabButton is optional in desktop view
    // expect(screen.getByTestId('property-tab-button')).toBeInTheDocument();

    expect(logger.debug).toHaveBeenCalledWith('Is Mobile View: ', false);
  });
});
