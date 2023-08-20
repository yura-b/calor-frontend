import React, { lazy, Suspense } from 'react';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import LoginPage from '@pages/autorization/login/LoginPage.tsx';
import SignupPage from '@pages/autorization/signup/SignupPage.tsx';
import Email from '@pages/autorization/forgotPassword/Email.tsx';
import TokenGuard from '@routes/TokenGuard.tsx';
import ResetPassword from '@pages/autorization/forgotPassword/ResetPassword.tsx';
import OrderPage from '@pages/admin/main/OrderPage.tsx';
import UserPage from '@pages/admin/users/UserPage.tsx';
import UserProfilePage from '@pages/admin/users/UserProfilePage.tsx';
import TextReviewPage from '@pages/admin/reviews/textReviews/TextReviewPage.tsx';
import PageManagerPage from '@pages/admin/pageManager/PageManagerPage.tsx';
import {paths} from '@routes/paths.ts';
import MainPage from '@pages/admin/main/MainPage.tsx';
import DesignBagPage from '@pages/DesignBagPage';
import AccessoriesPage from '@pages/AccessoriesPage';
import ShoeCareProductPage from '@pages/ShoeCareProductPage';
import CustomerExperiencePage from '@pages/CustomerExperiencePage';
import PrivacyPolicyPage from '@pages/PrivacyPolicyPage';
import CookiesPage from '@pages/CookiesPage';
import TermsConditionPage from '@pages/TermsConditionPage';
import AboutPage from '@pages/AboutPage';
import CreateEvent from '@pages/admin/pageManager/CreateEvent.tsx';
import WarehousePage from '@pages/admin/warehouse/WarehousePage.tsx';
import Loader from '@/components/ui/Loader/';

const HomePage = lazy(() => import('@pages/HomePage'));
const DesignShoePage = lazy(() => import('@pages/DesignShoePage'));

const App = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<Loader />}>
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
                        <Route path={'createevent'} element={<CreateEvent/>}/>
                        <Route path={'warehouse'} element={<WarehousePage/>}/>
                    </Route>
                    <Route path={'design_your_shoe'}>
                        <Route index element={<Navigate to="dayger" replace />} />
                        <Route path={'dayger'} element={<DesignShoePage model="dayger" />} />
                        <Route path={'sunrise'} element={<DesignShoePage model="sunrise" />} />
                        <Route path={'yolo'} element={<DesignShoePage model="yolo" />} />
                    </Route>
                    <Route path={paths.design_bag} element={<DesignBagPage/>}/>
                    <Route path={paths.accessories} element={<AccessoriesPage/>}/>
                    <Route path={paths.shoe_care_product} element={<ShoeCareProductPage/>}/>
                    <Route path={paths.customer_experience} element={<CustomerExperiencePage/>}/>
                    <Route path={paths.privacy_policy} element={<PrivacyPolicyPage/>}/>
                    <Route path={paths.cookies} element={<CookiesPage/>}/>
                    <Route path={paths.terms_condition} element={<TermsConditionPage/>}/>
                    <Route path={paths.about} element={<AboutPage/>}/>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default App;
