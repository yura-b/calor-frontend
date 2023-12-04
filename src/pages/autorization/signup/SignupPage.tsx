import AuthorizationHeader from '@/pages/autorization/components/header/AuthorizationHeader.tsx';
import SignUpButtons from '@/pages/autorization/components/signUpButtons/SignUpButtons.tsx';
import SignupForm from '@pages/autorization/components/forms/SignupForm.tsx';
import { useAppSelector } from '@/store/hooks/hooks.ts';
import React from 'react';
import OtherInfo from '@pages/autorization/signup/otherInfo/OtherInfo.tsx';
import { Steps } from '@/store/reducers/RegistrationReducer.ts';
import CustomizedSnackbars from '@components/admin/CustomizedSnackbars.tsx';

const SignupPage = () => {
  const { step } = useAppSelector((state) => state.registration);

  return (
    <>
      {step !== Steps.FIRST ? (
        <OtherInfo step={step} />
      ) : (
        <div className={'flex flex-col h-full min-h-screen items-center text-gray'}>
          <AuthorizationHeader />
          <SignUpButtons />
          <SignupForm />
        </div>
      )}
      <CustomizedSnackbars />
    </>
  );
};

export default SignupPage;
