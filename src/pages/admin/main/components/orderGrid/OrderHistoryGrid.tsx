import React, { FC, useEffect, useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import { IOrder } from '@/constants/interfaces/order.ts';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { OrderHistory } from '@pages/admin/main/components/orderGrid/OrderHistory.tsx';
import ModalWindow from '@components/admin/ModalWindow.tsx';
import { useAppSelector } from '@/store/hooks/hooks.ts';
import { getRelativeOrders } from '@/api/orders.ts';

const OrderHistoryGrid: FC<{ orders: IOrder[] }> = ({ orders }) => {
  const { access_token } = useAppSelector((state) => state.user);
  const [currentOrder, setCurrentOrder] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [relativeOrders, setRelativeOrder] = useState<IOrder[]>([]);

  useEffect(() => {
    if (!currentOrder || !access_token) return;

    getRelativeOrders(access_token, currentOrder).then((res) => {
      setRelativeOrder(res.data);
      console.log(res.data);
      setOpenModal(true);
    });
  }, [currentOrder]);

  if (orders.length === 0)
    return (
      <>
        <p>There are no orders in history</p>
      </>
    );

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>id</TableCell>
            <TableCell align="right">Customer`s Name</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Payment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <OrderHistory
              key={order._id}
              order={order}
              align={'right'}
              setOpenModal={setOpenModal}
              setCurrentOrder={setCurrentOrder}
            />
          ))}
        </TableBody>
      </Table>
      <ModalWindow open={openModal} setOpen={setOpenModal} orders={orders} order_id={currentOrder} />
    </TableContainer>
  );
};

export default OrderHistoryGrid;
