import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeAnimation } from '@styles/Animations';
import styles from '@styles/Styles.module.scss';
import AccordionSection from '@components/AccordionSection';
import SizeTable from '../SizeTable';
import ShoeSizeTable from '../ShoeSizeTable';
import { dataWomen, dataMen } from '../../helpers/data';
import VideoDigital from '@components/VideoDigital';

const SizeGuide: React.FC = () => {
  const mobileBreakpoint = 1024;

  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isTShirtAccordionOpen, setIsTShirtAccordionOpen] = useState(false);
  const [isWomenAccordionOpen, setIsWomenAccordionOpen] = useState(false);
  const [isMenAccordionOpen, setIsMenAccordionOpen] = useState(false);

  const toggleAccordion = () => {
    setIsAccordionOpen((prev) => !prev);
  };

  const toggleTShirtAccordion = () => {
    setIsTShirtAccordionOpen((prev) => !prev);
  };

  const toggleWomenAccordion = () => {
    setIsWomenAccordionOpen((prev) => !prev);
  };
  const toggleMenAccordion = () => {
    setIsMenAccordionOpen((prev) => !prev);
  };

  const tShirtdata = [
    { column1: 'Size', column2: 'XS', column3: 'S', column4: 'M', column5: 'L', column6: 'XL', column7: 'XXL' },
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
      <div className="lg:flex flex-col items-center justify-between mb-2 lg:mb-6 max-w-[98vw] lg:max-w-[50vw]">
        <h1 className={`${styles.header1} text-center border-b border-gray w-full`}>Size Guide</h1>

        <AccordionSection title="Shoe" isOpen={isAccordionOpen} toggleAccordion={toggleAccordion}>
          <div className="my-4">
            <VideoDigital srcMp4={'https://calor.sfo2.cdn.digitaloceanspaces.com/videos/gid_3.mp4'} />
          </div>
          <div>
            <AccordionSection
              title="Women`s Shoe Size Chart"
              isOpen={isWomenAccordionOpen}
              toggleAccordion={toggleWomenAccordion}
              className="bg-lightGray px-2"
            >
              <ShoeSizeTable data={dataWomen} title={['Women`s Shoe Size Chart', 'Foot Width, inch/mm']} />
            </AccordionSection>
            <AccordionSection
              title="Men`s Shoe Size Chart"
              isOpen={isMenAccordionOpen}
              toggleAccordion={toggleMenAccordion}
              className="bg-lightGray px-2"
            >
              <ShoeSizeTable data={dataMen} title={['Men`s Shoe Size Chart', 'Foot Width, inch/mm']} />
            </AccordionSection>
          </div>
        </AccordionSection>

        <AccordionSection title="T-Shirt" isOpen={isTShirtAccordionOpen} toggleAccordion={toggleTShirtAccordion}>
          <SizeTable data={tShirtdata} />
        </AccordionSection>
      </div>
    </motion.div>
  );
};

export default SizeGuide;
