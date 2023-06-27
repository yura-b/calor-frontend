import AuthorizationHeader from '@/pages/autorization/components/header/AuthorizationHeader.tsx';
import SignUpButtons from '@/pages/autorization/components/signUpButtons/SignUpButtons.tsx';

const SignupPage = () => {
  return (
    <div className={'flex flex-col h-full min-h-screen'}>
      <AuthorizationHeader />
      <SignUpButtons />
    </div>
  );
};

export default SignupPage;
