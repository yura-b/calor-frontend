import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import LoginPage from '@pages/autorization/login/LoginPage.tsx';
import SignupPage from '@pages/autorization/signup/SignupPage.tsx';
import Email from '@pages/autorization/forgotPassword/Email.tsx';
import TokenGuard from '@routes/TokenGuard.tsx';
import ResetPassword from '@pages/autorization/forgotPassword/ResetPassword.tsx';
import React from 'react';
import OrderPage from '@pages/admin/main/OrderPage.tsx';
import UserPage from '@pages/admin/users/UserPage.tsx';
import UserProfilePage from '@pages/admin/users/UserProfilePage.tsx';
import TextReviewPage from '@pages/admin/reviews/textReviews/TextReviewPage.tsx';
import PageManagerPage from '@pages/admin/pageManager/PageManagerPage.tsx';
import {paths} from '@routes/paths.ts';
import MainPage from '@pages/admin/main/MainPage.tsx';
import DesignBagPage from '@pages/DesignBagPage';
import DesignShoePage from '@pages/DesignShoePage';
import AccessoriesPage from '@pages/AccessoriesPage';
import ShoeCareProductPage from '@pages/ShoeCareProductPage';
import CustomerExperiencePage from '@pages/CustomerExperiencePage';
import PrivacyPolicyPage from '@pages/PrivacyPolicyPage';
import CookiesPage from '@pages/CookiesPage';
import TermsConditionPage from '@pages/TermsConditionPage';
import AboutPage from '@pages/AboutPage';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<HomePage/>}/>
                <Route path={paths.home} element={<HomePage/>}/>
                <Route path={'login'} element={<TokenGuard children={<LoginPage/>}/>}/>
                <Route path={'signup'} element={<TokenGuard children={<SignupPage/>}/>}/>
                <Route path={'reset'} element={<TokenGuard children={<Email/>}/>}/>
                <Route path={'password/:id'} element={<TokenGuard children={<ResetPassword/>}/>}/>
                <Route path={'admin'}>
                    <Route index element={<MainPage/>}/>
                    <Route path={'order/:id'} element={<OrderPage/>}/>
                    <Route path={'users'} element={<UserPage/>}/>
                    <Route path={'users/:id'} element={<UserProfilePage/>}/>
                    <Route path={'reviews/text'} element={<TextReviewPage/>}/>
                    <Route path={'manager'} element={<PageManagerPage/>}/>
                </Route>
                <Route path={paths.design_shoe} element={<DesignShoePage/>}/>
                <Route path={paths.design_bag} element={<DesignBagPage/>}/>
                <Route path={paths.accessories} element={<AccessoriesPage/>}/>
                <Route path={paths.shoe_care_product} element={<ShoeCareProductPage/>}/>
                <Route path={paths.customer_experience} element={<CustomerExperiencePage/>}/>
                <Route path={paths.privacy_policy} element={<PrivacyPolicyPage/>}/>
                <Route path={paths.cookies} element={<CookiesPage/>}/>
                <Route path={paths.terms_condition} element={<TermsConditionPage/>}/>
                <Route path={paths.about} element={<AboutPage/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
