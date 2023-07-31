import { Input } from '@mui/material';
import React, { ChangeEvent, ReactNode } from 'react';
import { InputType } from '@/constants/interfaces/inputTypes.ts';

export interface IProps {
  value?: string;
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
  return (
    <>
      <div className={'flex flex-col gap-2 mb-4'}>
        <p className={'font-bold'}>{props.children}</p>
        <p>{props.description}</p>
        <Input
          type={props.type}
          sx={{
            bgcolor: 'white',
            paddingY: '10px',
            paddingX: '5px',
            border: props.border,
          }}
          {...props}
        />
        {props.error && <p className={'text-custom-red'}>{props.errormessage}</p>}
      </div>
    </>
  );
};

export default CustomInput;
