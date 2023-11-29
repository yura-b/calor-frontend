import React from 'react';
import { motion } from 'framer-motion';
import { fadeAnimation } from '@styles/Animations';
import styles from '@styles/Styles.module.scss';

const ReturnsExchange: React.FC = () => {
  return (
    <motion.div {...fadeAnimation} className={`${styles.container}`}>
      <div className="flex flex-col  justify-between mb-2 lg:mb-6">
        <h1 className={`${styles.header1} text-center `}>Returns & Exchange</h1>
        <p className="py-2 font-bold text-gray">What is your return and exchange policy?</p>
        <p>
          We want you to be completely satisfied with your CALOR purchase. If, for any reason, you're not happy with
          your order, please refer to our Returns & Exchanges policy on our website for detailed instructions.{' '}
        </p>
        <p className="py-2 font-bold text-gray">What if the shoes I ordered don't fit perfectly?</p>
        <p>
          We understand that getting the perfect fit is crucial. If the shoes you ordered from CALOR do not fit
          perfectly, please refer to our Returns & Exchanges policy on our website. We offer hassle-free returns and
          exchanges for unworn shoes within a specified period. Our customer support team will be ready to assist you in
          finding the correct size or providing alternative options to ensure your satisfaction. If you have any further
          questions or concerns regarding shoe sizes, please feel free to reach out to our customer support team. We're
          here to help you find the perfect fit and make your CALOR experience exceptional.
        </p>
      </div>
    </motion.div>
  );
};

export default ReturnsExchange;
