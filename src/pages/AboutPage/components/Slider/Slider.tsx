import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import calorByYouBig1 from '@assets/aboutImages/calorByYouBig1.png';
import calorByYou1 from '@assets/aboutImages/calorByYou1.png';
import calorByYouBig2 from '@assets/aboutImages/calorByYouBig2.png';
import calorByYou2 from '@assets/aboutImages/calorByYou2.png';
import calorByYouBig3 from '@assets/aboutImages/calorByYouBig3.png';
import calorByYou3 from '@assets/aboutImages/calorByYou3.png';
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
        img: calorByYouBig1,
      },
      {
        img: calorByYouBig2,
      },
      {
        img: calorByYouBig3,
      },
    ];
  } else {
    sliderItems = [
      {
        img: calorByYou1,
      },
      {
        img: calorByYou2,
      },
      {
        img: calorByYou3,
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
            className="w-full h-full max-w-full object-cover object-contain absolute top-0 left-0"
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
      <img
        src={homeCircle}
        className={`hidden lg:block absolute z-10 right-[4%]  lg:h-64 lg:top-52 lg:right-[10%] xl:top-56 xl:h-60 ${
          isSmallerThan1600px ? '2xl:h-80 2xl:top-36' : '2xl:h-80 2xl:top-32'
        }`}
        style={{ maxWidth: '100%' }}
      />
    </div>
  );
};

export default Slider;
