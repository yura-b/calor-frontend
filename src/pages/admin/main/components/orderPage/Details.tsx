import React, { FC } from 'react';
import { ClipboardText } from '@phosphor-icons/react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { detail } from '@/api/dto/orders.dto.ts';

interface IProps {
  details: {
    [detailName: string]: detail
  } | undefined;
}

const Details: FC<IProps> = ({ details }) => {
  if (!details) return <></>
  
  const flattenedDetails = Object.values(details[0]);

  return (
    <div className={'mb-8'}>
      <div className={'pl-5 mb-8  gap-5 flex flex-col justify-start'}>
        <div className={'flex items-center'}>
          <ClipboardText size={32} weight="fill" />
          <p className={'font-bold'}>Details</p>
        </div>
        <TableContainer component={Paper} sx={{ width: '95%' }}>
          <Table sx={{ minWidth: 650, paddingRight: '30px' }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ background: '#DDE1E6', fontWeight: 'bold' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Detail</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="right">
                  material
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="right">
                  Color
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                flattenedDetails.map((item) => {
                  return <TableRow>
                    <TableCell>{item.name}</TableCell>

                    <TableCell align={'right'}>{item.material}</TableCell>

                    <TableCell align={'right'}>{item.color}</TableCell>
                  </TableRow>;
                })
              }</TableBody>
          </Table>
        </TableContainer>
      </div>
      <hr />
    </div>
  );
};

export default Details;