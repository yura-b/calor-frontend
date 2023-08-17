import React from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { OrderStatus } from '@/constants/interfaces/order.ts';
import { createTheme, MenuItem, ThemeProvider } from '@mui/material';

interface IProps {
  array: string[];
  defaultValue: string | OrderStatus;
  handleFunc: (value: SelectChangeEvent) => void;
  value: string;
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#1EC1AA' // Your desired primary color
    }
  }
});

export const CustomSelect: React.FC<IProps> = ({ handleFunc, array, value }) => {
  return (
    <ThemeProvider theme={theme}>
      <Select
        sx={{
          minWidth: '150px',
          textAlign: 'center',
          color: 'black'
        }}
        value={value}
        onChange={(e: SelectChangeEvent) => {
          console.log(e);
          handleFunc(e);
        }}
      >
        {array.map((el) => {
          return <MenuItem key={el} value={el}>
            {el}
          </MenuItem>;
        })}
      </Select>
    </ThemeProvider>
  );
};
