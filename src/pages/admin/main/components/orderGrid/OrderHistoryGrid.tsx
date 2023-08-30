import React, { FC } from 'react';
import TableContainer from '@mui/material/TableContainer';
import {IOrder} from '@/constants/interfaces/order.ts';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import {OrderHistory} from '@pages/admin/main/components/orderGrid/OrderHistory.tsx';

const OrderHistoryGrid:FC<{ orders: IOrder[] }> = ({orders}) => {
    if (orders.length === 0) return <>
            <p>There are no orders in history</p>
    </>

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
                        <OrderHistory key={order._id} order={order} align={'right'} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default OrderHistoryGrid;
