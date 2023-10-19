import React, { useState, useEffect, useRef } from 'react';
import styles from '@styles/Styles.module.scss';
import Button from '@/components/ui/Button';
import { Modal } from '@mui/material';
import { useMediaQuery } from '@react-hook/media-query';
import X from '@assets/images/SignUpHeaderImg/X.png';
import Loader from '@/components/ui/Loader/';
import { layoutFadeAnimation } from '@styles/Animations';
import { motion } from 'framer-motion';
interface Props {
  backgroundButton: 'gray' | 'turquoise';
  showRoomTitleColor?: string;
  titleColor?: string;
  bodyColor?: string;
  perfectFit?: {
    value: string;
    title: string;
  };
}

const HomeShowRoom: React.FC<Props> = ({
  backgroundButton,
  showRoomTitleColor,
  titleColor,
  bodyColor,
  perfectFit,
}): React.ReactElement => {
  const [open, setOpen] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  const isMobile = useMediaQuery('(max-width: 1023px)');

  const handleIframeLoad = () => {
    setIframeLoading(false);
  };

  return (
    <div className={`${styles.container} w-full`}>
      <p className={`${styles.subtitle} text-${showRoomTitleColor} uppercase mb-1`}>Visit Our CALOR Showroom!</p>
      <h2 className={`${styles.header1} text-${titleColor}`}>{perfectFit?.title}</h2>
      <p
        className={`${styles.body1}  text-${bodyColor} text-justify mt-2`}
        dangerouslySetInnerHTML={{ __html: perfectFit?.value || '' }}
      />
      <Button id="gtm-make-an-appointment" color={backgroundButton} className="w-full my-6" onClick={handleOpen}>
        Make an Appointment
      </Button>
      <Modal className="flex items-center justify-center" open={open} onClose={handleClose}>
        <motion.div
          className="bg-white p-0 shadow-lg w-full md:w-[80%] xl:w-[56%] max-w-[1200px] relative lg:pb-8 lg:rounded-lg"
          {...layoutFadeAnimation}
        >
          <img
            src={X}
            alt="Close"
            className="cursor-pointer w-5 h-5 ml-auto absolute right-4 top-3 z-10"
            onClick={handleClose}
          />
          <div className="z-6 relative px-0 sm:p-0 my-auto">
            {iframeLoading && <Loader />}
            <iframe
              ref={iframeRef}
              src="https://calendly.com/magic-0ba?background_color=b8e4d8&text_color=4e4e4d&primary_color=e22d21"
              frameBorder="0"
              style={{
                width: '100%',
                height: '100%',
                minHeight: isMobile ? '88vh' : '80vh',
                display: iframeLoading ? 'none' : 'block',
                marginTop: '44px',
              }}
              onLoad={handleIframeLoad}
            ></iframe>
          </div>
        </motion.div>
      </Modal>
    </div>
  );
};

export default HomeShowRoom;
