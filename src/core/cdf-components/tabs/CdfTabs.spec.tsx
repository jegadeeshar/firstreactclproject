import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CdfTabs from './CdfTabs';
import type { TabItem } from '@/core/types';

describe('CdfTabs', () => {
  const tabs: TabItem[] = [
    { label: 'Bureau Validation', value: 'bureau', content: <div>this is Bureau page</div> },
    { label: 'Dedupe Details', value: 'dedupe', content: <div>this is Dedupe page</div> },
  ];

  it('renders all tabs', () => {
    render(<CdfTabs tabs={tabs} defaultValue="bureau" />);

    // Check tab labels
    expect(screen.getByText('Bureau Validation')).toBeInTheDocument();
    expect(screen.getByText('Dedupe Details')).toBeInTheDocument();

    // Check default content
    expect(screen.getByText('this is Bureau page')).toBeInTheDocument();
    expect(screen.queryByText('this is Dedupe page')).not.toBeInTheDocument();
  });

  it('switches tab content when clicked', () => {
    render(<CdfTabs tabs={tabs} defaultValue="bureau" />);

    // Click second tab
    fireEvent.click(screen.getByText('Dedupe Details'));

    // Check content updates
    expect(screen.getByText('this is Dedupe page')).toBeInTheDocument();
    expect(screen.queryByText('this is Bureau page')).not.toBeInTheDocument();
  });
});
