import { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeAnimation } from '@styles/Animations';
import { useMediaQuery } from '@react-hook/media-query';

interface IProps {
  images: string[];
  color?: string;
}

const Slider: FC<IProps> = ({ images, color }) => {
  const isSmallerThan1600px = useMediaQuery('(max-width: 1600px)');

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

  return (
    <>
      <motion.div className="relative h-80 max-w-full overflow-hidden" {...fadeAnimation}>
        <div className="w-full h-full max-w-full m-auto flex flex-col-reverse">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            className="w-full h-full max-w-full object-contain absolute top-0 left-0"
            style={{ maxHeight: '500px', minHeight: '300px' }}
            alt={`Slider ${currentIndex}`}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.6 }}
            onMouseEnter={stopAutoPlay}
            onMouseLeave={handleAutoPlay}
          />
          <div className="flex justify-center items-center">
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