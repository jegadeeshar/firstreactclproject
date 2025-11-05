import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CdfAccordion } from './CdfAccordion';

describe('CdfAccordion', () => {
  it('renders the accordion with summary and details', () => {
    render(<CdfAccordion summary="Test Summary" details="Test Details" />);

    expect(screen.getByText('Test Summary')).toBeInTheDocument();
    expect(screen.getByText('Test Details')).toBeInTheDocument();
  });

  it('expands on summary click', () => {
    render(<CdfAccordion summary="Clickable Summary" details="Details Content" />);

    const summary = screen.getByText('Clickable Summary');
    const details = screen.getByText('Details Content');

    // Initially collapsed
    expect(details).not.toBeVisible();

    // Click to expand
    fireEvent.click(summary);
    expect(details).toBeVisible();
  });

  it('is expanded by default when defaultExpanded is true', () => {
    render(<CdfAccordion defaultExpanded summary="Expanded Summary" details="Expanded Details" />);

    const details = screen.getByText('Expanded Details');
    expect(details).toBeVisible();
  });
});
