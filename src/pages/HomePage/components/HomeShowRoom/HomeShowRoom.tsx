import React, { useState, useEffect, useRef } from 'react';
import styles from '@styles/Styles.module.scss';
import Button from '@/components/ui/Button';
import { Modal } from '@mui/material';
import { useMediaQuery } from '@react-hook/media-query';
import closeBtnImage from '@/assets/cartImages/closeBtn.png';
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
  return (
    <div className={`${styles.container} w-full`}>
      <p className={`${styles.subtitle} text-${showRoomTitleColor} uppercase mb-1`}>Visit Our CALOR Showroom!</p>
      <h2 className={`${styles.header1} text-${titleColor}`}>{perfectFit?.title}</h2>
      <p className={`${styles.body1}  text-${bodyColor} text-justify mt-2`}>{perfectFit?.value}</p>
      <Button color={backgroundButton} className="w-full my-6" onClick={handleOpen}>
        Make an Appointment
      </Button>
      <Modal className="flex items-center justify-center" open={open} onClose={handleClose}>
        <div className="bg-white p-0 shadow-lg w-full md:w-[90%] xl:w-[80%] max-w-[1200px] relative lg:pb-8">
          <div className="py-3 flex items-center w-full  top-0 justify-end"></div>
          <div className="z-6 relative px-0 sm:p-0">
            <iframe
              ref={iframeRef}
              src="https://calendly.com/magic-0ba?background_color=b8e4d8&text_color=4e4e4d&primary_color=e22d21"
              frameBorder="0"
              style={{ width: '100%', height: '100%', minHeight: isMobile ? '92vh' : '88vh' }}
            ></iframe>
            <Button
              color="gray"
              className="flex w-[50px] items-center justify-center absolute bottom-[20px] z-10 lg:bottom-0 right-[20px] lg:right-[20px]"
              onClick={handleClose}
            >
              <img className="" src={closeBtnImage} />
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default HomeShowRoom;
