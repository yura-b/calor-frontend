import React from 'react';
import { useNavigate } from 'react-router';

const NavigationButtons = ({ isLogin = false }) => {
  const navigate = useNavigate();
  const signInHandler = () => {
    navigate('/signup');
  };
  const signUpHandler = () => {
    navigate('/login');
  };
  return (
    <div className={'flex flex-row justify-end mb-12'}>
      <p className={`underline ${isLogin && 'font-bold'}`} onClick={signInHandler}>
        Sign In
      </p>
      <p className={`ml-6 underline ${!isLogin && 'font-bold'}`} onClick={signUpHandler}>
        Sign Up
      </p>
    </div>
  );
};

export default NavigationButtons;
