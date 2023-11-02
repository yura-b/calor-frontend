import React, { useState, useEffect } from 'react';
import styles from '@styles/Styles.module.scss';
import { motion } from 'framer-motion';
import IconButton from '@mui/material/IconButton';
import rightArrowIcon from '@assets/images/rightArrowIcon.svg';
import { ReactSVG } from 'react-svg';
import { debounce } from 'lodash';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Spinner from '@components/ui/Spinner';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Slider = ({ data, instagramStyles }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [isVideoSupported, setIsVideoSupported] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  const checkVideoSupport = () => {
    const videoElement = document.createElement('video');
    setIsVideoSupported(!!videoElement.canPlayType);
  };
  useEffect(() => {
    checkVideoSupport();
  }, []);

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
    setCurrentIndex((prevIndex) => (prevIndex >= data.length * 3 - 1 ? 0 : prevIndex + 1));
  }, 100);

  const throttledHandlePrev = debounce(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? data.length - 1 : prevIndex - 1));
  }, 100);

  const slideWidth = instagramStyles ? 320 : 200;
  const translateX = -currentIndex * slideWidth;

  const duplicatedImages = [...data, ...data, ...data, ...data];

  return (
    <div className={styles.container}>
      <div className="flex gap-10 overflow-hidden">
        <motion.div
          className="w-full flex-shrink-0 gap-4"
          style={{
            display: 'flex',
            transform: `translateX(${translateX}px)`,
            transition: 'transform 0.5s ease',
            width: `${duplicatedImages.length * slideWidth}px`,
            height: instagramStyles ? '320px' : '420px',
          }}
        >
          {duplicatedImages.map((image, index) =>
            image.media_type === 'IMAGE' ? (
              <div className="relative" key={index}>
                <LazyLoadImage
                  src={image.media_url}
                  className={`object-contain object-cover  mx-auto h-full  ${instagramStyles ? 'max-w-[300px]' : ''}`}
                  effect="blur"
                  afterLoad={() => {
                    setImageLoaded(true);
                  }}
                  beforeLoad={() => {
                    setImageLoaded(false);
                  }}
                />
                {imageLoaded ? null : <Spinner className="absolute left-1/2 top-1/2" />}
              </div>
            ) : (
              <div className={'relative  text-gray '} key={index}>
                {isVideoLoading && isVideoSupported && <Spinner className="absolute top-1/2 left-1/2" />}
                {isVideoSupported && (
                  <>
                    <div className={'h-[40px] absolute top-[0%] right-[4%]'}>
                      <YouTubeIcon style={{ fontSize: '58px' }} color="error" />
                    </div>
                    <video
                      className=""
                      controls
                      onLoadStart={() => setIsVideoLoading(true)}
                      onLoadedData={() => setIsVideoLoading(false)}
                    >
                      <source src={image.media_url} className="w-full object-contain   mx-auto" type="video/mp4" />
                    </video>
                  </>
                )}
              </div>
            )
          )}
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
