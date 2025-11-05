import { useMemo } from 'react';
import DataTable from 'react-data-table-component';
import type { TableColumn } from 'react-data-table-component';
import { Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import type { CdfDataTableProps } from '@core/types/DataTableViewTypes';
import useLabel from '@/core/hooks/useLabel';

// ---------- Styled Components ----------

const StyledContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.grey[100],
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
}));

const StyledCard = styled(Box)(() => ({
  width: '100%',
  maxWidth: '1200px',
  backgroundColor: 'transparent',
  borderRadius: '8px',
  overflow: 'visible',
}));

const customTableStyles = (theme: Theme) => ({
  table: { style: { backgroundColor: 'transparent', borderRadius: '8px' } },
  headRow: { style: { backgroundColor: 'transparent' } },
  headCells: {
    style: {
      fontWeight: 600,
      fontSize: '12px',
      color: theme.palette.grey[800],
      backgroundColor: 'transparent',
    },
  },
  rows: {
    style: {
      backgroundColor: theme.palette.background.paper,
      minHeight: '60px',
      marginBottom: '12px',
      borderRadius: '8px',
      fontSize: '14px',
    },
    stripedStyle: { backgroundColor: theme.palette.background.paper },
  },
  cells: { style: { padding: '12px 16px' } },
});

// ---------- Component ----------

const DataTableView = <T extends object>({
  data, // json data to display
  columns, // key name array
  title,
  pagination = true,
}: CdfDataTableProps<T>) => {
  const theme = useTheme();
  const t = useLabel();

  // Use columns passed as prop if available, otherwise auto-generate from data
  const columnObj: TableColumn<T>[] = useMemo(() => {
    return columns.map((key: string) => ({
      name: t(key, true), // column header = key
      selector: (row: T) => row[key as keyof T] as unknown as string | number | boolean, // properly typed
      sortable: true,
    }));
  }, [columns, t]);

  return (
    <StyledContainer>
      <StyledCard>
        <DataTable
          title={title}
          columns={columnObj}
          data={data}
          highlightOnHover
          striped
          dense
          pagination={pagination}
          customStyles={customTableStyles(theme)}
        />
      </StyledCard>
    </StyledContainer>
  );
};

export default DataTableView;
