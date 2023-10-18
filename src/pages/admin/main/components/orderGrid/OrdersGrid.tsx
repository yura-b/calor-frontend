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
import { useNavigate } from 'react-router';
import DownloadDocumentation from '@pages/admin/main/components/orderGrid/DownloadDocumentation.tsx';

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

  const navigator = useNavigate();

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const navigateToOrderPage = (id: string) => {
    navigator(`/admin/order/${id}`);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (orderList.length === 0) return <div>Order list is empty</div>;

  return (
    <Paper sx={{ width: '99%', height: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: '100%' }}>
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
                  <TableCell
                    onClick={() => {
                      navigateToOrderPage(order._id);
                    }}
                  >
                    <p className={'underline font-bold cursor-pointer'}>{order.order_id}</p>
                  </TableCell>
                  <TableCell>
                    <p>{order.firstName + ' ' + order.secondName}</p>
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
                      <Wrapper title={order.payment} />
                    </p>
                  </TableCell>
                  <TableCell align={'center'}>
                    <DownloadDocumentation title={'invoice'} link={order.invoiceUrl}/>
                  </TableCell>
                  <TableCell align={'center'}>
                    <DownloadDocumentation title={'checklist'} link={order.checkListUrl}/>
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
