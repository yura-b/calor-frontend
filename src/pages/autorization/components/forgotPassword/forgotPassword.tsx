import React from 'react';
import {Checkbox} from '@mui/material';

const ForgotPassword = () => {
    const checkboxHandler = () => {
        console.log('checkbox')
    };
    return (
        <div className={'flex justify-between items-center mb-6'}>
            <div className={'flex items-center'}>
                <Checkbox onChange={checkboxHandler}/>
                <p className={'font-bold'}>Remember me</p>
            </div>
            <p className={'underline'}>Forgot password?</p>
        </div>
    );
};

export default ForgotPassword;
