import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CdfPillTabs from '@cdf-components/tabs/CdfPillTabs';

describe('CdfPillTabs Component', () => {
  const tabs = ['New leads', 'Assigned', 'Review'];

  test('renders all tabs', () => {
    render(<CdfPillTabs tabs={tabs} />);
    tabs.forEach((tabLabel) => {
      expect(screen.getByText(tabLabel)).toBeInTheDocument();
    });
  });

  test('first tab is active by default', () => {
    render(<CdfPillTabs tabs={tabs} />);
    const firstTab = screen.getByText(tabs[0]);
    expect(firstTab).toBeInTheDocument();
    expect(firstTab).toHaveAttribute('aria-selected', 'true');
  });

  test('clicking a tab sets it active', () => {
    render(<CdfPillTabs tabs={tabs} />);
    const firstTab = screen.getByText(tabs[0]);
    const secondTab = screen.getByText(tabs[1]);

    fireEvent.click(secondTab);

    expect(secondTab).toHaveAttribute('aria-selected', 'true');
    expect(firstTab).toHaveAttribute('aria-selected', 'false');
  });

  test('renders with initialValue prop', () => {
    render(<CdfPillTabs tabs={tabs} initialValue={1} />);
    const activeTab = screen.getByText(tabs[1]);
    expect(activeTab).toBeInTheDocument();
    expect(activeTab).toHaveAttribute('aria-selected', 'true');
  });

  test('does not break with empty tabs array', () => {
    render(<CdfPillTabs tabs={[]} />);
    expect(screen.queryAllByRole('tab')).toHaveLength(0);
  });

  test('handles multiple tab clicks', () => {
    render(<CdfPillTabs tabs={tabs} />);
    const firstTab = screen.getByText(tabs[0]);
    const secondTab = screen.getByText(tabs[1]);
    const thirdTab = screen.getByText(tabs[2]);

    fireEvent.click(secondTab);
    fireEvent.click(thirdTab);

    expect(thirdTab).toHaveAttribute('aria-selected', 'true');
    expect(firstTab).toBeInTheDocument();
  });
});
