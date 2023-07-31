import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { hoverOnButtonAnimation } from '@/styles/Animations';
import { useMediaQuery } from '@react-hook/media-query';

interface Props {
  initialText: string;
  expandedText: string;
  className?: string;
}

const ReadMore: React.FC<Props> = ({ initialText, expandedText, className }) => {
  const [showFullText, setShowFullText] = useState(true);
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');

  useEffect(() => {
    setShowFullText(isLargeScreen);
  }, [isLargeScreen]);

  const handleToggleText = () => {
    if (!isLargeScreen) {
      setShowFullText(!showFullText);
    }
  };

  return (
    <div className={`text-justify px-6 m-auto min-h-max container ${className}`}>
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
      <motion.a
        onClick={handleToggleText}
        className={`text-gray text-base underline cursor-pointer block text-center p-3 max-w-max my-2 mx-auto hover:font-bold ${
          showFullText && 'focus:text-mint'
        } md:text-lg lg:hidden`}
        {...hoverOnButtonAnimation}
      >
        {showFullText ? 'Read Less' : 'Read More'}
      </motion.a>
    </div>
  );
};

export default ReadMore;
