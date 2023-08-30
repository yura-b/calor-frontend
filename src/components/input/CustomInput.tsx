import { createTheme, Input, ThemeProvider } from '@mui/material';
import React, { ChangeEvent, ReactNode } from 'react';
import { InputType } from '@/constants/interfaces/inputTypes.ts';

interface IProps {
  value?: string | number;
  onChange?: (e: ChangeEvent<any>) => void;
  error?: boolean;
  type?: InputType | undefined;
  helperText?: boolean | string;
  name?: string;
  label?: string;
  id?: string;
  placeholder?: string;
  children?: ReactNode;
  border?: string;
  description?: string;
  errorMessage?: string;
}

const CustomInput: React.FC<IProps> = (props) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1EC1AA', // Your desired primary color
      },
    },
  });
  return (
    <>
      <div className={'flex flex-col items-start gap-2 mb-4'}>
        <p className={'font-bold'}>{props.children}</p>
        <p>{props.description}</p>
        <ThemeProvider theme={theme}>
          <Input
            type={props.type}
            sx={{
              bgcolor: 'white',
              paddingY: '10px',
              paddingX: '5px',
              width: '100%',
              border: props.border,
            }}
            {...props}
          />
        </ThemeProvider>
        {props.error && <p className={'text-custom-red'}>{props.errorMessage}</p>}
      </div>
    </>
  );
};

export default CustomInput;
