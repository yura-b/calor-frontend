import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const ShoeSizeTable = ({ data, title }) => {
  return (
    <div className="my-2 pb-6" style={{}}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow className="bg-mintExtraLight">
              <TableCell
                className={`uppercase bg-custom-turquoise w-[120px] border-l border-r border-lighterGray`}
                colSpan={5}
              >
                <span className="font-bold">{title[0]}</span>
              </TableCell>
              <TableCell className={`uppercase bg-custom-turquoise w-[120px] border-r border-lighterGray`} colSpan={4}>
                <span className="font-bold">{title[1]}</span>
              </TableCell>
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
                {Object.values(row).map((cell, cellIndex) => (
                  <TableCell
                    key={cellIndex}
                    className={`border-r border-lighterGray ${cellIndex === 0 ? 'border-l border-lighterGray' : ''}`}
                    style={{ fontWeight: index === 0 ? 'bold' : 'normal' }} // Зробіть жирним шрифт лише для першого рядка
                  >
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ShoeSizeTable;
