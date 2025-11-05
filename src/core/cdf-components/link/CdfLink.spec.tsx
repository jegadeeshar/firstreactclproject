import { render, screen, fireEvent } from '@testing-library/react';
import CdfLink from './CdfLink';
import DescriptionIcon from '@mui/icons-material/Description';
import { vi } from 'vitest';

describe('CdfLink', () => {
  it('renders label and icon', () => {
    render(<CdfLink label="Update Report" icon={<DescriptionIcon />} href="/update-report" />);
    expect(screen.getByText('Update Report')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(
      <CdfLink label="Click Me" icon={<DescriptionIcon />} href="/click-me" onClick={handleClick} />
    );
    fireEvent.click(screen.getByRole('link'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders with href and target', () => {
    render(<CdfLink label="Docs" icon={<DescriptionIcon />} href="https://example.com" />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://example.com');
  });
});
