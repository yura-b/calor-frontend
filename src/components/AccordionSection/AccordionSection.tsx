import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collapseAnimation } from '@styles/Animations';
import styles from '@styles/Styles.module.scss';
import down from '@assets/images/help/down.svg';

interface AccordionSectionProps {
  title?: string;
  isOpen?: boolean;
  toggleAccordion: () => void;
  children?: React.ReactNode;
  className?: string;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({ title, isOpen, toggleAccordion, children, className }) => {
  return (
    <div className={'border-b border-white lg:border-none lg:py-0 w-full'}>
      <motion.div
        className={`${className} flex justify-between items-center py-2 w-full border-b border-grayLight`}
        onClick={toggleAccordion}
      >
        <h1 className={`${styles.body2} font-semibold`}>{title}</h1>
        <motion.img
          src={down}
          alt=""
          className={'ml-4 xl:ml-1 '}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          <motion.div {...collapseAnimation} className="py-4">
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccordionSection;
