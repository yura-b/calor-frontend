import React from 'react';
import { motion } from 'framer-motion';
import { fadeAnimation } from '@styles/Animations';
import styles from '@styles/Styles.module.scss';

const Shipping: React.FC = () => {
  return (
    <motion.div {...fadeAnimation} className={`${styles.container} border-b border-gray w-full min-h-[100px]`}>
      <div className="flex flex-col  justify-between mb-2 lg:mb-6">
        <h1 className={`${styles.header1} text-center `}>Shipping</h1>
        <p className="py-2 font-bold">Do you offer international shipping?</p>
        <p>
          Yes, we offer international shipping to many countries worldwide. However, specific delivery destinations may
          be subject to logistical constraints or import regulations. Please refer to our Shipping Information page for
          the list of countries we currently ship to and more details.
        </p>
      </div>
    </motion.div>
  );
};

export default Shipping;
