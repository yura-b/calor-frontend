import React, { useState, useEffect } from 'react';
import styles from '@styles/Styles.module.scss';
import { motion } from 'framer-motion';
import IconButton from '@mui/material/IconButton';
import rightArrowIcon from '@assets/images/rightArrowIcon.svg';
import { ReactSVG } from 'react-svg';
import { debounce } from 'lodash';

const Slider = ({ images }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const throttledHandleNext = debounce(() => {
    setCurrentIndex((prevIndex) => (prevIndex >= images.length * 3 - 1 ? 0 : prevIndex + 1));
  }, 200);

  const throttledHandlePrev = debounce(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  }, 200);

  const slideWidth = 200;
  const translateX = -currentIndex * slideWidth;

  const duplicatedImages = [...images, ...images, ...images, ...images];

  return (
    <div className={styles.container}>
      <div className="flex gap-10 overflow-hidden">
        <motion.div
          className="w-full flex-shrink-0 gap-10 "
          style={{
            display: 'flex',
            transform: `translateX(${translateX}px)`,
            transition: 'transform 0.5s ease',
            width: `${duplicatedImages.length * slideWidth}px`, // Set container width
          }}
        >
          {duplicatedImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index + 1}`}
              className="object-contain object-cover h-full mx-auto w-[160px] lg:w-[220px] xl:w-[240px]"
            />
          ))}
        </motion.div>
      </div>
      <div className="flex gap-8 items-center justify-center mt-4">
        <button onClick={throttledHandlePrev} className="rounded-full bg-gray p-1 hover:bg-mint">
          <IconButton>
            <ReactSVG
              className="rotate-180"
              src={rightArrowIcon}
              beforeInjection={(svg) => {
                svg.classList.add('icon');
                svg.setAttribute('stroke', '#E2E0E0');
              }}
            />
          </IconButton>
        </button>
        <button onClick={throttledHandleNext} className="rounded-full bg-gray p-1 hover:bg-mint">
          <IconButton>
            <ReactSVG
              src={rightArrowIcon}
              beforeInjection={(svg) => {
                svg.classList.add('icon');
                svg.setAttribute('stroke', '#E2E0E0');
              }}
            />
          </IconButton>
        </button>
      </div>
    </div>
  );
};

export default Slider;
