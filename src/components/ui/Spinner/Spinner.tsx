import React, { FC } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

interface IProps {
  className?: string;
}
const Spinner: FC<IProps> = ({ className }) => {
  return (
    <div className={className}>
      <CircularProgress size={20} style={{ color: 'red' }} />
    </div>
  );
};

export default Spinner;
