import React, { useState } from 'react';
import CustomInput from '@components/input/CustomInput.tsx';
import CustomButton from '@components/button/CustomButton.tsx';
import AlreadyRegistered from '@pages/autorization/signup/otherInfo/components/AlreadyRegistered.tsx';
import PasswordIdentifier from '@pages/autorization/signup/otherInfo/components/PasswordIdentifier.tsx';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import { setFirstPassword, setSecondPassword, setStep, Steps } from '@/store/reducers/RegistrationReducer.ts';
import {
  minLengthValidation,
  oneLowerCaseValidation,
  oneNumberValidation,
  oneUpperCaseValidation,
} from '@/helpers/validation/formValidation.ts';
import { signUp } from '@/api/authorization.ts';
import { IUser } from '@/store/reducers/UserReducer.ts';
import { errorCorrupted, loading, loadingFinished } from '@/store/reducers/StatusReducer.ts';
import { InputType } from '@/constants/interfaces/inputTypes.ts';

interface IProps {
  setUserData: React.Dispatch<React.SetStateAction<IUser>>;
}

const Password: React.FC<IProps> = ({ setUserData }) => {
  const { firstPassword, secondPassword, email, phoneNumber, secondName, firstName } = useAppSelector(
    (state) => state.registration
  );
  const dispatch = useAppDispatch();

  const [matchError, setMatchError] = useState({
    isError: false,
    errorMessage: '',
  });

  const firstPasswordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFirstPassword(e.currentTarget.value));
  };
  const secondPasswordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSecondPassword(e.currentTarget.value));
  };

  const buttonHandler = () => {
    const values = Object.entries(firstPassword).map((el) => !!el[1]);

    if (!values.find((el) => !el)) {
      if (secondPassword === firstPassword.value) {
        dispatch(loading());

        signUp({ password: secondPassword, email, phoneNumber, secondName, firstName })
          .then((res) => {
            const data = res.data;
            setUserData(data);

            dispatch(setStep(Steps.FOURTH));

            dispatch(loadingFinished());
          })
          .catch((e) => {
            dispatch(errorCorrupted(e.response.data.message));
          });
      } else {
        setMatchError({
          errorMessage: 'Passwords do not match',
          isError: true,
        });
      }
    }
  };

  return (
    <div className={'flex flex-col p-5 w-full items-center max-w-2xl'}>
      <div className={'w-full'}>
        <h3 className={'font-bold'}>Create Password</h3>
        <div className={'flex flex-col '}>
          <PasswordIdentifier
            text={'One uppercase character'}
            handler={oneUpperCaseValidation}
            property={'upperCase'}
          />
          <PasswordIdentifier text={'8 characters minimum'} handler={minLengthValidation} property={'minLength'} />
          <PasswordIdentifier text={'One number'} handler={oneNumberValidation} property={'number'} />
          <PasswordIdentifier
            text={'One lowercase character'}
            handler={oneLowerCaseValidation}
            property={'lowerCase'}
          />
        </div>
      </div>

      <div className={'w-full'}>
        <CustomInput
          id={'firstPassword'}
          name={'firstPassword'}
          type={InputType.password}
          placeholder={'input password'}
          value={firstPassword.value}
          onChange={firstPasswordChangeHandler}
          border={'1px solid #D9D9D9'}
        ></CustomInput>

        <CustomInput
          type={InputType.password}
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
  );
};

export default Password;
