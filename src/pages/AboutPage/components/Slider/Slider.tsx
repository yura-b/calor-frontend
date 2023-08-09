import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import slider1 from '@assets/aboutImages/slider1.svg';
import calorByYou from '@assets/images/calorByYou.svg';
import calorByYouBig from '@assets/images/calorByYouBig.png';
import homeCircle from '@assets/images/homeCircle.svg';
import { fadeAnimation } from '@styles/Animations';
import { useMediaQuery } from '@react-hook/media-query';

const Slider = () => {
  const breakpoint640 = 640;
  let sliderItems;
  const isSmallerThan1600px = useMediaQuery('(max-width: 1600px)');
  if (window.innerWidth > breakpoint640) {
    sliderItems = [
      {
        img: calorByYouBig,
      },
      {
        img: calorByYouBig,
      },
      {
        img: calorByYouBig,
      },
    ];
  } else {
    sliderItems = [
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
  }

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
    <div>
      <motion.div className="relative h-80 max-w-full overflow-hidden" {...fadeAnimation}>
        <div className="w-full h-full max-w-full m-auto relative">
          <motion.img
            key={currentIndex}
            src={sliderItems[currentIndex].img}
            className="w-full h-full max-w-full object-cover absolute top-0 left-0"
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
          <div className="absolute top-0 left-0 w-full h-full bg-custom-red opacity-80" />
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
      <img
        src={homeCircle}
        className={`hidden lg:block absolute z-10 right-[4%]  lg:h-64 lg:top-64 lg:right-[10%] xl:top-64 xl:h-64 ${
          isSmallerThan1600px ? '2xl:h-80 2xl:top-40' : '2xl:h-80 2xl:top-32'
        }`}
        style={{ maxWidth: '100%' }}
      />
    </div>
  );
};

export default Slider;
