import React from 'react';
import GoogleButton from '@components/googleButton/GoogleButton.tsx';

const GoogleSignIn = () => {
    return (
        <div className={'flex flex-col flex-1 items-center gap-2 mt-2 h-full '}>
            <div>or</div>
            <GoogleButton>
                <p>
                    Sign In with <span className={'font-bold'}>Google</span>
                </p>
            </GoogleButton>
            <div className={'mt-4 flex-1 align-text-bottomm'}>
                <p>
                    Not a member? <span className={'ml-2 underline font-bold'}>Sign Up</span>
                </p>
            </div>
        </div>
    );
};

export default GoogleSignIn;
