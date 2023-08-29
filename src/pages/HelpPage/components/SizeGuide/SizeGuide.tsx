import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeAnimation } from '@styles/Animations';
import styles from '@styles/Styles.module.scss';
import VideoFrame from '@components/VideoFrame';
import AccordionSection from '@components/AccordionSection';
import SizeTable from '../SizeTable';

const SizeGuide: React.FC = () => {
  const mobileBreakpoint = 1024;

  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isTShirtAccordionOpen, setIsTShirtAccordionOpen] = useState(false);

  const toggleAccordion = () => {
    setIsAccordionOpen((prev) => !prev);
  };

  const toggleTShirtAccordion = () => {
    setIsTShirtAccordionOpen((prev) => !prev);
  };
  const data = [
    { column1: 'Shoe', column2: 'waiting for data', column3: 'waiting for data' },
    { column1: 'T-Shirt ', column2: 'waiting for data', column3: 'waiting for data' },
    { column1: 'Shoe', column2: 'waiting for data', column3: 'waiting for data' },
    { column1: 'T-Shirt ', column2: 'waiting for data', column3: 'waiting for data' },
  ];
  return (
    <motion.div
      {...fadeAnimation}
      className={`${window.innerWidth < mobileBreakpoint ? styles.container : ''}`}
      id="sizeGuide"
    >
      <div className="lg:flex flex-col items-center justify-between mb-2 lg:mb-6">
        <h1 className={`${styles.header1} text-center border-b border-gray w-full`}>Size Guide</h1>

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
          <SizeTable data={data} />
        </AccordionSection>

        <AccordionSection title="T-Shirt" isOpen={isTShirtAccordionOpen} toggleAccordion={toggleTShirtAccordion}>
          <SizeTable data={data} />
        </AccordionSection>
      </div>
    </motion.div>
  );
};

export default SizeGuide;
