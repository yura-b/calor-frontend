import { Button } from '@mui/material';
import React from 'react';

export interface IProps {
  title: string;
  handler?: () => void;
  type?: 'submit' | 'reset';
  styles?: string;
}

const CustomButton: React.FC<IProps> = ({ handler, styles, title, type }) => {
  return (
    <Button
      className={styles}
      type={type}
      sx={{
        bgcolor: '#4e4e4d',
        color: 'white',
        borderRadius: '0px',
      }}
      onClick={handler}
    >
      {title}
    </Button>
  );
};

export default CustomButton;
