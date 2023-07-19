import React from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { OrderStatus, OrderStatusArray } from '@/constants/interfaces/order.ts';
import { createTheme, MenuItem, ThemeProvider } from '@mui/material';

interface IProps {
  array: string[];
  defaultValue: string | OrderStatus;
  handleFunc: (value: SelectChangeEvent) => void;
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#1EC1AA', // Your desired primary color
    },
  },
});

export const CustomSelect: React.FC<IProps> = ({ defaultValue, handleFunc }) => {
  return (
    <ThemeProvider theme={theme}>
      <Select
        sx={{
          minWidth: '150px',
          textAlign: 'center',
          color: 'black',
        }}
        value={defaultValue}
        onChange={handleFunc}
      >
        {OrderStatusArray.map((status) => (
          <MenuItem key={status} value={status}>
            {status}
          </MenuItem>
        ))}
      </Select>
    </ThemeProvider>
  );
};
