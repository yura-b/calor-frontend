import React from 'react';
import NavigationButtons from '@/pages/autorization/components/navigationButtons/navigationButtons.tsx';
import GoogleButton from '@components/googleButton/GoogleButton.tsx';

const SignUpButtons = () => {
  return (
    <div className={'flex flex-col p-5 bg-custom-turquoise w-full items-center'}>
      <div className={'flex flex-col max-w-2xl w-full'}>
        <NavigationButtons isLogin={false} />
        <div className={'flex flex-col mb-12 w-full'}>
          <GoogleButton>
            <p>
              Sign Up with <span className={'font-bold'}>Google</span>
            </p>
          </GoogleButton>
        </div>
      </div>
    </div>
  );
};

export default SignUpButtons;
