import React, { useState, useEffect, useRef } from 'react';
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
import Modal from '@mui/material/Modal';
import X from '@assets/images/SignUpHeaderImg/X.png';
import ModalContent from '../ModalContent';
import VideoDigital from '@components/VideoDigital';

const Slider = ({ data, instagramStyles }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoSupported, setIsVideoSupported] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(0);

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

  const slideWidth = instagramStyles ? 300 : 200;
  const translateX = -currentIndex * slideWidth;

  const duplicatedImages = [...data || [], ...data || [], ...data || [], ...data || []];

  const openModal = (index) => {
    setClickedIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className="flex gap-10 overflow-hidden">
        <motion.div
          className="w-full flex-shrink-0 gap-4"
          style={{
            display: 'flex',
            transform: `translateX(${translateX}px)`,
            transition: 'transform 0.5s ease',
            width: `${duplicatedImages?.length * slideWidth}px`,
            height: instagramStyles ? '360px' : '420px',
          }}
        >
          {duplicatedImages?.map((image, index) =>
            image.media_type === 'IMAGE' || image.media_type === 'CAROUSEL_ALBUM' ? (
              <div className="relative cursor-pointer" key={index} onClick={() => openModal(index)}>
                <LazyLoadImage
                  src={image.media_url}
                  className={`object-cover mx-auto ${
                    instagramStyles ? 'max-h-[420px] max-w-[360px] w-[320px] h-[400px]' : ''
                  }`}
                  effect="blur"
                />
                {!imageLoaded ? <Spinner className="absolute left-1/2 top-1/2" /> : null}
                <img
                  src={image.media_url}
                  alt="Lazy-loaded image"
                  onLoad={() => setImageLoaded(true)}
                  className="hidden"
                />
              </div>
            ) : (
              <div className={'relative  text-gray cursor-pointer'} key={index} onClick={() => openModal(index)}>
                <div className="w-full object-contain  mx-auto relative">
                  <div className={'h-[50px] absolute top-[64px] right-[4%] z-20'}>
                    <YouTubeIcon style={{ fontSize: '48px', color: 'white' }} />
                  </div>
                  <VideoDigital
                    hideIcon={true}
                    hideControls={true}
                    srcMp4={image.media_url}
                    className="w-[300px] h-[300px] -mt-[60px]"
                  />
                </div>
              </div>
            )
          )}
        </motion.div>
        {instagramStyles && (
          <Modal open={isModalOpen} onClose={closeModal} style={{ background: 'rgba(0, 0, 0, 0.8)' }}>
            <div
              className="w-full flex flex-col items-center justify-center  w-[40vw] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              style={{ outline: 'none' }}
            >
              <div className="cursor-pointer w-auto p-2" onClick={closeModal}>
                <img src={X} alt="Close" className=" w-5 h-5 filter brightness-0 invert" />
              </div>

              <ModalContent data={duplicatedImages && duplicatedImages[clickedIndex]} isVideoSupported={isVideoSupported} />
            </div>
          </Modal>
        )}
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
