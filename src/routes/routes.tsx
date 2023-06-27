import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loader from '@/components/ui/Loader/';

const HomePage = lazy(() => import('@pages/HomePage'));
const LoginPage = lazy(() => import('@/pages/autorization/login/LoginPage'));
const SignupPage = lazy(() => import('@pages/autorization/signup/SignupPage'));

const AppRouter = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path={'/'} element={<HomePage />} />
        <Route path={'auth'}>
          <Route path={'login'} element={<LoginPage />} />
          <Route path={'signup'} element={<SignupPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
