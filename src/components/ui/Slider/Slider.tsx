import { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeAnimation } from '@styles/Animations';
import { useMediaQuery } from '@react-hook/media-query';

interface IProps {
  images: string[];
  color?: string;
}

const Slider: FC<IProps> = ({ images, color }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const autoPlayInterval = 5000;
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isEnlarged, setIsEnlarged] = useState(false); // Added state for enlarged image

  const handleAutoPlay = () => {
    setIsAutoPlaying(true);
  };

  const stopAutoPlay = () => {
    setIsAutoPlaying(false);
  };

  const handleImageClick = () => {
    setIsEnlarged(!isEnlarged);
  };

  useEffect(() => {
    const autoPlay = () => {
      if (isAutoPlaying) {
        setPrevIndex(currentIndex);
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
      }
    };
    const autoPlayTimer = setInterval(autoPlay, autoPlayInterval);
    return () => {
      clearInterval(autoPlayTimer);
    };
  }, [isAutoPlaying, currentIndex, images.length]);

  const handleIndicatorClick = (index) => {
    setPrevIndex(currentIndex);
    setCurrentIndex(index);
  };

  const slideAnimation = {
    hidden: { opacity: 0, x: currentIndex > prevIndex ? '50%' : '-50%' },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: currentIndex > prevIndex ? '-50%' : '50%' },
  };

  return (
    <>
      <motion.div className="relative h-80 max-w-full overflow-hidden" {...fadeAnimation}>
        <div className="w-full h-full max-w-full m-auto flex flex-col-reverse">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            className={`w-full h-full max-w-full object-contain absolute top-0 left-0 ${
              isEnlarged ? 'cursor-pointer' : ''
            }`}
            style={{ maxHeight: '500px', minHeight: '300px' }}
            alt={`Slider ${currentIndex}`}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={slideAnimation}
            transition={{ duration: 0.6 }}
            onMouseEnter={stopAutoPlay}
            onMouseLeave={handleAutoPlay}
            onClick={handleImageClick}
          />
          {isEnlarged && (
            <div
              className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-80"
              onClick={handleImageClick}
            >
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt={`Slider ${currentIndex}`}
                className="max-w-full max-h-full cursor-pointer"
              />
            </div>
          )}
          <div className="flex justify-center items-center z-10">
            {images.map((_, index) => (
              <span
                key={index}
                className={`inline-block w-4 h-4 rounded-full ${
                  currentIndex === index ? `bg-${color}` : 'bg-transparent'
                } border-2 border-${color} mx-1 cursor-pointer`}
                onClick={() => handleIndicatorClick(index)}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Slider;
