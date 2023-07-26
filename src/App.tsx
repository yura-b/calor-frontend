import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import LoginPage from '@pages/autorization/login/LoginPage.tsx';
import SignupPage from '@pages/autorization/signup/SignupPage.tsx';
import Email from '@pages/autorization/forgotPassword/Email.tsx';
import TokenGuard from '@routes/TokenGuard.tsx';
import ResetPassword from '@pages/autorization/forgotPassword/ResetPassword.tsx';
import MainPage from '@pages/admin/main/MainPage.tsx';
import UserPage from '@pages/admin/users/UserPage.tsx';
import React from 'react';
import TextReviewPage from '@pages/admin/reviews/textReviews/TextReviewPage.tsx';
import UserProfilePage from '@pages/admin/users/UserProfilePage.tsx';
import OrderPage from '@pages/admin/main/OrderPage.tsx';
import PageManagerPage from '@pages/admin/pageManager/PageManagerPage.tsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<HomePage />} />
        <Route path={'login'} element={<TokenGuard children={<LoginPage />} />} />
        <Route path={'signup'} element={<TokenGuard children={<SignupPage />} />} />
        <Route path={'reset'} element={<TokenGuard children={<Email />} />} />
        <Route path={'password/:id'} element={<TokenGuard children={<ResetPassword />} />} />
        <Route path={'admin'}>
          <Route index element={<MainPage />} />
          <Route path={'order/:id'} element={<OrderPage/>} />
          <Route path={'users'} element={<UserPage />} />
          <Route path={'users/:id'} element={<UserProfilePage />} />
          <Route path={'reviews/text'} element={<TextReviewPage />} />
          <Route path={'manager'} element={<PageManagerPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
