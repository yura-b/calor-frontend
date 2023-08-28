import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeAnimation } from '@styles/Animations';
import styles from '@styles/Styles.module.scss';
import shoeModel1 from '@assets/cartImages/shoeModel1.svg';
import VideoFrame from '@components/VideoFrame';
import AccordionSection from '@components/AccordionSection';

const SizeGuide: React.FC = () => {
  const mobileBreakpoint = 1024;

  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isTShirtAccordionOpen, setIsTShirtAccordionOpen] = useState(false);

  const toggleAccordion = () => {
    if (window.innerWidth < mobileBreakpoint) {
      setIsAccordionOpen((prev) => !prev);
    }
  };

  const toggleTShirtAccordion = () => {
    if (window.innerWidth < mobileBreakpoint) {
      setIsTShirtAccordionOpen((prev) => !prev);
    }
  };

  return (
    <motion.div {...fadeAnimation} className={`${styles.container}`} id="sizeGuide">
      <div className="lg:flex flex-col items-center justify-between mb-2 lg:mb-6">
        <h1 className={`${styles.header1} text-center`}>Size Guide</h1>

        <AccordionSection title="Shoe" isOpen={isAccordionOpen} toggleAccordion={toggleAccordion}>
          <VideoFrame
            src="https://drive.google.com/file/d/1l4VfItYOQO7xZxqJX93nmfNz2VT9ONXU/preview"
            title="Video Guide"
            className="xl:max-w-[50vw]"
          />
          <div className="py-8">
            <p className={`${styles.subtitle}`}>Title</p>
            <p>
              Description Description Description Description Description Description Description Description
              Description Description Description Description
            </p>
          </div>
          <img
            src={shoeModel1}
            className="object-contain object-cover w-[240px] sm:w-[260px] h-auto mx-auto lg:w-[180px]"
          />
        </AccordionSection>

        <AccordionSection title="T-Shirt" isOpen={isTShirtAccordionOpen} toggleAccordion={toggleTShirtAccordion}>
          <img
            src={shoeModel1}
            className="object-contain object-cover w-[240px] sm:w-[260px] h-auto mx-auto lg:w-[180px]"
          />
        </AccordionSection>
      </div>
    </motion.div>
  );
};

export default SizeGuide;
