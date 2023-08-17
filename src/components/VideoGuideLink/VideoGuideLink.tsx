import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  color?: string;
  className?: string;
}
const VideoGuideLink: React.FC<Props> = ({ color, className }) => {
  return (
    <motion.a
      href="https://www.youtube.com/watch?v=KS3ajvRQkJ8&t=50s"
      className={`underline  mx-auto text-${color} pt-4 px-2 ${className}`}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ fontWeight: 'bold', scale: 1.1 }}
    >
      Video Guide
    </motion.a>
  );
};

export default VideoGuideLink;
