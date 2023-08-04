import React from 'react';
import GoogleButton from '@components/googleButton/GoogleButton.tsx';
import { useNavigate } from 'react-router';

const GoogleSignIn = () => {
  const navigate = useNavigate();

  const signupHandler = () => {
    navigate('/signup');
  };

  return (
    <div className={'flex flex-col flex-1 items-center gap-2 mt-2 w-full p-5'}>
      <div>or</div>
      <GoogleButton>
        <p>
          Sign In with <span className={'font-bold'}>Google</span>
        </p>
      </GoogleButton>
      <div className={'mt-4 flex-1 align-text-bottom'}>
        <p>
          Not a member?{' '}
          <span onClick={signupHandler} className={'ml-2 underline font-bold'}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default GoogleSignIn;
