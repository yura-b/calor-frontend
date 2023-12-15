import React, { useEffect, useState } from 'react';
import Spinner from '@components/ui/Spinner';
import YouTubeIcon from '@mui/icons-material/YouTube';
import styles from '@styles/Styles.module.scss';

interface Props {
  srcWebm?: string;
  srcMp4?: string;
  srcMov?: string;
  title?: string;
  className?: string;
  showDescription?: boolean;
  name?: string;
}

const Video: React.FC<Props> = ({ srcWebm, srcMp4, srcMov, className, showDescription, name }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTogglePlay, setIsTogglePlay] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoSupported, setIsVideoSupported] = useState(true);
  const [isError, setIsError] = useState(false);

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

  return (
    <div className={`relative ${className}`}>
      {isLoading && isVideoSupported && !isError && <Spinner className="absolute top-[40%] left-[46%]" />}
      {!isHovered && !isTogglePlay && !isLoading && isVideoSupported && !isError && (
        <div className={'h-[40px] absolute top-[40%] left-[42%]'}>
          <YouTubeIcon style={{ fontSize: '58px' }} color="error" />
        </div>
      )}

      {!isError ? (
        <div className="flex flex-col justify-between">
          <video
            className="w-full"
            loading="lazy"
            preload="auto"
            playsInline
            webkit-playsinline
            // src={`https://drive.google.com/uc?id=${src}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            controls={isHovered}
            onPlay={togglePlay}
            onLoadStart={() => setIsLoading(true)}
            onLoadedData={handleVideoLoad}
            onError={() => {
              setIsError(true);
            }}
          >
            <source src={`https://drive.google.com/uc?id=${srcMp4}`} type="video/mp4" />
          </video>
          {showDescription && (
            <div className="">
              <p className={`${styles.subtitle} py-2 mx-auto`}>{name}</p>
              {/* <p className={`${styles.subtitle} py-2`}>{video.date}</p> */}
            </div>
          )}{' '}
        </div>
      ) : null}
    </div>
  );
};

export default Video;
