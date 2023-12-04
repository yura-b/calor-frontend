import React from 'react';
import { useNavigate } from 'react-router';

const NavigationButtons = ({ isLogin = false }) => {
  const navigate = useNavigate();
  const signInHandler = () => {
    navigate('/login');
  };
  const signUpHandler = () => {
    navigate('/signup');
  };
  return (
    <div className={'flex flex-row justify-end mb-12 w-full'}>
      <p className={`underline ${isLogin && 'font-bold'} cursor-pointer`} onClick={signInHandler}>
        Sign In
      </p>
      <p className={`ml-6 underline ${!isLogin && 'font-bold'} cursor-pointer`} onClick={signUpHandler}>
        Sign Up
      </p>
    </div>
  );
};

export default NavigationButtons;
