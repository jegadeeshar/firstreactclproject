import { describe, it, expect, vi, type Mock } from 'vitest';
import { render, screen } from '@testing-library/react';
import DynamicGrid from './DynamicGrid';
import useLabel from '@/core/hooks/useLabel';

// ────────────────────────────────────────────────
// Mock hook
// ────────────────────────────────────────────────
vi.mock('@/core/hooks/useLabel');
const mockedUseLabel = useLabel as Mock;

describe('DynamicGrid', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the title and translated labels correctly when data is provided', () => {
    const testData = {
      order_id: 'ORD-555-123',
      shipping_method: 'Express',
    };

    // ✅ Mock returns a function that translates keys
    mockedUseLabel.mockReturnValue((key: string) => {
      const labels: Record<string, string> = {
        order_id: 'Order Number',
        shipping_method: 'Shipping Method',
      };
      return labels[key] ?? key;
    });

    render(<DynamicGrid title="Order Details" data={testData} />);

    expect(screen.getByRole('heading', { name: 'Order Details' })).toBeInTheDocument();
    expect(screen.getByText('Order Number')).toBeInTheDocument();
    expect(screen.getByText('Shipping Method')).toBeInTheDocument();
    expect(screen.getByText('ORD-555-123')).toBeInTheDocument();
    expect(screen.getByText('Express')).toBeInTheDocument();
  });

  it('uses transformed key as fallback when label missing', () => {
    const testData = {
      order_id: 'ORD-555-123',
      untranslated_key: 'Some Value',
    };

    // ✅ Mock only provides translation for one key
    mockedUseLabel.mockReturnValue((key: string) => {
      const labels: Record<string, string> = {
        order_id: 'Order Number',
      };
      // Simulate fallback that formats key into PascalCase
      return labels[key] ?? key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    });

    render(<DynamicGrid data={testData} />);

    expect(screen.getByText('Order Number')).toBeInTheDocument();
    expect(screen.getByText('Untranslated Key')).toBeInTheDocument();
  });

  it('renders nothing if data is empty', () => {
    mockedUseLabel.mockReturnValue(() => '');

    const { container } = render(<DynamicGrid title="Should Not Show" data={{}} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing if data is undefined', () => {
    mockedUseLabel.mockReturnValue(() => '');

    const { container } = render(<DynamicGrid title="Should Not Show" />);
    expect(container).toBeEmptyDOMElement();
  });
});
