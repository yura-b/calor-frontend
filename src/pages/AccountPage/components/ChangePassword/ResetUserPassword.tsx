import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import PasswordIdentifier from '@pages/autorization/signup/otherInfo/components/PasswordIdentifier.tsx';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import { errorCorrupted, loading, loadingFinished, showMessage } from '@/store/reducers/StatusReducer.ts';
import { resetPassword } from '@/api/authorization.ts';
import {
  minLengthValidation,
  oneLowerCaseValidation,
  oneNumberValidation,
  oneUpperCaseValidation,
} from '@/helpers/validation/formValidation.ts';
import CustomInput from '@components/input/CustomInput.tsx';
import CustomButton from '@components/button/CustomButton.tsx';

import style from '@styles/Styles.module.scss';
import AccountLayout from '../AccountLayout';
import Button from '@/components/ui/Button';

const ResetUserPassword = () => {
  const [firstPasswordInputValue, setfirstPasswordInputValue] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [isSent, setIsSent] = useState(false);

  const { firstPassword } = useAppSelector((state) => state.registration);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [matchError, setMatchError] = useState({
    isError: false,
    errorMessage: '',
  });

  const handleClick = () => {
    navigate('/login');
    //
  };
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
          setIsSent(true);
          dispatch(showMessage(`A password has been changed successfully!`));
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
      <AccountLayout>
        {!isSent && (
          <div className={'flex flex-col items-center w-full lg:w-[640px]'}>
            <h2 className={`${style.header2} text-gray`}>NEW PASSWORD</h2>
            <div className={'flex flex-col p-5 mt-5 w-full'}>
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
                <PasswordIdentifier
                  text={'One number'}
                  handler={oneNumberValidation}
                  password={firstPasswordInputValue}
                />
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
                  placeholder={'Input your new password'}
                  value={firstPasswordInputValue}
                  onChange={firstPasswordInputValueChangeHandler}
                  border={'1px solid #D9D9D9'}
                ></CustomInput>

                <CustomInput
                  id={'secondPassword'}
                  name={'secondPassword'}
                  placeholder={'Input your new password'}
                  value={secondPassword}
                  onChange={secondPasswordChangeHandler}
                  border={'1px solid #D9D9D9'}
                >
                  Confirm Password
                </CustomInput>
                {matchError.isError && <p className={'text-custom-red'}>{matchError.errorMessage}</p>}
                <CustomButton styles={'w-full'} title={'Create a New Password'} handler={buttonHandler} />
              </div>
            </div>
          </div>
        )}

        {isSent && (
          <div className="flex items-center justify-center w-full m-auto ">
            <div className={'flex flex-col items-center justify-center '}>
              <h2 className={`${style.header2} text-gray mb-10`}>NEW PASSWORD</h2>
              <div className={style.body1}>
                A password has been successfully <br /> created.
              </div>
              <div className="w-full mt-5">
                <Button color="gray" onClick={handleClick}>
                  Main Page
                </Button>
              </div>
            </div>
          </div>
        )}
      </AccountLayout>
    </div>
  );
};

export default ResetUserPassword;
