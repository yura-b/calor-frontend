import React from 'react';
import { useNavigate } from 'react-router';

const AlreadyRegistered = () => {
  const navigate = useNavigate();
  const signIn = () => {
    navigate('/login');
  };
  return (
    <div className={'mt-4 flex justify-center mt-10'}>
      <p>
        Already registered?{' '}
        <span className={'ml-2 underline font-bold'} onClick={signIn}>
          Sign In
        </span>
      </p>
    </div>
  );
};

export default AlreadyRegistered;
