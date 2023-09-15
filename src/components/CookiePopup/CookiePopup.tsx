import { useState, useEffect } from 'react';
import styles from '@styles/Styles.module.scss';
import { motion } from 'framer-motion';
import { hoverOnButtonAnimation } from '@/styles/Animations';

const CookiePopup = () => {
  const [isVisible, setIsVisible] = useState(localStorage.getItem('cookieConsent') !== 'true');

  useEffect(() => {
    if (isVisible) {
      setIsVisible(!localStorage.getItem('cookieConsent'));
    }
  }, [isVisible]);

  const handleAcceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  const handleDeclineCookies = () => {
    localStorage.setItem('cookieConsent', 'false');
    setIsVisible(false);
  };

  return isVisible ? (
    <div id="cookie-popup" className={'fixed bottom-0 right-0 w-full bg-grayLight text-[14px] m-auto'}>
      <div
        className={
          'max-w-[96vw] lg:max-w-[80vw] px-1 pt-2 pb-4  lg:py-5 flex flex-col lg:flex-row justify-between items-center gap-2 lg:gap-4 lg:gap-10 m-auto'
        }
      >
        <div className="lg:basis-[70%]">
          <p className="font-bold">Cookies</p>
          <p>
            We use cookies to improve your experience on our site. By clicking "Accept Cookies," you agree to our use of
            cookies. To learn more, please review our Privacy Policy.
          </p>
        </div>
        <div className="flex flex-row   lg:basis-[40%] xl:basis-[30%] justify-center gap-2 w-full">
          <motion.button
            id="accept-cookie"
            className="w-full bg-white py-2 font-bold max-w-[260px]  basis-[60%]"
            onClick={handleAcceptCookies}
            {...hoverOnButtonAnimation}
          >
            Accept
          </motion.button>
          <motion.button
            id="decline-cookie"
            className="w-full bg-grayLight py-2 font-bold max-w-[260px] basis-[40%]"
            onClick={handleDeclineCookies}
            {...hoverOnButtonAnimation}
          >
            Decline
          </motion.button>
        </div>
      </div>
    </div>
  ) : null;
};

export default CookiePopup;
