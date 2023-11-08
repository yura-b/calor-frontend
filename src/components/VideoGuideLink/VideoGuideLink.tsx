import React, { useState, useEffect, useCallback } from 'react';
import Modal from '@mui/material/Modal';
import X from '@assets/images/SignUpHeaderImg/X.png';

import { motion } from 'framer-motion';
import videoIcon from '@assets/images/videoIcon.png';
import Video from '@components/Video';
interface Props {
  color?: string;
  className?: string;
  src: string;
  showVideoIcon?: boolean;
}

const VideoGuideLink: React.FC<Props> = ({ color, className, src, showVideoIcon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = window.innerWidth < 1024;

  const isHorizontalOrientation = () => {
    return window.innerWidth > window.innerHeight;
  };

  const isFullScreen = isMobile && isHorizontalOrientation();
  const aspectRatio = 16 / 9;
  const initialIframeWidth = isMobile ? Math.min(window.innerWidth, 800) : Math.min(window.innerWidth * 0.8, 800);
  const initialIframeHeight = initialIframeWidth / aspectRatio;

  const openModal = () => {
    setIsOpen(true);
    setIsLoading(true);
  };

  const closeModal = () => setIsOpen(false);

  const handleResize = useCallback(() => {
    const availableWidth = isMobile ? window.innerWidth : window.innerWidth * 0.8;
    const newWidth = Math.min(availableWidth, 800);
    const newHeight = newWidth / aspectRatio;
    setIframeWidth(newWidth);
    setIframeHeight(newHeight);
  }, [isMobile]);

  const [iframeWidth, setIframeWidth] = useState(initialIframeWidth);
  const [iframeHeight, setIframeHeight] = useState(initialIframeHeight);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

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
        className={isFullScreen ? 'w-screen h-screen' : isMobile ? 'w-[100vw]' : 'w-[100vw]'}
      >
        <div
          className={`absolute left-1/2 -translate-x-1/2 w-[100vw] lg:w-[50vw]  ${
            isFullScreen ? 'top-0 max-w-[60vw] ' : 'top-[30%] lg:top-[20%] '
          } bg-lighterGray shadow-lg`}
        >
          <button onClick={closeModal} className="block ml-auto mr-2 p-2">
            <img src={X} alt="Close" className="cursor-pointer w-5 h-5" />
          </button>

          <Video src={src} className="w-full py-0" />
        </div>
      </Modal>
    </div>
  );
};

export default VideoGuideLink;
