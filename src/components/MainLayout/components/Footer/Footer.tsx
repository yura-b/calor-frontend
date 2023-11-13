import React from 'react';
import HelpFooter from '../HelpFooter';
import AboutCalorFooter from '../AboutCalorFooter';
import { Link } from 'react-router-dom';
import styles from '@/styles/Styles.module.scss';
import { motion } from 'framer-motion';
import { hoverOnButtonAnimation } from '@/styles/Animations';
import arrowUpIcon from '@assets/images/arrowUpIcon.svg';
import instagramIcon from '@assets/images/instagramIcon.svg';
import facebookIcon from '@assets/images/facebookIcon.svg';
import { useAppSelector } from '@/store/hooks/hooks.ts';
import { Role } from '@/constants/enums/role.enum.ts';
import { paths } from '@/routes/paths';

const TikTokIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 24 24">
      <path
        fill="#404040"
        d="M12.525.02c1.31-.02 2.61-.01 3.91-.02c.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97c-.57-.26-1.1-.59-1.62-.93c-.01 2.92.01 5.84-.02 8.75c-.08 1.4-.54 2.79-1.35 3.94c-1.31 1.92-3.58 3.17-5.91 3.21c-1.43.08-2.86-.31-4.08-1.03c-2.02-1.19-3.44-3.37-3.65-5.71c-.02-.5-.03-1-.01-1.49c.18-1.9 1.12-3.72 2.58-4.96c1.66-1.44 3.98-2.13 6.15-1.72c.02 1.48-.04 2.96-.04 4.44c-.99-.32-2.15-.23-3.02.37c-.63.41-1.11 1.04-1.36 1.75c-.21.51-.15 1.07-.14 1.61c.24 1.64 1.82 3.02 3.5 2.87c1.12-.01 2.19-.66 2.77-1.61c.19-.33.4-.67.41-1.06c.1-1.79.06-3.57.07-5.36c.01-4.03-.01-8.05.02-12.07z"
      />
    </svg>
  );
};

const Footer: React.FC = (): React.ReactElement => {
  const { roles, access_token } = useAppSelector((state) => state.user);
  const isRegisteredUser = !!(roles?.includes(Role.USER) && access_token);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <footer className="bg-gray text-white w-full overflow-hidden">
      <div className={`${styles.container} lg:relative `}>
        <div className="lg:flex gap-4 justify-between lg:max-w-[80%]">
          <div className={`flex justify-between ${styles.body2} font-bold text-white  pt-4 pb-2 lg:p-0 bg`}>
            <div>
              <div className="lg:flex lg:flex-col hidden lg:block">
                {isRegisteredUser && (
                  <Link
                    to={paths.myOrders}
                    className={`${styles.subtitle} text-mint lg:text-custom-turquoise lg:text-sm lg:font-extrabold`}
                    onClick={scrollToTop}
                  >
                    Check Order Status
                  </Link>
                )}
                {!isRegisteredUser && (
                  <Link
                    to={paths.myOrder}
                    className={`${styles.subtitle} text-mint lg:text-custom-turquoise lg:text-sm lg:font-extrabold`}
                    onClick={scrollToTop}
                  >
                    Check Order Status
                  </Link>
                )}
                <Link
                  to="https://calorfranchise.com/"
                  className={`${styles.subtitle} text-mint lg:text-custom-turquoise lg:text-sm lg:font-extrabold  py-3`}
                >
                  Be Our Partner
                </Link>
              </div>
              <p className="lg:text-custom-turquoise lg:text-sm lg:font-extrabold">Follow Us</p>
              <div className="flex justify-between items-center mt-2 max-w-[100px] gap-1">
                <Link to="https://www.facebook.com/calorshoeus" target="_blank">
                  <img src={facebookIcon} />
                </Link>
                <Link to="https://www.instagram.com/calorshoe" target="_blank">
                  <img src={instagramIcon} />
                </Link>
                <Link to="https://www.tiktok.com/@calorshoe?_t=8hATfDRfwFS&_r=1" target="_blank">
                  <div className="bg-white p-[6px] rounded-md c">
                    <TikTokIcon color="white" />
                  </div>
                </Link>
              </div>
            </div>
            <motion.button
              className={'flex items-start lg:absolute lg:right-0 lg:text-base lg:font-extrabold'}
              onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
              }}
              {...hoverOnButtonAnimation}
            >
              <span className="mr-2">Back To Top</span>
              <img src={arrowUpIcon} />
            </motion.button>
          </div>
          <AboutCalorFooter />
          <HelpFooter title={'Get Help'} color="white" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
