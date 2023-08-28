import React from 'react';
import { motion } from 'framer-motion';
import { fadeAnimation } from '@styles/Animations';
import styles from '@styles/Styles.module.scss';
import VideoFrame from '@components/VideoFrame';

const VideoGuides: React.FC = () => {
  const videoGuides = [
    {
      src: 'https://drive.google.com/file/d/1l4VfItYOQO7xZxqJX93nmfNz2VT9ONXU/preview',
      title: 'Video Guide 1',
    },
    {
      src: 'https://drive.google.com/file/d/1l4VfItYOQO7xZxqJX93nmfNz2VT9ONXU/preview',
      title: 'Video Guide 2',
    },
    {
      src: 'https://drive.google.com/file/d/1l4VfItYOQO7xZxqJX93nmfNz2VT9ONXU/preview',
      title: 'Video Guide 3',
    },
  ];
  const mobileBreakpoint = 1024;
  return (
    <motion.div {...fadeAnimation} id="helpVideoGuides">
      <div
        className={`${
          window.innerWidth >= mobileBreakpoint ? styles.container : ''
        } lg:flex flex-col items-center  mb-2 lg:mb-6 lg:py-0`}
      >
        <h1 className={`${styles.header1} text-center pt-4 pb-2 lg:pt-0 `}>Video Guides</h1>
        <div className="text-center w-full">
          {videoGuides.map((video, i) => (
            <div className="py-2" key={i}>
              <VideoFrame src={video.src} title="Video Guide" className="xl:max-w-[50vw]" />
              <p className={`${styles.subtitle} py-2`}>{video.title}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default VideoGuides;
