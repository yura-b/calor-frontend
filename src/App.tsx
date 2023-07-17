import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import LoginPage from '@pages/autorization/login/LoginPage.tsx';
import SignupPage from '@pages/autorization/signup/SignupPage.tsx';
import Email from '@pages/autorization/forgotPassword/Email.tsx';
import TokenGuard from '@routes/TokenGuard.tsx';
import ResetPassword from '@pages/autorization/forgotPassword/ResetPassword.tsx';
import MainPage from '@pages/admin/main/MainPage.tsx';
import UserGridPage from '@pages/admin/users/UserGridPage.tsx';
import React from 'react';
import {useAppSelector} from '@/store/hooks/hooks.ts';
import {Role} from '@/constants/enums/role.enum.ts';
import {useNavigate} from 'react-router';

const App = () => {
    const {roles, access_token} = useAppSelector((state) => state.user);
    const isAdmin = roles?.includes(Role.ADMIN) || (roles?.includes(Role.MANAGER) && access_token);
    const navigate = useNavigate()

    if (!access_token) return navigate('login');
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<HomePage/>}/>
                    <Route path={'login'} element={<TokenGuard children={<LoginPage/>}/>}/>
                    <Route path={'signup'} element={<TokenGuard children={<SignupPage/>}/>}/>
                    <Route path={'reset'} element={<TokenGuard children={<Email/>}/>}/>
                    <Route path={'password/:id'} element={<TokenGuard children={<ResetPassword/>}/>}/>
                    <Route path={'admin'}>
                        <Route index element={<MainPage/>}/>
                        <Route path={'users'} element={<UserGridPage/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
