import React from 'react';
import NavigationButtons from '@/pages/autorization/components/navigationButtons/navigationButtons.tsx';
import GoogleButton from '@components/googleButton/GoogleButton.tsx';

const SignUpButtons = () => {
  return (
    <div className={'flex flex-col p-5 bg-custom-turquoise w-full'}>
      <NavigationButtons isLogin={false} />
      <div className={'flex flex-col items-center mb-12'}>
        <GoogleButton>
          <p>
            Sign Up with <span className={'font-bold'}>Google</span>
          </p>
        </GoogleButton>
      </div>
    </div>
  );
};

export default SignUpButtons;
