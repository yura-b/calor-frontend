import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { helpLinks } from '../../helpers/data';
import styles from '@/styles/Styles.module.scss';
import atIcon from '@/assets/images/atIcon.svg';
import grayTelIcon from '@assets/images/grayTelIcon.svg';
import { motion, AnimatePresence } from 'framer-motion';
import { collapseAnimation } from '@styles/Animations';

interface Props {
  title: string;
  color?: 'gray' | 'white';
}

const HelpFooter: React.FC<Props> = ({ title, color }): React.ReactElement => {
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
            <Link key={i} to="#" className={'flex text-base hover:text-mint focus:outline-none py-2'}>
              {link}
            </Link>
          ))}
        </>
      ) : (
        <div className="border-b border-white py-2">
          <div className="flex justify-between items-center px-6" onClick={toggleAccordion}>
            <h1 className={`${styles.subtitle} text-${color}`}>{title}</h1>
            <h1 className={`${styles.header1} text-white`}>{isAccordionOpen ? '-' : '+'}</h1>
          </div>
          <AnimatePresence>
            {isAccordionOpen && (
              <motion.div className="px-6" {...collapseAnimation}>
                {helpLinks.map((link, i) => (
                  <Link key={i} to="#" className={'flex text-base hover:text-mint focus:outline-none py-2'}>
                    {link}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
      <div className={`flex justify-between text-sm text-${color} py-4 ${color === 'white' ? 'px-6' : 'font-bold'} `}>
        <div className={'flex basis-1/2'}>
          <img src={grayTelIcon} className={`mr-2 filter ${color === 'white' ? 'brightness-0 invert' : ''}`} alt="" />
          <span>1 234 567 8910</span>
        </div>
        <div className={'flex'}>
          <img src={atIcon} className={`mr-2 filter ${color === 'white' ? 'brightness-0 invert' : ''}`} alt="" />
          <span>2023 Calor</span>
        </div>
      </div>
    </>
  );
};

export default HelpFooter;
