import React, { useEffect, useState } from 'react';
import { useMediaQuery } from '@react-hook/media-query';
import Spinner from '@components/ui/Spinner';
import YouTubeIcon from '@mui/icons-material/YouTube';
interface Props {
  src: string;
  title?: string;
  className?: string;
  srcMobile?: string;
}

const VideoFrameWithId: React.FC<Props> = ({ src, className, srcMobile }) => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [isWidthGreaterThanHeight, setIsWidthGreaterThanHeight] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTogglePlay, setIsTogglePlay] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  const togglePlay = () => {
    setIsTogglePlay(true);
  };

  const handleVideoLoad = () => {
    setIsLoading(false);
  };
  return (
    <div
      className={`${className} relative mt-2 mb-8`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isMobile && srcMobile && !isWidthGreaterThanHeight && (
        <div className="relative">
          {isLoading && <Spinner className="absolute top-1/2 left-1/2" />}
          <video
            src={`https://drive.google.com/uc?id=${srcMobile}`}
            className="w-full h-auto"
            controls
            onLoadStart={() => setIsLoading(true)}
            onLoadedData={handleVideoLoad}
          />
        </div>
      )}

      {(!isMobile || !srcMobile || isWidthGreaterThanHeight) && src && (
        <div className="relative">
          {isLoading && <Spinner className="absolute top-1/2 left-1/2" />}
          {!isHovered && !isTogglePlay && !isLoading && (
            <div className={'h-[40px] absolute top-[40%] left-[48%]'}>
              <YouTubeIcon style={{ fontSize: '58px' }} color="error" />
            </div>
          )}
          <video
            className="w-full"
            src={`https://drive.google.com/uc?id=${src}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            controls={isHovered}
            onPlay={togglePlay}
            onLoadStart={() => setIsLoading(true)}
            onLoadedData={handleVideoLoad}
          />
        </div>
      )}
    </div>
  );
};

export default VideoFrameWithId;
