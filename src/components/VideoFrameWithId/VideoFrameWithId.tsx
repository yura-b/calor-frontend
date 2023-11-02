import React, { useEffect, useState } from 'react';
import { useMediaQuery } from '@react-hook/media-query';
import Spinner from '@components/ui/Spinner';
import YouTubeIcon from '@mui/icons-material/YouTube';
import VideoFrame from '@components/VideoFrame';
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
  const [isVideoSupported, setIsVideoSupported] = useState(true);
  const [isError, setIsError] = useState(false);

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
  const checkVideoSupport = () => {
    const videoElement = document.createElement('video');
    setIsVideoSupported(!!videoElement.canPlayType);
  };
  useEffect(() => {
    checkVideoSupport();
  }, []);
  console.log(isVideoSupported, 'isVideoSupported');

  return (
    <div
      className={`${className} relative mt-2 mb-8`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isMobile && srcMobile && !isWidthGreaterThanHeight && (
        <div className="relative">
          {isLoading && isVideoSupported && <Spinner className="absolute top-1/2 left-1/2" />}
          {isVideoSupported && !isError && (
            <video
              src={`https://drive.google.com/uc?id=${srcMobile}`}
              className="w-full h-auto"
              controls
              onLoadStart={() => setIsLoading(true)}
              onLoadedData={handleVideoLoad}
              onError={() => {
                setIsError(true);
                console.log('Mobile video error');
              }}
            />
          )}
          {!isVideoSupported ||
            (isError && (
              <VideoFrame
                src={`https://drive.google.com/file/d/${srcMobile}/preview`}
                title="Video Guide"
                className="xl:max-w-[50vw]"
                isVerticalVideo={true}
              />
            ))}
        </div>
      )}

      {(!isMobile || !srcMobile || isWidthGreaterThanHeight) && src && (
        <div className="relative">
          {isLoading && isVideoSupported && <Spinner className="absolute top-1/2 left-1/2" />}
          {!isHovered && !isTogglePlay && !isLoading && isVideoSupported && (
            <div className={'h-[40px] absolute top-[40%] left-[48%]'}>
              <YouTubeIcon style={{ fontSize: '58px' }} color="error" />
            </div>
          )}
          {isVideoSupported && !isError && (
            <video
              className="w-full"
              src={`https://drive.google.com/uc?id=${src}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              controls={isHovered}
              onPlay={togglePlay}
              onLoadStart={() => setIsLoading(true)}
              onLoadedData={handleVideoLoad}
              onError={() => {
                setIsError(true);
                console.log('Screen video error');
              }}
            />
          )}
          {!isVideoSupported ||
            (isError && (
              <VideoFrame
                src={`https://drive.google.com/file/d/${src}/preview`}
                title="Video Guide"
                className="xl:max-w-[50vw]"
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default VideoFrameWithId;
