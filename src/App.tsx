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
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<HomePage />} />
        <Route path={paths.home} element={<HomePage />} />
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
        <Route path={paths.design_shoe} element={<DesignShoePage />} />
        <Route path={paths.design_bag} element={<DesignBagPage />} />
        <Route path={paths.accessories} element={<AccessoriesPage />} />
        <Route path={paths.shoe_care_product} element={<ShoeCareProductPage />} />
        <Route path={paths.customer_experience} element={<CustomerExperiencePage />} />
        <Route path={paths.privacy_policy} element={<PrivacyPolicyPage />} />
        <Route path={paths.cookies} element={<CookiesPage />} />
        <Route path={paths.terms_condition} element={<TermsConditionPage />} />
        <Route path={paths.about} element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
