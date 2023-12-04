import React from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { OrderStatus } from '@/constants/interfaces/order.ts';
import { createTheme, MenuItem, ThemeProvider } from '@mui/material';

interface IProps {
  array: string[];
  defaultValue: string | OrderStatus;
  handleFunc: (value: SelectChangeEvent) => void;
  value: string;
  required?: boolean;
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#1EC1AA', // Your desired primary color
    },
  },
});

export const CustomSelect: React.FC<IProps> = ({ handleFunc, array, value }) => {
  return (
    <ThemeProvider theme={theme}>
      <Select
        sx={{
          minWidth: '150px',
          textAlign: 'center',
          color: '#404040',
        }}
        value={value}
        onChange={(e: SelectChangeEvent) => {
          handleFunc(e);
        }}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 250,
            },
          },
        }}
      >
        {array.map((el) => {
          return (
            <MenuItem key={el} value={el}>
              {el}
            </MenuItem>
          );
        })}
      </Select>
    </ThemeProvider>
  );
};
