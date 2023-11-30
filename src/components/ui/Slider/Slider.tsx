import { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeAnimation } from '@styles/Animations';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Spinner from '@components/ui/Spinner';

interface IProps {
  images: string[];
  color?: string;
  dataShoes?: boolean;
  currentIndex?: number;
  setCurrentIndex?: (index: number) => void;
}

const Slider: FC<IProps> = ({
  images = [],
  color,
  dataShoes,
  currentIndex: propCurrentIndex,
  setCurrentIndex: propSetCurrentIndex,
}) => {
  const [prevIndex, setPrevIndex] = useState(0);
  const autoPlayInterval = 5000;
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isEnlarged, setIsEnlarged] = useState(false);
  const currentIndex = propCurrentIndex || 0;
  const setCurrentIndex = propSetCurrentIndex || (() => {});

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
        const nextIndex = currentIndex === images?.length - 1 ? 0 : currentIndex + 1;
        setPrevIndex(currentIndex);
        setCurrentIndex(nextIndex);
      }
    };
    const autoPlayTimer = setInterval(autoPlay, autoPlayInterval);
    return () => {
      clearInterval(autoPlayTimer);
    };
  }, [isAutoPlaying, currentIndex, images?.length]);

  const handleIndicatorClick = (index) => {
    setPrevIndex(currentIndex);
    setCurrentIndex(index);
  };

  const slideAnimation = {
    hidden: { opacity: 0, x: currentIndex > prevIndex ? '50%' : '-50%' },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: currentIndex > prevIndex ? '-50%' : '50%' },
  };

  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <>
      <motion.div className="flex justify-center items-center m-auto flex-col w-full" {...fadeAnimation}>
        <div className="flex justify-center items-center m-auto flex-col w-full">
          <div className={'relative w-[100%]'}>
            <div
              className={`relative  w-full flex justify-center ${
                dataShoes
                  ? 'z-[-1] min-h-[300px] lg:min-h-[400px] items-center'
                  : 'min-h-[380px] xs:min-h-[500px] sm:min-h-[500px] lg:min-h-[400px] xl:min-h-[480px] 2xl:min-h-[500px]'
              }`}
            >
              <LazyLoadImage
                key={currentIndex}
                src={images[currentIndex]}
                className={`object-cover w-[380px] xs:w-[500px]  lg:w-[400px] xl:w-[480px] 2xl:w-[500px] min-h-[380px] h-[380px] xs:min-h-[500px] xs:h-[500px] lg:min-h-[400px] lg:h-[400px] xl:min-h-[480px] xl:h-[480px] 2xl:min-h-[500px] 2xl:h-[500px] ${
                  isEnlarged ? 'cursor-pointer' : ''
                } ${dataShoes ? '-mt-[60px] lg:-mt-[100px]' : ''}`}
                style={{ maxHeight: !dataShoes ? '500px' : '' }}
                alt={`Slider ${currentIndex}`}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={slideAnimation}
                transition={{ duration: 0.6 }}
                onMouseEnter={stopAutoPlay}
                onMouseLeave={handleAutoPlay}
                onClick={handleImageClick}
                effect="blur"
                afterLoad={() => {
                  setImageLoaded(true);
                }}
                beforeLoad={() => {
                  setImageLoaded(false);
                }}
              />
              {imageLoaded ? null : <Spinner className="absolute top-1/2 left-1/2" />}
            </div>
          </div>

          {isEnlarged && (
            <div
              className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-80"
              onClick={handleImageClick}
            >
              <div className="relative">
                <LazyLoadImage
                  key={currentIndex}
                  src={images[currentIndex]}
                  alt={`Slider ${currentIndex}`}
                  className="h-[100vh] object-contain cursor-pointer"
                  effect="blur"
                  afterLoad={() => {
                    setImageLoaded(true);
                  }}
                  beforeLoad={() => {
                    setImageLoaded(false);
                  }}
                />
                {imageLoaded ? null : <Spinner className="absolute top-1/2 left-1/2" />}
              </div>
            </div>
          )}
          <div
            className={`flex justify-center items-center z-10 mt-2 h-[20px] ${
              dataShoes ? '-mt-[14%] lg:-mt-[20%] xl:-mt-[14%]' : ''
            } `}
          >
            <div className={`${images.length > 1 ? 'block' : 'hidden'}`}>
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
        </div>
      </motion.div>
    </>
  );
};

export default Slider;
