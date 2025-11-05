import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import React from 'react';
import LabelProvider from './LabelProvider';
import { useLoginUserStore } from '@/core/store';
import logger from '@/core/utils/loggerUtils';
import LabelContext from '@/core/providers/LabelContext';

// ─────────────────────────────
// ✅ Properly Mock Dependencies
// ─────────────────────────────
vi.mock('@/core/store', () => ({
  useLoginUserStore: vi.fn(),
}));

vi.mock('@/core/utils/loggerUtils', () => ({
  default: {
    info: vi.fn(),
    error: vi.fn(),
  },
}));

// ✅ Mock label JSON modules (simulate label files in /src/core/labels)
const mockLabelModules = {
  '/src/core/labels/default.json': {
    default: {
      appTitle: 'LAP',
      domain: 'LAP',
      buttonSubmit: 'Submit',
      buttonSaveAndNext: 'Submit',
      branch: 'Branch',
      email: 'Email ID',
      mobile: 'Mobile Number',
    },
  },
  '/src/core/labels/lap.json': {
    default: {
      greeting: 'Hello Domain A',
      welcome: 'Welcome Domain A',
    },
  },
};

// ✅ Mock import.meta.glob for Vite
vi.stubGlobal('import.meta', {
  glob: vi.fn(() => ({
    '/src/core/labels/default.json': mockLabelModules['/src/core/labels/default.json'],
    '/src/core/labels/lap.json': mockLabelModules['/src/core/labels/lap.json'],
  })),
});

const mockUseLoginUserStore = useLoginUserStore as unknown as Mock;

// ─────────────────────────────
// ✅ Test Suite
// ─────────────────────────────
describe('LabelProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const TestConsumer = () => {
    const labels = React.useContext(LabelContext);
    return <div data-testid="labels-consumer">{JSON.stringify(labels)}</div>;
  };

  // ✅ Case 1: Default domain (lap.json)
  it('renders with default LAP labels when no domain is set', async () => {
    mockUseLoginUserStore.mockReturnValue('');

    render(
      <LabelProvider>
        <TestConsumer />
      </LabelProvider>
    );

    await waitFor(() => {
      const content = screen.getByTestId('labels-consumer').textContent || '';
      expect(content).toContain('LAP');
      expect(content).toContain('Submit');
      expect(content).toContain('Email ID');
    });

    expect(logger.info).toHaveBeenCalledWith(
      expect.stringContaining('Loaded labels for domain: , matchedKey:')
    );
  });

  // ✅ Case 3: Fallback to LAP when domain missing
  it('falls back to LAP default labels if the specific domain file is missing', async () => {
    mockUseLoginUserStore.mockReturnValue('unknownDomain');

    render(
      <LabelProvider>
        <TestConsumer />
      </LabelProvider>
    );

    await waitFor(() => {
      const content = screen.getByTestId('labels-consumer').textContent || '';
      expect(content).toContain('LAP');
      expect(content).toContain('Submit');
    });

    expect(logger.info).toHaveBeenCalledWith(
      expect.stringContaining('Loaded labels for domain: unknownDomain, matchedKey: undefined')
    );
  });
});
