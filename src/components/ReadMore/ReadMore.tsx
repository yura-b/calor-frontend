import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { hoverOnButtonAnimation } from '@/styles/Animations';
import styles from '@styles/Styles.module.scss';

interface Props {
  initialText: string;
  expandedText: string;
  className?: string;
}

const ReadMore: React.FC<Props> = ({ initialText, expandedText, className }) => {
  const [showFullText, setShowFullText] = useState(false);

  useEffect(() => {
    setShowFullText(showFullText);
  }, [showFullText]);

  const handleToggleText = () => {
    setShowFullText(!showFullText);
  };

  return (
    <div className={`text-left m-auto min-h-max ${styles.container} ${className} py-0`}>
      <AnimatePresence initial={false}>
        <motion.p
          key={showFullText ? 'expandedText' : 'initialText'}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          {showFullText ? expandedText : initialText}
        </motion.p>
      </AnimatePresence>
      {initialText != '' && (
        <motion.a
          onClick={handleToggleText}
          className={`text-gray text-base underline cursor-pointer block text-center p-3 max-w-max  mx-auto hover:font-bold ${
            showFullText && 'focus:text-mint'
          } md:text-lg `}
          {...hoverOnButtonAnimation}
        >
          {showFullText ? 'Read Less' : 'Read More'}
        </motion.a>
      )}
    </div>
  );
};

export default ReadMore;
