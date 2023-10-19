import React, { useState, useEffect, useCallback } from 'react';
import Modal from '@mui/material/Modal';
import X from '@assets/images/SignUpHeaderImg/X.png';
import Spinner from '@components/ui/Spinner';
import { motion } from 'framer-motion';
interface Props {
  color?: string;
  className?: string;
  src: string;
}

const VideoGuideLink: React.FC<Props> = ({ color, className, src }) => {
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
    <div>
      <motion.button
        onClick={openModal}
        whileHover={{ fontWeight: 'bold', scale: 1.02 }}
        className={`underline mx-auto text-${color}  p-2 ${className}`}
      >
        Video Guide
      </motion.button>
      <Modal
        open={isOpen}
        onClose={closeModal}
        aria-labelledby="video-modal"
        aria-describedby="video-description"
        className={isFullScreen ? 'w-screen h-screen' : isMobile ? 'w-[100vw]' : 'w-[100vw]'}
      >
        <div
          className={`absolute left-1/2 -translate-x-1/2 ${
            isFullScreen ? 'top-0' : 'top-[30%] lg:top-[20%]'
          } bg-lighterGray`}
        >
          <button onClick={closeModal} className="block ml-auto mr-2 p-2">
            <img src={X} alt="Close" className="cursor-pointer w-5 h-5" />
          </button>
          {isLoading && <Spinner className="absolute top-1/2 left-1/2" />}
          <iframe
            src={src}
            width={isFullScreen ? window.innerWidth : `${iframeWidth}px`}
            height={isFullScreen ? window.innerHeight : `${iframeHeight}px`}
            frameBorder="0"
            allowFullScreen
            onLoad={handleIframeLoad}
          />
        </div>
      </Modal>
    </div>
  );
};

export default VideoGuideLink;
