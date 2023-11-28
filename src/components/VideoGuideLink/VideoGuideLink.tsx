import React, { useState, useEffect, useCallback } from 'react';
import Modal from '@mui/material/Modal';
import X from '@assets/images/SignUpHeaderImg/X.png';

import { motion } from 'framer-motion';
import videoIcon from '@assets/images/videoIcon.png';
import { useMediaQuery } from '@react-hook/media-query';
import VideoDigital from '@components/VideoDigital';

interface Props {
  color?: string;
  className?: string;
  srcMp4?: string;
  showVideoIcon?: boolean;
}

const VideoGuideLink: React.FC<Props> = ({ color, className, srcMp4, showVideoIcon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 1023px)');

  const [isWidthGreaterThanHeight, setIsWidthGreaterThanHeight] = useState(false);

  useEffect(() => {
    const checkWindowDimensions = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      if (screenWidth > screenHeight) {
        setIsWidthGreaterThanHeight(true);
      } else {
        setIsWidthGreaterThanHeight(false);
      }
    };

    checkWindowDimensions();
    window.addEventListener('resize', checkWindowDimensions);
    return () => {
      window.removeEventListener('resize', checkWindowDimensions);
    };
  }, []);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  return (
    <div className="cursor-pointer">
      <motion.div className="flex items-center" whileHover={{ fontWeight: 'bold', scale: 1.02 }}>
        <img src={videoIcon} alt="Video" className={`h-[20px] ${showVideoIcon ? 'block' : 'hidden'}`} />
        <motion.button onClick={openModal} className={`mx-auto text-${color}  pl-2 py-2 ${className}`}>
          Video Guide
        </motion.button>
      </motion.div>
      <Modal
        open={isOpen}
        onClose={closeModal}
        aria-labelledby="video-modal"
        aria-describedby="video-description"
        className={'w-screen h-screen relative'}
      >
        <div
          className={`absolute left-1/2 -translate-x-1/2  w-[100vw] xl:w-[50vw]
          ${
            isMobile
              ? `${isWidthGreaterThanHeight ? 'max-w-[90vw] md:max-w-[55vw] top-0' : 'top-[25%] max-w-[100vw]'}`
              : 'top-[10%] lg:top-[20%] md:max-w-[80vw] xl:max-w-[60vw]'
          }
           bg-lighterGray shadow-lg`}
          style={{ overflow: isOpen ? 'hidden' : 'auto' }}
        >
          <button onClick={closeModal} className="block ml-auto mr-2 p-2">
            <img src={X} alt="Close" className="cursor-pointer w-5 h-5" />
          </button>
          <VideoDigital srcMp4={srcMp4} className="w-full py-0" />
        </div>
      </Modal>
    </div>
  );
};

export default VideoGuideLink;
