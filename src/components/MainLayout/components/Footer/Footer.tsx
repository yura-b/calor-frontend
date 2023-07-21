import React from 'react';
import HelpFooter from '../HelpFooter';
import AboutCalorFooter from '../AboutCalorFooter';
import { Link } from 'react-router-dom';
import { privacyLinks } from '../../helpers/data';
import styles from '@/styles/Styles.module.scss';
import { motion } from 'framer-motion';
import { hoverOnButtonAnimation } from '@/styles/Animations';
import arrowUpIcon from '@assets/images/arrowUpIcon.svg';
import instagramIcon from '@assets/images/instagramIcon.svg';
import facebookIcon from '@assets/images/facebookIcon.svg';

const Footer: React.FC = (): React.ReactElement => {
  return (
    <footer className="bg-gray text-white w-full">
      <div className={`flex justify-between ${styles.body2} font-bold text-white px-6 pt-4 pb-2`}>
        <div>
          <p>Follow Us</p>
          <div className="flex justify-between mt-2">
            <Link to="#">
              <img src={instagramIcon} />
            </Link>
            <Link to="#">
              <img src={facebookIcon} />
            </Link>
          </div>
        </div>
        <motion.div
          className={'flex items-start'}
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
          }}
          {...hoverOnButtonAnimation}
        >
          <span className="mr-2">Back To Top</span>
          <img src={arrowUpIcon} />
        </motion.div>
      </div>
      <AboutCalorFooter />
      <HelpFooter title={'Get Help'} color="white" />
      <div className="text-xs  px-6">
        <div className="flex  justify-between">
          <p className="basis-3/5 text-left">
            6734 Westheimer Lakes North,
            <br /> Suite 107, Katy, TX, 77494
          </p>
          <p className="text-right">magic@calorshoe.com</p>
        </div>
        <div className="flex justify-between">
          {privacyLinks.map((link, i) => (
            <Link key={i} to="#" className={'hover:text-mint focus:outline-none py-4'}>
              {link}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
