import React from 'react';
import { motion } from 'framer-motion';
import { fadeAnimation } from '@styles/Animations';
import styles from '@styles/Styles.module.scss';

const ReturnsExchange: React.FC = () => {
  return (
    <motion.div {...fadeAnimation} className={`${styles.container}`} id="returns&Exchange">
      <div className="flex flex-col  items-center justify-between mb-2 lg:mb-6">
        <h1 className={`${styles.header1} text-center `}>Returns & Exchange</h1>
        <p className="py-2">
          Description Description Description Description Description Description Description Description Description
          Description Description Description
        </p>
      </div>
    </motion.div>
  );
};

export default ReturnsExchange;
