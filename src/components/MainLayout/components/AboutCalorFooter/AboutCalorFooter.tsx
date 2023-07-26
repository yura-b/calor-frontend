import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { aboutLinks } from '../../helpers/data';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '@/styles/Styles.module.scss';
import { collapseAnimation } from '@styles/Animations';
import { paths } from '@/routes/paths';

const AboutCalorFooter: React.FC = (): React.ReactElement => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const toggleAccordion = () => {
    setIsAccordionOpen((prev) => !prev);
  };

  return (
    <div className="border-b border-white py-2">
      <motion.div className="flex justify-between items-center px-6" onClick={toggleAccordion}>
        <Link to={paths.about} className={`${styles.subtitle} text-white`}>
          About Calor
        </Link>
        <h1 className={`${styles.header1} text-white`}>{isAccordionOpen ? '-' : '+'}</h1>
      </motion.div>
      <AnimatePresence>
        {isAccordionOpen && (
          <motion.div className="px-6" {...collapseAnimation}>
            {aboutLinks.map((link, i) => (
              <Link key={i} to="#" className={'flex text-base hover:text-mint focus:outline-none py-2'}>
                {link}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AboutCalorFooter;
