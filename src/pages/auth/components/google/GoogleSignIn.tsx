import React from 'react';
import {useGoogleLogin} from '@react-oauth/google';
import GoogleButton from '@components/googleButton/GoogleButton.tsx';
import {googleLogin} from '@/api/authorization.ts';
import {useAppDispatch} from '@/store/hooks/hooks.ts';
import {errorCorrupted, loading, loadingFinished} from '@/store/reducers/StatusReducer.ts';
import {setUserData} from '@/store/reducers/UserReducer.ts';

const GoogleSignIn = () => {
    const dispatch = useAppDispatch()
    const login = useGoogleLogin({
        onSuccess: async tokenResponse => {
            dispatch(loading())

            googleLogin(tokenResponse.access_token).then(res => {

                dispatch(setUserData(res.data))
                dispatch(loadingFinished())
            })

            dispatch(errorCorrupted('something went wrong'))
        },
        onError: () => {
            console.log('Login Failed');
        }
    });

    return (
        <div className={'flex flex-col flex-1 items-center gap-2 mt-2 h-full '}>
            <div>or</div>
            <GoogleButton handler={login}>
                <p>Sign In with <span className={'font-bold'}>Google</span></p>
            </GoogleButton>
            <div className={'mt-4 flex-1 align-text-bottomm'}>
                <p>Not a member? <span className={'ml-2 underline font-bold'}>Sign Up</span></p>
            </div>
        </div>
    );
};

export default GoogleSignIn;
