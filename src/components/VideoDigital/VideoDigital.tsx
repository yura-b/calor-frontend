import React, { useEffect, useState, useRef } from 'react';
import Spinner from '@components/ui/Spinner';
import YouTubeIcon from '@mui/icons-material/YouTube';
import styles from '@styles/Styles.module.scss';
import { useMediaQuery } from '@react-hook/media-query';

interface Props {
  srcMp4?: string;
  className?: string;
  showDescription?: boolean;
  name?: string;
  hideIcon?: boolean;
  hideControls?: boolean;
}

const VideoDigital: React.FC<Props> = ({ srcMp4, className, showDescription, name, hideIcon, hideControls }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTogglePlay, setIsTogglePlay] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoSupported, setIsVideoSupported] = useState(true);
  const [isError, setIsError] = useState(false);
  const isMobile = useMediaQuery('(max-width: 1023px)');

  const videoRef = useRef<HTMLVideoElement>(null);
  const [posterUrl, setPosterUrl] = useState('');

  const setDynamicPoster = () => {
    const video = videoRef.current;
    video?.load();
    if (video) {
      const middleTime = 0.01;
      video.currentTime = middleTime;

      video.addEventListener('seeked', () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');

        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL('image/jpeg');
          setPosterUrl(dataUrl);
        }
      });
    }
  };

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

  useEffect(() => {
    setDynamicPoster();
  }, [srcMp4]);

  const toggleVideoPlay = () => {
    const video = videoRef.current;

    if (video) {
      if (video.paused) {
        video.play();
        setIsTogglePlay(true);
        setIsHovered(true);
      } else {
        video.pause();
        setIsTogglePlay(false);
      }
    }
  };

  return (
    <div className={`relative ${className}`}>
      {isLoading && isVideoSupported && !isError && !posterUrl && (
        <Spinner className="absolute top-[40%] left-[46%] z-10" />
      )}
      {!isHovered && !isTogglePlay && !isLoading && isVideoSupported && !isError && !hideIcon && (
        <div className={'h-[50px] absolute top-[39%] left-[42%] z-30'} onClick={toggleVideoPlay}>
          <YouTubeIcon style={{ fontSize: '3rem' }} color="error" />
        </div>
      )}

      {!isError ? (
        <div className="flex flex-col justify-between z-20">
          <video
            ref={videoRef}
            loading="lazy"
            className="w-full"
            preload="auto"
            playsInline
            webkit-playsinline
            onMouseEnter={() => (!hideControls ? setIsHovered(true) : setIsHovered(false))}
            onMouseLeave={() => setIsHovered(false)}
            controls={isHovered}
            onPlay={togglePlay}
            onLoadStart={() => setIsLoading(true)}
            onLoadedData={handleVideoLoad}
            onError={() => {
              setIsError(true);
            }}
            poster={posterUrl}
            crossOrigin="anonymous"
          >
            <source src={srcMp4} type="video/mp4" />
          </video>
          {(!isLoading && isError) ||
            (!isLoading && !isVideoSupported && (
              <div className="absolute top-[50px] left-[2%] z-2 text-center">
                The video is not supported in your browser{' '}
              </div>
            ))}
          {showDescription && (
            <div>
              <p className={`${styles.body2} pt-2 mx-auto font-bold ${isMobile ? 'line-clamp-1' : 'truncate'}`}>
                {name}
              </p>
              {/* <p className={`${styles.subtitle} py-2`}>{video.date}</p> */}
            </div>
          )}{' '}
        </div>
      ) : null}
    </div>
  );
};

export default VideoDigital;
