import React, { FC } from 'react';
import { ClipboardText } from '@phosphor-icons/react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { IMeasurement } from '@/constants/interfaces/order.ts';

interface IProps {
 measurement: IMeasurement
}
const Measurement: FC<IProps> = ({ measurement }) => {
  if (!measurement) return <></>
  return (
    <>
      <div className={'pl-5 mb-8  gap-5 flex flex-col justify-start'}>
        <div className={'flex items-center'}>
          <ClipboardText size={32} weight="fill" />
          <p className={'font-bold'}>Measurement</p>
        </div>
        <TableContainer component={Paper} sx={{ width: '95%' }}>
          <Table sx={{ minWidth: 650, paddingRight: '30px' }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ background: '#DDE1E6', fontWeight: 'bold' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>size</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="right">
                  Right Foot Length
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="right">
                  Right Foot Width
                </TableCell>

                <TableCell sx={{ fontWeight: 'bold' }} align="right">
                  Left Foot Lenght
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="right">
                  Left Foot Width
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="right">
                  Insole Length
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="right">
                  Insole Width
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              <TableCell align={'right'}>{measurement.size}</TableCell>
              <TableCell align={'right'}>{measurement.rightFootLength}</TableCell>
              <TableCell align={'right'}>{measurement.rightFootWidth}</TableCell>
              <TableCell align={'right'}>{measurement.leftFootLength}</TableCell>
              <TableCell align={'right'}>{measurement.leftFootWidth}</TableCell>
              <TableCell align={'right'}>{measurement.insoleLength}</TableCell>
              <TableCell align={'right'}>{measurement.insoleWidth}</TableCell>

            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <hr />
    </>

  );
};

export default Measurement;