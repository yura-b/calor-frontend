import React, { useEffect, useState } from 'react';
import { useMediaQuery } from '@react-hook/media-query';
import Spinner from '@components/ui/Spinner';

interface Props {
  src: string;
  title?: string;
  className?: string;
}

const VideoFrame: React.FC<Props> = ({ src, title, className }) => {
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');
  const [iframeStyle, setIframeStyle] = useState({ width: '100%', height: 'auto' });
  const [iframeLoading, setIframeLoading] = useState(true);

  useEffect(() => {
    const calculateSize = () => {
      const aspectRatio = 9 / 16;
      const maxWidth = isLargeScreen ? '1024px' : '1024px';

      const parentWidth = document.getElementById('frame-id')?.clientWidth || window.innerWidth;
      const width = Math.min(parseInt(maxWidth, 10), parentWidth);
      const height = width * aspectRatio;

      setIframeStyle({ width: `${width}px`, height: `${height}px` });
    };

    calculateSize();

    window.addEventListener('resize', calculateSize);
    return () => {
      window.removeEventListener('resize', calculateSize);
    };
  }, [isLargeScreen, src]);
  const handleIframeLoad = () => {
    setIframeLoading(false);
  };
  return (
    <div id="frame-id" className={`${className} relative`}>
      {iframeLoading && <Spinner className="absolute top-1/2 left-1/2" />}
      <iframe src={src} title={title} frameBorder="0" allowFullScreen style={iframeStyle} onLoad={handleIframeLoad} />
    </div>
  );
};

export default VideoFrame;
