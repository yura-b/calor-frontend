import AuthorizationHeader from '@/pages/autorization/components/header/AuthorizationHeader.tsx';
import LoginForm from '@pages/autorization/components/forms/LoginForm.tsx';
import React from 'react';
import GoogleSignIn from '@/pages/autorization/components/google/GoogleSignIn.tsx';
import CustomizedSnackbars from '@components/admin/CustomizedSnackbars.tsx';

const LoginPage = () => {
  //  const languages = useAppSelector((state) => state.language);

  return (
    <div className={'flex flex-col h-full min-h-screen items-center text-gray'}>
      <AuthorizationHeader />
      <LoginForm />
      <GoogleSignIn />
      <CustomizedSnackbars />
    </div>
  );
};

export default LoginPage;
