import React from 'react';
import { useQuery } from 'react-query';
import { getOrders } from '@/api/orders.ts';
import { useAppSelector } from '@/store/hooks/hooks.ts';
import { IOrder } from '@/constants/interfaces/order.ts';
import styles from './OrderGrid.module.scss';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Order } from '@pages/admin/main/components/Order.tsx';

export default function OrdersTable() {
  const { access_token } = useAppSelector((state) => state.user);
  const { data, isLoading } = useQuery('getOrders', () => getOrders(access_token));

  const align: 'right' | 'left' | 'center' | 'justify' | 'inherit' = 'left';

  const orderList: IOrder[] = data?.data;
  if (isLoading) return <></>;


  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead className={styles.ordersGrid}>
          <TableRow>
            <TableCell />
            <TableCell align={align}>
              <p>Customer Name</p>
            </TableCell>
            <TableCell align={align}>
              <p>Address</p>
            </TableCell>
            <TableCell align={align}>
              <p>Phone Number</p>
            </TableCell>
            <TableCell align={align}>
              <p>Email</p>
            </TableCell>
            <TableCell align={align}>
              <p>Status</p>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderList.map((order) => (
            <Order key={order._id} order={order} align={align} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
