import { Button, createTheme, ThemeProvider } from '@mui/material';
import React from 'react';
import StripeLogo from '@/assets/images/stripe-logo.webp';

interface IProps {
  title: string;
  handler?: () => void;
  type?: 'submit' | 'reset';
  styles?: string;
  bgColor?: string;
  disabled?: boolean;
  id?: string;
  borderRadius?: string;
  isBoxShadow?: boolean;
  textColor?: string;
  border?: string;
  isHoveredBg?: boolean;
  hoverBgColor?: string;
  isBtnWithIcon?: boolean;
}

const CustomButton: React.FC<IProps> = ({
  handler,
  bgColor = '#4e4e4d',
  styles,
  title,
  type,
  disabled = false,
  borderRadius = '0',
  isBoxShadow = true,
  textColor = 'white',
  border = 'none',
  isHoveredBg = false,
  hoverBgColor,
  isBtnWithIcon = false,
  ...props
}) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1EC1AA',
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Button
        disabled={disabled}
        variant={'contained'}
        className={styles}
        type={type}
        disableRipple
        sx={{
          bgcolor: bgColor,
          color: textColor,
          borderRadius: borderRadius + 'px',
          boxShadow: !isBoxShadow ? 'none' : null,
          border: border,
          '&:hover': {
            backgroundColor: isHoveredBg ? hoverBgColor : null,
            color: isHoveredBg ? 'white' : null,
          },
        }}
        onClick={handler}
        {...props}
      >
        {
          isBtnWithIcon ? <img src={StripeLogo} height={40} width={40} className="mx-4" alt="stripe logo"/> : null
        }
        <span className={'font-bold'}>{title}</span>
      </Button>
    </ThemeProvider>
  );
};

export default CustomButton;
