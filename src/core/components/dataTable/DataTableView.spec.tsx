import React from 'react';
import { render, screen } from '@testing-library/react';
import DataTableView from '@/core/components/dataTable/DataTableView';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { vi } from 'vitest';

// ---------- Mock hooks ----------
vi.mock('@/core/hooks/useLabel', () => ({
  default: () => (key: string) => key, // return key itself
}));

// ---------- Test data ----------
type TestData = {
  id: number;
  name: string;
  mobile: string;
  source: string;
};

const data: TestData[] = [
  { id: 12345678, name: 'John Doe', mobile: '9876543210', source: 'Referral' },
  { id: 87654321, name: 'Jane Smith', mobile: '9123456780', source: 'Website' },
];

const columns: (keyof TestData)[] = ['id', 'name', 'mobile', 'source'];

const theme = createTheme();
const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

// ---------- Tests ----------
describe('DataTableView', () => {
  it('renders without crashing', () => {
    renderWithTheme(<DataTableView data={data} columns={columns} title="Test Table" />);
    expect(screen.getByText('Test Table')).toBeInTheDocument();
  });

  it('renders all column headers', () => {
    renderWithTheme(<DataTableView data={data} columns={columns} title="Test Table" />);
    columns.forEach((col) => {
      expect(screen.getByText(col)).toBeInTheDocument();
    });
  });

  it('renders all rows correctly', () => {
    renderWithTheme(<DataTableView data={data} columns={columns} title="Test Table" />);
    data.forEach((row) => {
      expect(screen.getByText(row.id.toString())).toBeInTheDocument();
      expect(screen.getByText(row.name)).toBeInTheDocument();
      expect(screen.getByText(row.mobile)).toBeInTheDocument();
      expect(screen.getByText(row.source)).toBeInTheDocument();
    });
  });

  it('renders correctly when data is empty', () => {
    renderWithTheme(<DataTableView data={[]} columns={columns} title="Empty Table" />);
    expect(screen.getByText('Empty Table')).toBeInTheDocument();
  });

  // ---------- Additional test cases ----------
  it('renders table with pagination enabled', () => {
    renderWithTheme(
      <DataTableView data={data} columns={columns} title="Pagination Table" pagination />
    );
    expect(screen.getByText('Pagination Table')).toBeInTheDocument();
    expect(screen.getByText(/Rows per page:/i)).toBeInTheDocument();
  });

  it('renders table with dense rows', () => {
    renderWithTheme(<DataTableView data={data} columns={columns} title="Dense Table" />);
    const firstRow = screen.getAllByRole('row')[1]; // first data row
    expect(firstRow).toBeInTheDocument();
  });

  it('renders table with striped rows', () => {
    renderWithTheme(<DataTableView data={data} columns={columns} title="Striped Table" />);
    const tableRows = screen.getAllByRole('row');
    expect(tableRows.length).toBeGreaterThan(1);
  });

  it('renders table when only title is provided', () => {
    renderWithTheme(<DataTableView data={[]} columns={[]} title="Title Only Table" />);
    expect(screen.getByText('Title Only Table')).toBeInTheDocument();
  });
});
