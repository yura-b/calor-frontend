import React, { useState } from 'react';
import { IOrder } from '@/constants/interfaces/order.ts';
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import styles from './OrderGrid.module.scss';
import { useAppSelector } from '@/store/hooks/hooks.ts';
import { DateFormatter } from '@/helpers/functions/dateFormatter.ts';

export const OrderHistory: React.FC<{ key: string; order: IOrder; align }> = ({ order, align }) => {
  const [open, setOpen] = useState(false);
  const { access_token } = useAppSelector((state) => state.user);

  console.log(order);
  if (!order) return;

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} className={styles.orderBody}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <p>{order._id}</p>
        </TableCell>
        <TableCell align={align}>
          <p>{order.username}</p>
        </TableCell>
        <TableCell align={align}>
          <p>{DateFormatter(order.date)}</p>
        </TableCell>
        <TableCell align={align}>
          <p>{order.status}</p>
        </TableCell>
        <TableCell align={align}>
          <p>{order.payment}</p>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Items
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Item`s name</TableCell>
                    <TableCell>size</TableCell>
                    <TableCell align={align}>
                      <p className={'font-bold'}>Shipping Info</p>
                    </TableCell>
                    <TableCell align={align}>Total price ($)</TableCell>
                    <TableCell align={align}>Payment</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={2}>
                    <TableCell component="th" scope="row">
                      <p>{order.shoes?.title || order.accessory?.name}</p>
                    </TableCell>
                    <TableCell>details here</TableCell>
                    <TableCell align={align}>
                      <div className={'flex flex-col gap-5'}>
                        <p>{order.shippingInfo?.receiverFirstName + ' ' + order.shippingInfo?.receiverSecondName}</p>
                        <p>{order.shippingInfo?.ASB}</p>
                        <p>{order.shippingInfo?.streetAddress}</p>
                        <p>{`${order.shippingInfo?.city},  ${order.shippingInfo?.state},  ${order.shippingInfo?.ZIP}`}</p>
                        <p>{order.shippingInfo?.country}</p>
                        <p>{order.shippingInfo?.receiverPhoneNumber}</p>
                      </div>
                    </TableCell>
                    <TableCell align={align}>{order.totalPrice}$</TableCell>
                    <TableCell align={align}>{order.payment}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
