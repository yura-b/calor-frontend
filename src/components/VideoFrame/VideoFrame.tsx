import React from 'react';
import { useMediaQuery } from '@react-hook/media-query';

interface Props {
  src: string;
  title?: string;
  width?: string;
  className?: string;
}

const VideoFrame: React.FC<Props> = ({ src, title, width = '100%', className }) => {
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');
  const height = isLargeScreen ? '450' : '250';
  return (
    <iframe
      width={width}
      height={height}
      src={src}
      title={title}
      frameBorder="0"
      allowFullScreen
      className={`${className} w-full sm:max-w-[60vw] m-auto`}
    />
  );
};

export default VideoFrame;
