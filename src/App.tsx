import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/user/HomePage';
import LoginPage from '@/pages/autorization/login/LoginPage.tsx';
import SignupPage from '@/pages/autorization/signup/SignupPage.tsx';
import { useQuery } from 'react-query';
import { useAppDispatch } from '@/store/hooks/hooks.ts';
import { setLanguages } from '@/store/reducers/LanguageReducer.ts';
import { errorCorrupted, loading } from '@/store/reducers/StatusReducer.ts';
import { getTexts } from '@/api/languages.ts';

const App = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useQuery('repoData', () =>
    getTexts().then((data) => {
      console.log(data);
      dispatch(setLanguages(data.data));
    })
  );
  if (error) dispatch(errorCorrupted('something went wrong'));
  if (isLoading) dispatch(loading());
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<HomePage />} />
        <Route path={'authorization'}>
          <Route path={'login'} element={<LoginPage />} />
          <Route path={'signup'} element={<SignupPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
