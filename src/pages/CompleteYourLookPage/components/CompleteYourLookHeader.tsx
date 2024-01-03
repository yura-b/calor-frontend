import React from 'react';
import CustomStepper from '@pages/CompleteYourLookPage/components/Stepper';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import { setStep, Steps } from '@/store/reducers/CompleteLookReducer';
import { useNavigate } from 'react-router';
import styles from '@styles/Styles.module.scss';
import { ReactSVG } from 'react-svg';
import leftArrowIcon from '@assets/images/leftArrowIcon.svg';

const CompleteYourLookHeader = () => {
  const { step } = useAppSelector((state) => state.completeLook);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const arrowHandler = () => {
    if (step === Steps.FIRST) {
      navigate('/design_your_shoe');
    }
    if (step === Steps.SECOND) {
      dispatch(setStep(Steps.FIRST));
    }
    if (step === Steps.THIRD) {
      dispatch(setStep(Steps.SECOND));
    }
  };

  return (
    <div className={'flex flex-col items-center mb-4 lg:mb-4 w-full'}>
      <div className={'p-0 mb-6 lg:mb-8 w-full'}>
        <div className={`${styles.container} p-0   flex flex-row items-center align-baseline justify-between`}>
          <ReactSVG
            src={leftArrowIcon}
            beforeInjection={(svg) => {
              svg.classList.add('icon');
              svg.setAttribute('stroke', '#404040');
            }}
            className="p-2 cursor-pointer"
            onClick={arrowHandler}
          />
          <h3 className={`${styles.header2} uppercase font-bold text-gray mx-auto`}>Complete your look</h3>
        </div>
      </div>
      <div className={'w-full md:w-1/2'}>
        <CustomStepper />
      </div>
    </div>
  );
};

export default CompleteYourLookHeader;
