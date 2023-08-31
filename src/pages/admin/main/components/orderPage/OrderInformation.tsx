import React from 'react';
import { ClipboardText } from '@phosphor-icons/react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { IOrder } from '@/constants/interfaces/order.ts';

interface IProps {
  order: IOrder;
}

const OrderInformation: React.FC<IProps> = ({ order }) => {
  const { payment, shoes, accessory, totalPrice } = order;
  console.log(order);
  return (
    <>
      <div className={'pl-5 mb-8  gap-5 flex flex-col justify-start'}>
        <div className={'flex items-center'}>
          <ClipboardText size={32} weight="fill" />
          <p className={'font-bold'}>Order`s information</p>
        </div>
        <TableContainer component={Paper} sx={{ width: '95%' }}>
          <Table sx={{ minWidth: 650, paddingRight: '30px' }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ background: '#DDE1E6', fontWeight: 'bold' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Item`s Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="right">
                  Price
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="right">
                  Payment
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableCell>{shoes?.title || accessory?.name}</TableCell>

              <TableCell align={'right'}>{totalPrice}$</TableCell>

              <TableCell align={'right'}>{payment}</TableCell>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <hr />
    </>
  );
};

export default OrderInformation;
