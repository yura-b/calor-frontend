import React, { useEffect, useState, useRef } from 'react';
import { useMediaQuery } from '@react-hook/media-query';
import Spinner from '@components/ui/Spinner';

interface Props {
  src: string;
  title?: string;
  className: string;
  isVerticalVideo?: boolean;
  showDescription?: boolean;
}

const VideoFrame: React.FC<Props> = ({ src, title, className, isVerticalVideo, showDescription }) => {
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');
  const [iframeStyle, setIframeStyle] = useState({ width: '100%', height: 'auto' });
  const [iframeLoading, setIframeLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const calculateSize = () => {
      const aspectRatio = isVerticalVideo ? 16 / 9 : 9 / 16;
      const maxWidth = isLargeScreen ? '1024px' : '520px';

      const parentWidth = document.getElementById('frame-id')?.clientWidth || window.innerWidth;
      const width = Math.min(parseInt(maxWidth, 10), parentWidth);
      const height = (width * 16) / 9;

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

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && iframeRef.current && iframeRef.current.src !== src) {
          setIframeLoading(true);
          iframeRef.current.src = src;
          observer.unobserve(iframeRef.current);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (iframeRef.current) {
      observer.observe(iframeRef.current);
    }

    return () => {
      if (iframeRef.current) {
        observer.unobserve(iframeRef.current);
      }
    };
  }, [src]);

  return (
    <div id="frame-id" className={`${className} relative`}>
      {iframeLoading && <Spinner className="absolute top-1/2 left-1/2" />}
      <iframe
        ref={iframeRef}
        title={title}
        frameBorder="0"
        allowFullScreen={true}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        style={iframeStyle}
        onLoad={handleIframeLoad}
      />
      <div className="min-h-[30px]">
        {showDescription && !iframeLoading && <p className="font-bold pt-1">{title}</p>}
      </div>
    </div>
  );
};

export default VideoFrame;
