import React from 'react';
import X from '../../../../../assets/images/SignUpHeaderImg/X.png';
import arrow from '../../../../../assets/images/SignUpHeaderImg/arrow.png';
import CustomStepper from '@pages/autorization/signup/otherInfo/components/Stepper.tsx';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import { setStep, Steps } from '@/store/reducers/RegistrationReducer.ts';
import { useNavigate } from 'react-router';
import styles from '@styles/Styles.module.scss';

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
    <div className={'flex flex-col items-center mb-12 w-full'}>
      <div className={'bg-custom-turquoise  p-0 mb-12 w-full'}>
        <div className={`${styles.container} p-4  flex flex-row items-center align-baseline justify-between`}>
          <img src={arrow} onClick={arrowHandler} className={step === Steps.FOURTH ? 'invisible' : 'h-6'} alt="" />
          <h3 className={`${styles.header2} uppercase font-bold text-gray`}>Sign Up</h3>
          <img onClick={xHandler} src={X} alt={''} className="h-6" />
        </div>
      </div>
      <div className={'w-full md:w-1/2'}>
        <CustomStepper />
      </div>
    </div>
  );
};

export default SignupHeader;
