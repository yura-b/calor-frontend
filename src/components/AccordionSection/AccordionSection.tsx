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
}

const AccordionSection: React.FC<AccordionSectionProps> = ({ title, isOpen, toggleAccordion, children }) => {
  return (
    <div className={'border-b border-white lg:border-none lg:py-0'}>
      <motion.div className="flex justify-between items-center py-2" onClick={toggleAccordion}>
        <h1 className={`${styles.subtitle}`}>{title}</h1>
        <motion.img
          src={down}
          alt=""
          className={'ml-4 xl:ml-1 lg:hidden'}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          <motion.div {...collapseAnimation} className="lg:hidden">
            {children}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="hidden lg:block mt-1">{children}</div>
    </div>
  );
};

export default AccordionSection;
