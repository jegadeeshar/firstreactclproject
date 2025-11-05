import type { CdfTableProps } from '@/core/types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// ---------------- STYLED COMPONENTS ----------------

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: 'none',
  borderRadius: theme.shape.borderRadius,
  overflowX: 'auto',
  '&::-webkit-scrollbar': { display: 'none' },
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(1.2, 2),
  '&:first-of-type': {
    borderLeft: `1px solid ${theme.palette.divider}`,
    borderTopLeftRadius: theme.shape.borderRadius,
    borderBottomLeftRadius: theme.shape.borderRadius,
  },
  '&:last-of-type': {
    borderRight: `1px solid ${theme.palette.divider}`,
    borderTopRightRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

// ---------------- COMPONENT ----------------

const CdfTable: React.FC<CdfTableProps> = ({ headers, rows }) => {
  return (
    <StyledTableContainer>
      <Table
        sx={(theme) => ({
          borderCollapse: 'separate',
          borderSpacing: `${theme.spacing(0)} ${theme.spacing(0.5)}`,
          width: '100%',
          whiteSpace: 'nowrap',
        })}
      >
        {/* ------------------ HEADER---------------- */}
        <StyledTableHead>
          <TableRow>
            {headers.map((header, i) => (
              <StyledTableCell key={i}>
                <Typography variant="caption" fontWeight="bold" color="text.secondary">
                  {header}
                </Typography>
              </StyledTableCell>
            ))}
          </TableRow>
        </StyledTableHead>

        {/* ----------------------BODY--------------------- */}
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <StyledTableCell colSpan={headers.length} align="center">
                <Typography variant="caption" fontWeight="bold" color="text.secondary">
                  No Data Available
                </Typography>
              </StyledTableCell>
            </TableRow>
          ) : (
            rows.map((row, rowIndex) => (
              <StyledTableRow key={rowIndex}>
                {headers.map((header, i) => (
                  <StyledTableCell key={i}>
                    <Typography variant="caption" color="text.secondary">
                      {row[header] ?? '-'}
                    </Typography>
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))
          )}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default CdfTable;
