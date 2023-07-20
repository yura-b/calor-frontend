import { Button, createTheme, ThemeProvider } from '@mui/material';
import React from 'react';

export interface IProps {
  title: string;
  handler?: () => void;
  type?: 'submit' | 'reset';
  styles?: string;
  bgColor?: string;
}

const CustomButton: React.FC<IProps> = ({ handler, bgColor = '#4e4e4d', styles, title, type }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1EC1AA', // Your desired primary color
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Button
        variant={'contained'}
        className={styles}
        type={type}
        disableRipple
        sx={{
          bgcolor: bgColor,
          color: 'white',
          borderRadius: '0px',
        }}
        onClick={handler}
      >
        <p className={'font-bold'}>{title}</p>
      </Button>
    </ThemeProvider>
  );
};

export default CustomButton;
