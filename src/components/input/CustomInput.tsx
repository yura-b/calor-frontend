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
  disableUnderline?: boolean;
  height?: string;
  gap?: string;
}

const CustomInput: React.FC<IProps> = ({gap = '2', ...props}) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1EC1AA',
      },
    },
  });
  return (
    <>
      <div className={`flex flex-col items-start gap-${gap} mb-4`}>
        <p className={'font-bold'}>{props.children}</p>
        <p>{props.description}</p>
        <ThemeProvider theme={theme}>
          <Input
            type={props.type}
            sx={{
              bgcolor: 'white',
              paddingY: '10px',
              paddingX: '10px',
              width: '100%',
              height: props.height,
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
