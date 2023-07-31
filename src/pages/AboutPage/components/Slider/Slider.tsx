import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import slider1 from '@assets/aboutImages/slider1.svg';
import calorByYou from '@assets/images/calorByYou.svg';

import { fadeAnimation } from '@styles/Animations';

const Slider = () => {
  const sliderItems = [
    {
      img: slider1,
    },
    {
      img: calorByYou,
    },
    {
      img: slider1,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const autoPlayInterval = 3000;
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const handleAutoPlay = () => {
    setIsAutoPlaying(true);
  };

  const stopAutoPlay = () => {
    setIsAutoPlaying(false);
  };

  useEffect(() => {
    const autoPlay = () => {
      if (isAutoPlaying) {
        setPrevIndex(currentIndex);
        setCurrentIndex((prevIndex) => (prevIndex === sliderItems.length - 1 ? 0 : prevIndex + 1));
      }
    };
    const autoPlayTimer = setInterval(autoPlay, autoPlayInterval);
    return () => {
      clearInterval(autoPlayTimer);
    };
  }, [isAutoPlaying, currentIndex, sliderItems.length]);

  const handleIndicatorClick = (index) => {
    setPrevIndex(currentIndex);
    setCurrentIndex(index);
  };

  const slideAnimation = {
    hidden: { opacity: 0, x: currentIndex > prevIndex ? '100%' : '-100%' },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: currentIndex > prevIndex ? '-100%' : '100%' },
  };

  return (
    <motion.div className="relative h-80 max-w-full overflow-hidden container" {...fadeAnimation}>
      <div className="w-full h-full max-w-full m-auto sm:max-w-xs relative">
        <motion.img
          key={currentIndex}
          src={sliderItems[currentIndex].img}
          className="w-full h-full max-w-full object-cover sm:max-w-xs absolute top-0 left-0"
          style={{ maxHeight: '500px', minHeight: '300px' }}
          alt={`Slider ${currentIndex}`}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={slideAnimation}
          transition={{ duration: 0.6 }}
          onMouseEnter={stopAutoPlay}
          onMouseLeave={handleAutoPlay}
        />

        <div className="absolute bottom-2 left-0 right-0 text-center">
          {sliderItems.map((_, index) => (
            <span
              key={index}
              className={`inline-block w-4 h-4 rounded-full ${
                currentIndex === index ? 'bg-white' : 'bg-transparent'
              } border-2 border-white mx-1 cursor-pointer`}
              onClick={() => handleIndicatorClick(index)}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Slider;
