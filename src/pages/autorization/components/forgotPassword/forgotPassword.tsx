import React from 'react';
import { useNavigate } from 'react-router';

interface IProps {
  setRememberMe: React.Dispatch<React.SetStateAction<boolean>>;
}
const ForgotPassword: React.FC<IProps> = () => {
  const navigate = useNavigate();

  const forgotPasswordHandler = () => {
    navigate('/reset');
  };
  return (
    <div className={'flex justify-end items-center mb-6'}>
      <p onClick={forgotPasswordHandler} className={'underline cursor-pointer hover:text-mint'}>
        Forgot password?
      </p>
    </div>
  );
};

export default ForgotPassword;
