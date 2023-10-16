import React, { FC } from 'react';
import { Coupon } from '@/constants/interfaces/coupon.ts';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { TablePagination } from '@mui/material';
import Paper from '@mui/material/Paper';


interface Column {
  id: 'Promo code' | 'Issue Date' | 'Expiration Date' | 'Status' | 'Value',
  label: string;
  minWidth?: number;
  align?: 'right' | 'center';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'Promo code', label: 'Promo code', minWidth: 150 },
  { id: 'Issue Date', label: 'Issue Date', minWidth: 100 },
  {
    id: 'Expiration Date',
    label: 'Expiration Date',
    minWidth: 100,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US')
  },
  { id: 'Status', label: 'Status', minWidth: 50, align: 'center' },
  {
    id: 'Value',
    label: 'Value',
    minWidth: 50,
    align: 'center'
  }
];


export interface IProps {
  coupons: Coupon[];
}

const PromoCodesGrid: FC<IProps> = ({ coupons }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  if (coupons.length === 0) {
    return <p>Promo codes list is empty</p>
  }

  return (
    <Paper sx={{ width: '99%', paddingLeft: '30px', height: '100%', overflow: 'hidden', marginTop: '30px' }}>
      <TableContainer sx={{ maxHeight: '100%' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  sx={{ background: '#DDE1E6', fontWeight: 'bold' }}
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {coupons.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((coupon) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={coupon._id}
                >
                  <TableCell>
                    <p>{coupon.uuid}</p>
                  </TableCell>
                  <TableCell>
                    <p>{coupon.startDate}</p>
                  </TableCell>
                  <TableCell align={'center'}>
                    <p>{coupon.endDate}</p>
                  </TableCell>
                  <TableCell align={'center'}>
                    {coupon.isUsed ?
                      <p className={'font-bolt text-red-500'}>Inactive</p>
                      :
                      <p className={'text-mint'}>Active</p>
                    }
                  </TableCell>
                  <TableCell align={'center'}>
                    <p>{(coupon.percent_off || coupon.amount_off)} {coupon.percent_off ? '%' : '$'} </p>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[20, 25, 50]}
        component="div"
        count={coupons.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default PromoCodesGrid;