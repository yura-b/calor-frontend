import React, { useEffect, useState } from 'react';
import { useMediaQuery } from '@react-hook/media-query';

interface Props {
  src: string;
  title?: string;
  className?: string;
  srcMobile?: string;
}

const VideoFrameWithId: React.FC<Props> = ({ src, className, srcMobile }) => {
  const isMobile = useMediaQuery('(max-width: 767px)');
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

  return (
    <div id="frame-id" className={`${className} relative  mt-2 mb-8`}>
      {isMobile && srcMobile && !isWidthGreaterThanHeight && (
        <video className="w-full" controls>
          <source src={`https://drive.google.com/uc?id=${srcMobile}`} type="video/mp4" />
        </video>
      )}
      {(!isMobile || !srcMobile || isWidthGreaterThanHeight) && src && (
        <video className="w-full" controls>
          <source src={`https://drive.google.com/uc?id=${src}`} type="video/mp4" />
        </video>
      )}
    </div>
  );
};

export default VideoFrameWithId;
