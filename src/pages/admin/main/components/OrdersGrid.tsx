import React from 'react';
import { IOrder } from '@/constants/interfaces/order.ts';
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

import { DateFormatter } from '@/helpers/functions/dateFormatter.ts';
import ProductionDay from '@components/admin/ProductionDay.tsx';
import Wrapper from '@components/admin/Wrapper.tsx';

interface Column {
  id: 'ID' | 'Customer`s name' | 'Date' | 'Status' | 'Production Day' | 'Amount' | 'Payment' | 'Invoice' | 'Checklist';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'ID', label: 'ID', minWidth: 220 },
  { id: 'Customer`s name', label: 'Customer`s name', minWidth: 250 },
  {
    id: 'Date',
    label: 'Date',
    minWidth: 150,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  { id: 'Status', label: 'Status', minWidth: 50, align: 'center' },
  {
    id: 'Production Day',
    label: 'Production Day',
    minWidth: 50,
    align: 'center',
  },
  { id: 'Amount', label: 'Amount', minWidth: 150 },
  { id: 'Payment', label: 'Payment', minWidth: 80, align: 'center' },
  { id: 'Invoice', label: 'Invoice', minWidth: 120, align: 'center' },
  { id: 'Checklist', label: 'Checklist', minWidth: 150, align: 'center' },
];

interface IProps {
  orderList: IOrder[];
}

const OrdersTable: React.FC<IProps> = ({ orderList }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const align: 'right' | 'left' | 'center' | 'justify' | 'inherit' = 'left';

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
    <Paper sx={{ width: '99%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: '72vh', padding: '30px' }}>
        <Table stickyHeader aria-label="sticky table" sx={{ border: '1px #DDE1E6 solid' }}>
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
            {orderList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={order._id}>
                  <TableCell>
                    <p className={'underline font-bold'}>{order._id}</p>
                  </TableCell>
                  <TableCell>
                    <p>{order.username}</p>
                  </TableCell>
                  <TableCell align={'center'}>
                    <p>{DateFormatter(order.date)}</p>
                  </TableCell>
                  <TableCell align={'center'}>
                    <Wrapper status={order.status} />
                  </TableCell>
                  <TableCell align={'center'}>
                    <p>
                      <ProductionDay day={order.productionDays} />
                    </p>
                  </TableCell>
                  <TableCell align={'center'}>
                    <p>{order.totalPrice}$</p>
                  </TableCell>
                  <TableCell align={'center'}>
                    <p>
                      <Wrapper title={'payment'} />
                    </p>
                  </TableCell>
                  <TableCell align={'center'}>
                    <p>invoice</p>
                  </TableCell>
                  <TableCell align={'center'}>
                    <p>checklist</p>
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
        count={orderList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
export default OrdersTable;
