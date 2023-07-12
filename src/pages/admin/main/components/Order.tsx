import React, { useState } from 'react';
import { IOrder, OrderStatus } from '@/constants/interfaces/order.ts';
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import styles from './OrderGrid.module.scss';
import { CustomSelect } from '@components/select/CustomSelect.tsx';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import { openDialog } from '@/store/reducers/DialogReducer.ts';
import { changeOrderStatus } from '@/api/orders.ts';

export const Order: React.FC<{ key: string; order: IOrder; align }> = ({ order, align }) => {
  const [open, setOpen] = useState(false);
  const [statusValue, setStatusValue] = useState<OrderStatus>(order.status);
  const { access_token } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();


  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} className={styles.orderBody}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <p>{order.username}</p>
        </TableCell>
        <TableCell align={align}>
          <p>{order.address}</p>
        </TableCell>
        <TableCell align={align}>
          <p>{order.number}</p>
        </TableCell>
        <TableCell align={align}>
          <p>{order.email}</p>
        </TableCell>
        <TableCell align={align}>
          <CustomSelect handleFunc={(e) => {

            const value = e.target.value as OrderStatus

            setStatusValue(value);

            dispatch(openDialog({
              title: 'Confirm change status',
              submitHandler() {
                access_token && changeOrderStatus(access_token, {
                  _id: order._id,
                  orderStatus: value
                });
              },
              description: `Change order status from ${order.status} to ${value} \n  order by ${order.username} `
            }));
          }
          } defaultValue={statusValue} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Purchases
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow className={styles.purchases}>
                    <TableCell><p>Title</p></TableCell>
                    <TableCell><p>Description</p></TableCell>
                    <TableCell align={align}><p>Amount</p></TableCell>
                    <TableCell align={align}><p>Total price ($)</p></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.purchases.map((purchase) => (
                    <TableRow key={2}>
                      <TableCell component="th" scope="row">
                        {purchase.product.title}
                      </TableCell>
                      <TableCell>details here</TableCell>
                      <TableCell align={align}>{purchase.count}</TableCell>
                      <TableCell
                        align={align}>{purchase.product.price * purchase.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};


