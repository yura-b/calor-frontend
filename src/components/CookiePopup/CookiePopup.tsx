import { useState, useEffect } from 'react';
import styles from '@styles/Styles.module.scss';
import { motion } from 'framer-motion';
import { hoverOnButtonAnimation } from '@/styles/Animations';

const CookiePopup = () => {
  const [isVisible, setIsVisible] = useState(localStorage.getItem('cookieConsent') !== 'true');

  useEffect(() => {
    if (isVisible) {
      // Display the popup only when cookieConsent is not 'true' in localStorage
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
    <div id="cookie-popup" className={`${styles.body1} cookie-popup fixed bottom-0 right-0 w-full bg-custom-turquoise`}>
      <div
        className={`${styles.container} py-6 flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-10`}
      >
        <div className="lg:basis-[70%]">
          <p className="font-bold">Cookies</p>
          <p>
            We use cookies to improve your experience on our site. By clicking "Accept Cookies," you agree to our use of
            cookies. To learn more, please review our Privacy Policy.
          </p>
        </div>
        <div className="flex flex-col md:flex-row lg:flex-col lg:basis-[30%] gap-3 w-full">
          <motion.button
            id="accept-cookie"
            className="w-full bg-white py-2 font-bold max-w-[360px] m-auto"
            onClick={handleAcceptCookies}
            {...hoverOnButtonAnimation}
          >
            Accept
          </motion.button>
          <motion.button
            id="decline-cookie"
            className="w-full bg-grayLight py-2 font-bold m-auto max-w-[360px]"
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
