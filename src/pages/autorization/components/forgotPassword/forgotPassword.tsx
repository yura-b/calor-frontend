import React from 'react';
import { Checkbox } from '@mui/material';
import { useNavigate } from 'react-router';

interface IProps {
  setRememberMe: React.Dispatch<React.SetStateAction<boolean>>;
}
const ForgotPassword: React.FC<IProps> = ({ setRememberMe }) => {
  const navigate = useNavigate();

  const checkboxHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };
  const forgotPasswordHandler = () => {
    navigate('/reset');
  };
  return (
    <div className={'flex justify-between items-center mb-6'}>
      <div className={'flex items-center'}>
        <Checkbox onChange={checkboxHandler} />
        <p className={'font-bold'}>Remember me</p>
      </div>
      <p onClick={forgotPasswordHandler} className={'underline'}>
        Forgot password?
      </p>
    </div>
  );
};

export default ForgotPassword;
