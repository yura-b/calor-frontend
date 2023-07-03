import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import LoginPage from '@pages/autorization/login/LoginPage.tsx';
import SignupPage from '@pages/autorization/signup/SignupPage.tsx';
import { useQuery } from 'react-query';
import { useAppDispatch } from '@/store/hooks/hooks.ts';
import { errorCorrupted, loading } from '@/store/reducers/StatusReducer.ts';
import { getTexts } from '@/api/languages.ts';
import { setLanguages } from '@/store/reducers/LanguageReducer.ts';
import { HttpStatusCode } from 'axios';
import Email from '@pages/autorization/forgotPassword/Email.tsx';
import TokenGuard from '@routes/TokenGuard.tsx';
import ResetPassword from '@pages/autorization/forgotPassword/ResetPassword.tsx';

const App = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, data } = useQuery('repoData', () => getTexts());

  if (error) dispatch(errorCorrupted('something went wrong'));
  if (isLoading) dispatch(loading());
  if (data?.status === HttpStatusCode.Ok) dispatch(setLanguages(data.data));

  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<HomePage />} />

        <Route path={'login'} element={<TokenGuard children={<LoginPage />} />} />
        <Route path={'signup'} element={<TokenGuard children={<SignupPage />} />} />
        <Route path={'reset'} element={<TokenGuard children={<Email />} />} />
        <Route path={'password/:id'} element={<TokenGuard children={<ResetPassword />} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
