import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeAnimation } from '@styles/Animations';
import styles from '@styles/Styles.module.scss';
// import VideoFrame from '@components/VideoFrame';
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
  const tShirtdata = [
    { column1: 'Size', column2: 'XS', column3: 'S', column4: 'M', column5: 'L', column6: 'XL', column7: '2XL' },
    { column1: 'Shoulders ', column2: '44', column3: '47', column4: '50', column5: '53', column6: '56', column7: '59' },
    { column1: 'Bust ', column2: '94', column3: '100', column4: '106', column5: '112', column6: '118', column7: '124' },
    { column1: 'Length ', column2: '65', column3: '68', column4: '71', column5: '74', column6: '77', column7: '80' },
    {
      column1: 'Sleeve Length ',
      column2: '19',
      column3: '20',
      column4: '21',
      column5: '22',
      column6: '23',
      column7: '24',
    },
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
          {/* Waiting videos */}
          {/* <VideoFrame
            src="https://drive.google.com/file/d/1l4VfItYOQO7xZxqJX93nmfNz2VT9ONXU/preview"
            title="Video Guide"
            className="xl:max-w-[50vw]"
          /> */}
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
          <SizeTable data={tShirtdata} />
        </AccordionSection>
      </div>
    </motion.div>
  );
};

export default SizeGuide;
