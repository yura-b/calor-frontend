import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import PasswordIdentifier from '@pages/autorization/signup/otherInfo/components/PasswordIdentifier.tsx';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import { errorCorrupted, loading, loadingFinished } from '@/store/reducers/StatusReducer.ts';
import { resetPassword } from '@/api/authorization.ts';
import {
  minLengthValidation,
  oneLowerCaseValidation,
  oneNumberValidation,
  oneUpperCaseValidation,
} from '@/helpers/validation/formValidation.ts';
import CustomInput from '@components/input/CustomInput.tsx';
import CustomButton from '@components/button/CustomButton.tsx';
import AlreadyRegistered from '@pages/autorization/signup/otherInfo/components/AlreadyRegistered.tsx';
import AuthorizationHeader from '@pages/autorization/components/header/AuthorizationHeader.tsx';

const ResetPassword = () => {
  const [firstPasswordInputValue, setfirstPasswordInputValue] = useState('');
  const [secondPassword, setSecondPassword] = useState('');

  const { firstPassword } = useAppSelector((state) => state.registration);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [matchError, setMatchError] = useState({
    isError: false,
    errorMessage: '',
  });

  const params = useParams();
  if (!params.id) return;

  // convert from base64 to string
  const id = atob(params.id);

  const firstPasswordInputValueChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setfirstPasswordInputValue(e.currentTarget.value);
  };
  const secondPasswordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecondPassword(e.currentTarget.value);
  };

  const buttonHandler = () => {
    if (
      secondPassword === firstPasswordInputValue &&
      !firstPassword.minLength &&
      !firstPassword.upperCase &&
      !firstPassword.number &&
      !firstPassword.lowerCase
    ) {
      resetPassword(id, secondPassword)
        .then(() => {
          dispatch(loading());
          dispatch(loadingFinished());
          navigate('/login');
        })
        .catch((e) => {
          console.log(e);
          dispatch(errorCorrupted(e.response.data.message));
        });
    } else {
      console.log(firstPassword);

      setMatchError({
        errorMessage: 'Passwords do not match',
        isError: true,
      });
    }
  };
  return (
    <div>
      <AuthorizationHeader />
      <div className={'flex flex-col p-5 mt-10 md:max-w-2xl relative mx-auto'}>
        <h3 className={'font-bold'}>New Password</h3>
        <div className={'flex flex-col'}>
          <PasswordIdentifier
            text={'One uppercase character'}
            handler={oneUpperCaseValidation}
            password={firstPasswordInputValue}
          />
          <PasswordIdentifier
            text={'8 characters minimum'}
            handler={minLengthValidation}
            password={firstPasswordInputValue}
          />
          <PasswordIdentifier text={'One number'} handler={oneNumberValidation} password={firstPasswordInputValue} />
          <PasswordIdentifier
            text={'One lowercase character'}
            handler={oneLowerCaseValidation}
            password={firstPasswordInputValue}
          />
        </div>

        <div className={'w-full'}>
          <CustomInput
            id={'firstPasswordInputValue'}
            name={'firstPasswordInputValue'}
            placeholder={'input password'}
            value={firstPasswordInputValue}
            onChange={firstPasswordInputValueChangeHandler}
            border={'1px solid #D9D9D9'}
          ></CustomInput>

          <CustomInput
            id={'secondPassword'}
            name={'secondPassword'}
            placeholder={'input password'}
            value={secondPassword}
            onChange={secondPasswordChangeHandler}
            border={'1px solid #D9D9D9'}
          >
            Confirm Password
          </CustomInput>
          {matchError.isError && <p className={'text-custom-red'}>{matchError.errorMessage}</p>}
          <CustomButton styles={'w-full'} title={'Continue'} handler={buttonHandler} />
          <AlreadyRegistered />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
