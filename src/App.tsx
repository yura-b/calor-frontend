import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/user/HomePage';
import LoginPage from '@/pages/autorization/login/LoginPage.tsx';
import SignupPage from '@/pages/autorization/signup/SignupPage.tsx';

const App = () => {
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
