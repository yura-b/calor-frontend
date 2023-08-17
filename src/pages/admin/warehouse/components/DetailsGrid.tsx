import React, { FC, useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import { DetailsAndProductName } from '@pages/admin/warehouse/WarehousePage.tsx';
import { Color, Detail, Materials } from '@/constants/interfaces/details.ts';
import DetailRow from '@pages/admin/warehouse/components/DetailRow.tsx';


interface Column {
  id: keyof Detail | keyof Materials | keyof Color;
  label: string;
  minWidth?: number;
  align?: 'center';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'title', label: 'detail name', minWidth: 80 },
  { id: 'title', label: 'product name', minWidth: 90 },
  {
    id: 'materials',
    label: 'material name',
    minWidth: 100,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US')
  },
  {
    id: 'color',
    label: 'color name',
    minWidth: 170,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US')
  },
  {
    id: 'colors',
    label: 'color availability',
    minWidth: 170,
    align: 'center',
    format: (value: number) => value.toFixed(2)
  }
];
interface IProps {
  details:  DetailsAndProductName[],
}

const DetailsGrid: FC<IProps> = ({ details }) => {

  const valueOfDetails = Object.values(details);
  console.log(details);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '99%',paddingLeft: '30px', height: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: '100%' }}>
      <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ background: '#DDE1E6', fontWeight: 'bold', borderBottom: '1px solid black' }}
                key={Math.random()}
                align="center" colSpan={2}>
                Country
              </TableCell>
              <TableCell
                sx={{ background: '#DDE1E6', fontWeight: 'bold', borderBottom: '1px solid black' }}
                key={Math.random()}
                align="center" colSpan={3}>
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
          <TableBody >
            {valueOfDetails.map(({ detail, products }) =>
              <DetailRow key={Math.random()} details={{detail, products}}/>
             )
            }

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
