import React from 'react';
import GoogleButton from '@components/googleButton/GoogleButton.tsx';
import { useNavigate } from 'react-router';

const GoogleSignIn = () => {
  const navigate = useNavigate();

  const signupHandler = () => {
    navigate('/signup');
  };

  return (
    <div className={'flex flex-col w-full items-center gap-2 max-w-2xl p-5 p-5 md:p-0'}>
      <div>or</div>
      <GoogleButton>
        <p>
          Sign In with <span className={'font-bold'}>Google</span>
        </p>
      </GoogleButton>
      <div className={'mt-4 flex-1 align-text-bottom'}>
        <p>
          Not a member?{' '}
          <span onClick={signupHandler} className={'ml-2 underline font-bold cursor-pointer'}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default GoogleSignIn;
