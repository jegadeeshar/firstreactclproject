import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CdfTable from './CdfTable';

describe('CdfTable', () => {
  const headers = ['FIRST NAME', 'LAST NAME', 'GENDER'];

  it('renders table headers correctly', () => {
    render(<CdfTable headers={headers} rows={[]} />);

    headers.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  it("shows 'No Data Available' when rows are empty", () => {
    render(<CdfTable headers={headers} rows={[]} />);
    expect(screen.getByText(/No Data Available/i)).toBeInTheDocument();
  });

  it('renders table rows correctly', () => {
    const rows = [{ 'FIRST NAME': 'COUSTMER', 'LAST NAME': 'HI', GENDER: 'MALE' }];

    render(<CdfTable headers={headers} rows={rows} />);

    expect(screen.getByText('COUSTMER')).toBeInTheDocument();
    expect(screen.getByText('HI')).toBeInTheDocument();
    expect(screen.getByText('MALE')).toBeInTheDocument();
  });

  it("renders '-' if a header is missing in the row", () => {
    const rows = [{ 'FIRST NAME': 'COUSTMER' }];

    render(<CdfTable headers={headers} rows={rows} />);

    expect(screen.getAllByText('-').length).toBeGreaterThan(0);
  });
});
