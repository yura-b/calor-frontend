import React, { FC, useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { DetailsAndProductName } from '@pages/admin/warehouse/WarehousePage.tsx';
import { Detail, Materials } from '@/constants/interfaces/details.ts';
import DetailRow from '@pages/admin/warehouse/components/DetailRow.tsx';

interface Column {
  id: keyof Detail | keyof Materials;
  label: string;
  minWidth?: number;
  align?: 'center';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'title', label: 'Detail name', minWidth: 80 },
  { id: 'title', label: 'Product name', minWidth: 90 },
  {
    id: 'materials',
    label: 'Material name',
    minWidth: 200,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'available',
    label: 'Material availability',
    minWidth: 170,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
];
interface IProps {
  details: DetailsAndProductName[];
}

const DetailsGrid: FC<IProps> = ({ details }) => {
  const valueOfDetails = Object.values(details);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '99%', paddingLeft: '30px', height: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: '100%' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ background: '#DDE1E6', fontWeight: 'bold', borderBottom: '1px solid black' }}
                key={Math.random()}
                align="center"
                colSpan={2}
              >
                Product
              </TableCell>
              <TableCell
                sx={{ background: '#DDE1E6', fontWeight: 'bold', borderBottom: '1px solid black' }}
                key={Math.random()}
                align="center"
                colSpan={3}
              >
                Details
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  sx={{ background: '#DDE1E6', fontWeight: 'bold' }}
                  key={Math.random()}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {valueOfDetails.map(({ detail, products }) => (
              <DetailRow key={Math.random()} details={{ detail, products }} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={Object.values(details).length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default DetailsGrid;
