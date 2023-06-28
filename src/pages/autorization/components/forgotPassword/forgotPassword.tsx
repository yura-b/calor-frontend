import React from 'react';
import { Checkbox } from '@mui/material';

interface IProps {
  setRememberMe: React.Dispatch<React.SetStateAction<boolean>>;
}
const ForgotPassword: React.FC<IProps> = ({ setRememberMe }) => {
  const checkboxHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };
  return (
    <div className={'flex justify-between items-center mb-6'}>
      <div className={'flex items-center'}>
        <Checkbox onChange={checkboxHandler} />
        <p className={'font-bold'}>Remember me</p>
      </div>
      <p className={'underline'}>Forgot password?</p>
    </div>
  );
};

export default ForgotPassword;
