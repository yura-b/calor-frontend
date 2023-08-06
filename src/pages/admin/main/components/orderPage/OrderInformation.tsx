import React from 'react';
import { ClipboardText } from '@phosphor-icons/react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { IOrder, IPurchase } from '@/constants/interfaces/order.ts';

interface IProps {
  order: IOrder;
}
const OrderInformation: React.FC<IProps> = ({ order }) => {
  const { details, payment } = order;

  return (
    <>
      {/* <div className={'pl-5 mb-8  gap-5 flex flex-col justify-start'}> */}
      {/*     <div className={'flex items-center'}> */}
      {/*         <ClipboardText size={32} weight="fill"/> */}
      {/*         <p className={'font-bold'}>Order`s information</p> */}
      {/*     </div> */}
      {/*     <TableContainer component={Paper} sx={{width:'95%'}}> */}
      {/*         <Table sx={{minWidth: 650, paddingRight:'30px' }} aria-label="simple table"> */}
      {/*             <TableHead> */}
      {/*                 <TableRow sx={{ background: '#DDE1E6', fontWeight: 'bold' }}> */}
      {/*                     <TableCell sx={{fontWeight:'bold'}}>Item`s Name</TableCell> */}
      {/*                     <TableCell sx={{fontWeight:'bold'}} align="right">QTY</TableCell> */}
      {/*                     <TableCell sx={{fontWeight:'bold'}} align="right">Price</TableCell> */}
      {/*                     <TableCell sx={{fontWeight:'bold'}} align="right">Payment</TableCell> */}
      {/*                 </TableRow> */}
      {/*             </TableHead> */}
      {/*             <TableBody> */}
      {/*                 {details.map((purchase) => ( */}
      {/*                     <TableRow */}
      {/*                         key={Math.random()} */}
      {/*                         sx={{'&:last-child td, &:last-child th': {border: 0}}} */}
      {/*                     > */}
      {/*                         <TableCell component="th" scope="row"> */}
      {/*                             {purchase.product.title} */}
      {/*                         </TableCell> */}
      {/*                         <TableCell align="right">{purchase.count}</TableCell> */}
      {/*                         <TableCell align="right">{purchase.product.price}</TableCell> */}
      {/*                         <TableCell align="right">{payment}</TableCell> */}
      {/*                     </TableRow> */}
      {/*                 ))} */}
      {/*             </TableBody> */}
      {/*         </Table> */}
      {/*     </TableContainer> */}
      {/* </div> */}
      <hr />
    </>
  );
};

export default OrderInformation;
