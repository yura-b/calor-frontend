import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { helpLinks, privacyLinks } from '../../helpers/data';
import styles from '@/styles/Styles.module.scss';
import atIcon from '@/assets/images/atIcon.svg';
import grayTelIcon from '@assets/images/grayTelIcon.svg';
import mintTelcon from '@assets/images/mintTelcon.svg';
import { motion, AnimatePresence } from 'framer-motion';
import { collapseAnimation } from '@styles/Animations';

interface Props {
  title: string;
  color?: 'gray' | 'white';
  openMyOrder?: () => void;
}

const HelpFooter: React.FC<Props> = ({ title, color, openMyOrder }): React.ReactElement => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const toggleAccordion = () => {
    setIsAccordionOpen((prev) => !prev);
  };

  return (
    <>
      {color !== 'white' ? (
        <>
          <h1 className={`${styles.subtitle} text-${color}`}>{title}</h1>
          {helpLinks.map((link, i) => (
            <Link key={i} to={link.path} className={'flex text-base hover:text-mint focus:outline-none py-2'}>
              {link.title}
            </Link>
          ))}
        </>
      ) : (
        <div className="border-b border-white lg:border-none lg:py-0">
          <div className="flex justify-between items-center" onClick={toggleAccordion}>
            <h1 className={`${styles.subtitle} text-${color} lg:text-custom-turquoise lg:text-sm lg:font-extrabold`}>
              {title}
            </h1>
            <h1 className={`text-[32px] font-extralight text-${color}  lg:hidden`}>{isAccordionOpen ? '-' : '+'}</h1>
          </div>
          <AnimatePresence>
            {isAccordionOpen && (
              <motion.div {...collapseAnimation}>
                {helpLinks.map((link, i) => (
                  <Link
                    key={i}
                    to={link.path}
                    className={'flex text-base hover:text-custom-turquoise focus:outline-none py-2'}
                  >
                    {link.title}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          <div className="hidden lg:block mt-1">
            {helpLinks.map((link, i) => (
              <Link
                key={i}
                to={link.path}
                className={'flex text-xs font-semibold hover:text-custom-turquoise focus:outline-none py-1'}
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      )}
      {color == 'white' && (
        <div className="lg:hidden flex flex-col">
          <Link
            to="#"
            onClick={openMyOrder}
            className={`${styles.subtitle} text-${color} lg:text-custom-turquoise lg:text-sm lg:font-extrabold border-b border-white py-3`}
          >
            Check Order Status
          </Link>
          <Link
            to="#"
            className={`${styles.subtitle} text-${color} lg:text-custom-turquoise lg:text-sm lg:font-extrabold  py-3 border-b border-white`}
          >
            Be Our Partner
          </Link>
        </div>
      )}
      <div
        className={`flex justify-between text-sm text-${color} py-4 ${
          color === 'white' ? 'px-0' : 'font-bold'
        } lg:hidden`}
      >
        <div className={'flex basis-1/2 '}>
          <img src={grayTelIcon} className={`mr-2 filter ${color === 'white' ? 'brightness-0 invert' : ''}`} alt="" />
          <span>1 234 567 8910</span>
        </div>
        <div className={'flex'}>
          <img src={atIcon} className={`mr-2 filter ${color === 'white' ? 'brightness-0 invert' : ''}`} alt="" />
          <span>2023 Calor</span>
        </div>
      </div>
      <div className={'lg:flex lg:absolute lg:right-0 lg:bottom-10 hidden lg:block lg:text-sm'}>
        <img src={atIcon} className={`mr-2 filter ${color === 'white' ? 'brightness-0 invert' : ''}`} alt="" />
        <span>2023 Calor</span>
      </div>
      {color === 'white' && (
        <>
          <div className="text-xs">
            <div className="flex  justify-between lg:flex-col">
              <div className={'mb-1  hidden lg:block lg:text-custom-turquoise lg:flex'}>
                <img src={mintTelcon} className={'mr-2  '} alt="" />
                <span className="lg:text-sm lg:font-extrabold">1 234 567 8910</span>
              </div>
              <p className="font-semibold leading-6">
                6734 Westheimer Lakes North,
                <br /> Suite 107, Katy, TX, 77494
              </p>
              <p className="font-semibold leading-6">magic@calorshoe.com</p>
            </div>
          </div>
          <div className="flex justify-between text-xs mt-3 lg:flex-col lg:justify-start lg:mt-0">
            <h1 className={'text-custom-turquoise hidden lg:block lg:text-sm lg:font-extrabold'}>Info</h1>
            {privacyLinks.map((link, i) => (
              <Link
                key={i}
                to={link.path}
                className={' text-xs font-semibold hover:text-custom-turquoise focus:outline-none py-1'}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default HelpFooter;
