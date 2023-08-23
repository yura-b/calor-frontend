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

const Footer: React.FC = (): React.ReactElement => {
  return (
    <footer className="bg-gray text-white w-full overflow-hidden">
      <div className={`${styles.container} lg:relative `}>
        <div className="lg:flex gap-4 justify-between lg:max-w-[80%]">
          <div className={`flex justify-between ${styles.body2} font-bold text-white  pt-4 pb-2 lg:p-0 bg`}>
            <div>
              <div className="lg:flex lg:flex-col hidden lg:block">
                <Link
                  to="#"
                  className={`${styles.subtitle} text-mint lg:text-custom-turquoise lg:text-sm lg:font-extrabold`}
                >
                  Check Order Status
                </Link>
                <Link
                  to="#"
                  className={`${styles.subtitle} text-mint lg:text-custom-turquoise lg:text-sm lg:font-extrabold  py-3`}
                >
                  Be Our Partner
                </Link>
              </div>
              <p className="lg:text-custom-turquoise lg:text-sm lg:font-extrabold">Follow Us</p>
              <div className="flex justify-between mt-2 max-w-[80px]">
                <Link to="https://www.instagram.com/calorshoe" target="_blank">
                  <img src={instagramIcon} />
                </Link>
                <Link to="https://www.facebook.com/calorshoeus" target="_blank">
                  <img src={facebookIcon} />
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
