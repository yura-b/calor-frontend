import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import HomePage from '@/pages/user/HomePage';
import LoginPage from '@/pages/autorization/login/LoginPage.tsx';
import SignupPage from '@/pages/autorization/signup/SignupPage.tsx';
import {useQuery} from 'react-query';
import {useAppDispatch, useAppSelector} from '@/store/hooks/hooks.ts';
import {errorCorrupted, loading} from '@/store/reducers/StatusReducer.ts';
import {getTexts} from '@/api/languages.ts';
import {setLanguages} from '@/store/reducers/LanguageReducer.ts';
import {HttpStatusCode} from 'axios';

const App = () => {
    const dispatch = useAppDispatch();
    const {isLoading, error, data} = useQuery('repoData', () => getTexts());

    if (error) dispatch(errorCorrupted('something went wrong'));
    if (isLoading) dispatch(loading());
    if (data?.status === HttpStatusCode.Ok) dispatch(setLanguages(data.data));

    let {access_token} = useAppSelector(state => state.user)
    access_token=''
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<HomePage/>}/>
                <Route path={'login'} element={access_token ? <Navigate to="/"/> : <LoginPage/>}/>
                <Route path={'signup'} element={access_token ? <Navigate to="/"/> : <SignupPage/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
