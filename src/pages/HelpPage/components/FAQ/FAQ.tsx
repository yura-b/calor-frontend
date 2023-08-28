import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeAnimation } from '@styles/Animations';
import styles from '@styles/Styles.module.scss';
import AccordionSection from '@components/AccordionSection';

const FAQ: React.FC = () => {
  const mobileBreakpoint = 1024;

  const [section1Open, setIsSection1Open] = useState(false);
  const [section2Open, setIsSection2Open] = useState(false);
  const [section3Open, setIsSection3Open] = useState(false);
  const [section4Open, setIsSection4Open] = useState(false);

  const toggleSection1Open = () => {
    if (window.innerWidth < mobileBreakpoint) {
      setIsSection1Open((prev) => !prev);
    }
  };

  const toggleSection2Open = () => {
    if (window.innerWidth < mobileBreakpoint) {
      setIsSection2Open((prev) => !prev);
    }
  };

  const toggleSection3Open = () => {
    if (window.innerWidth < mobileBreakpoint) {
      setIsSection3Open((prev) => !prev);
    }
  };

  const toggleSection4Open = () => {
    if (window.innerWidth < mobileBreakpoint) {
      setIsSection4Open((prev) => !prev);
    }
  };
  return (
    <motion.div {...fadeAnimation} className={`${styles.container}`} id="sizeGuide">
      <div className="lg:flex flex-col items-center justify-between mb-2 lg:mb-6">
        <h1 className={`${styles.header1} text-center`}>FAQ</h1>

        <AccordionSection title="Section" isOpen={section1Open} toggleAccordion={toggleSection1Open}>
          <p className={`${styles.subtitle} pb-2`}>Question</p>
          <p>Answer Answer Answer Answer Answer Answer Answer Answer Answer Answer Answer</p>
        </AccordionSection>
        <AccordionSection title="Section" isOpen={section2Open} toggleAccordion={toggleSection2Open}>
          <p className={`${styles.subtitle} pb-2`}>Question</p>
          <p>Answer Answer Answer Answer Answer Answer Answer Answer Answer Answer Answer</p>
        </AccordionSection>
        <AccordionSection title="Section" isOpen={section3Open} toggleAccordion={toggleSection3Open}>
          <p className={`${styles.subtitle} pb-2`}>Question</p>
          <p>Answer Answer Answer Answer Answer Answer Answer Answer Answer Answer Answer</p>
        </AccordionSection>
        <AccordionSection title="Section" isOpen={section4Open} toggleAccordion={toggleSection4Open}>
          <p className={`${styles.subtitle} pb-2`}>Question</p>
          <p>Answer Answer Answer Answer Answer Answer Answer Answer Answer Answer Answer</p>
        </AccordionSection>
      </div>
    </motion.div>
  );
};

export default FAQ;
