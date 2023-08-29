import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const SizeTable = ({ data }) => {
  return (
    <div className="p-4">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow className="bg-mintExtraLight">
              <TableCell className="uppercase bg-custom-turquoise w-[120px] border-r border-lighterGray">
                <span className="font-bold">size guide</span>
              </TableCell>
              <TableCell className="border-r border-lighterGray"></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={index}
                className={
                  index % 2 === 0
                    ? 'border-b-2 border-mintExtraLight'
                    : 'bg-mintExtraLight border-b-2 border-mintExtraLight'
                }
              >
                <TableCell className="border-r border-lighterGray">{row.column1}</TableCell>
                <TableCell className="border-r border-lighterGray">{row.column2}</TableCell>
                <TableCell>{row.column3}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SizeTable;
