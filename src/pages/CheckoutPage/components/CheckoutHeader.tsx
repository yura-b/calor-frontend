import { useState } from 'react';
import { useNavigate } from 'react-router';
import styles from '@styles/Styles.module.scss';
import { ReactSVG } from 'react-svg';
import leftArrowIcon from '@assets/images/leftArrowIcon.svg';
import { CheckoutSteps, setCheckoutStep } from '@/store/reducers/CheckoutReducer.ts';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';

const CheckoutHeader = () => {
  const { step } = useAppSelector((state) => state.checkout);
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dispatch = useAppDispatch();

  const arrowHandler = () => {
    if (step === CheckoutSteps.FIRST || step === undefined) {
      navigate(-1);
    }
    if (step === CheckoutSteps.SECOND) {
      dispatch(setCheckoutStep(CheckoutSteps.FIRST));
    }
    if (step === CheckoutSteps.THIRD) {
      dispatch(setCheckoutStep(CheckoutSteps.SECOND));
    }
    setIsCartOpen(true);
  };

  return (
    <div className={` ${styles.container} flex flex-row justify-center items-center align-baseline mb-4 py-4 relative`}>
      <div className={'cursor-pointer mr-auto'} onClick={arrowHandler}>
        <ReactSVG
          src={leftArrowIcon}
          beforeInjection={(svg) => {
            svg.classList.add('icon');
            svg.setAttribute('stroke', '#404040');
          }}
        />
      </div>
      <h2 className={`${styles.header1} text-gray uppercase font-bold m-auto ml-0`}>Checkout</h2>
    </div>
  );
};

export default CheckoutHeader;
