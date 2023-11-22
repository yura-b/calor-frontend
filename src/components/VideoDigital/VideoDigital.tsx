import React, { useEffect, useState, useRef } from 'react';
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
  poster?: string;
}

const VideoDigital: React.FC<Props> = ({ srcWebm, srcMp4, srcMov, className, showDescription, name, poster }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTogglePlay, setIsTogglePlay] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoSupported, setIsVideoSupported] = useState(true);
  const [isError, setIsError] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [posterUrl, setPosterUrl] = useState('');

  const setDynamicPoster = () => {
    const video = videoRef.current;

    if (video) {
      const middleTime = 2;
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

  return (
    <div className={`relative ${className}`}>
      {isLoading && isVideoSupported && !isError && !posterUrl && <Spinner className="absolute top-[40%] left-[46%]" />}
      {!isHovered && !isTogglePlay && !isLoading && isVideoSupported && !isError && (
        <div className={'h-[40px] absolute top-[40%] left-[42%]'}>
          <YouTubeIcon style={{ fontSize: '58px' }} color="error" />
        </div>
      )}

      {!isError ? (
        <div className="flex flex-col justify-between">
          <video
            ref={videoRef}
            className="w-full"
            preload="auto"
            // autoPlay
            // muted
            playsInline
            webkit-playsinline
            // src={srcWebm || srcMp4}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            controls={isHovered}
            onPlay={togglePlay}
            onLoadStart={() => setIsLoading(true)}
            onLoadedData={handleVideoLoad}
            onError={() => {
              setIsError(true);
            }}
            poster={posterUrl}
          >
            <source src={srcMp4} type="video/mp4" />
            {/* <source src={srcWebm} type="video/webm" />
            <source src={srcMov} type="video/mov" /> */}
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

export default VideoDigital;
