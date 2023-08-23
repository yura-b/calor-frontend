import React from 'react';
import X from '../../../../../assets/images/SignUpHeaderImg/X.png';
import arrow from '../../../../../assets/images/SignUpHeaderImg/arrow.png';
import CustomStepper from '@pages/autorization/signup/otherInfo/components/Stepper.tsx';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import { setStep, Steps } from '@/store/reducers/RegistrationReducer.ts';
import { useNavigate } from 'react-router';

const SignupHeader = () => {
  const { step } = useAppSelector((state) => state.registration);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const xHandler = () => {
    navigate('/login');
  };

  const arrowHandler = () => {
    if (step === Steps.SECOND) {
      dispatch(setStep(Steps.FIRST));
    }
    if (step === Steps.THIRD) {
      dispatch(setStep(Steps.SECOND));
    }
  };

  return (
    <div className={'mb-12'}>
      <div className={'flex flex-row align-baseline bg-custom-turquoise justify-between p-5 mb-12'}>
        <img src={arrow} onClick={arrowHandler} className={step === Steps.FOURTH ? 'invisible' : ''} alt="" />
        <h3 className={'uppercase font-bold'}>Sign Up</h3>
        <img onClick={xHandler} src={X} alt={''} />
      </div>
      <div>
        <CustomStepper />
      </div>
    </div>
  );
};

export default SignupHeader;
