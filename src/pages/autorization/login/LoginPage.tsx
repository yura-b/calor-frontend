import AuthorizationHeader from '@/pages/autorization/components/header/AuthorizationHeader.tsx';
import LoginForm from '@/pages/autorization/components/LoginForm.tsx';
import React from 'react';
import GoogleSignIn from '@/pages/autorization/components/google/GoogleSignIn.tsx';

const LoginPage = () => {
    //  const languages = useAppSelector((state) => state.language);

    return (
        <div className={'flex flex-col h-full min-h-screen'}>
            <AuthorizationHeader/>
            <LoginForm/>
            <GoogleSignIn/>
        </div>
    );
};

export default LoginPage;
