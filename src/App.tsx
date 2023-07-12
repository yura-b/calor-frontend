import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import LoginPage from '@pages/autorization/login/LoginPage.tsx';
import SignupPage from '@pages/autorization/signup/SignupPage.tsx';
import Email from '@pages/autorization/forgotPassword/Email.tsx';
import TokenGuard from '@routes/TokenGuard.tsx';
import ResetPassword from '@pages/autorization/forgotPassword/ResetPassword.tsx';
import AdminRoutes from '@routes/admin-routes.tsx';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<HomePage />} />
          <Route path={'login'} element={<TokenGuard children={<LoginPage />} />} />
          <Route path={'signup'} element={<TokenGuard children={<SignupPage />} />} />
          <Route path={'reset'} element={<TokenGuard children={<Email />} />} />
          <Route path={'password/:id'} element={<TokenGuard children={<ResetPassword />} />} />
          <Route path={'admin'} element={<AdminRoutes />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
