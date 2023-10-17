import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeAnimation } from '@styles/Animations';
import styles from '@styles/Styles.module.scss';
import VideoFrame from '@components/VideoFrame';
import AccordionSection from '@components/AccordionSection';
import SizeTable from '../SizeTable';
import ShoeSizeTable from '../ShoeSizeTable';

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

  const dataWomen = [
    {
      column1: 'US Woman',
      column2: 'EU Woman',
      column3: 'UK woman',
      column4: 'Insole length, mm',
      column5: 'Insole length, inch',
      column6: 'C',
      column7: 'D',
      column8: 'E',
      column9: 'EE',
    },
    {
      column1: '6',
      column2: '36',
      column3: '4',
      column4: '238.65',
      column5: '9.4',
      column6: '3.3"/89',
      column7: '3.5"/89',
      column8: '3.7"/94',
      column9: '3.9"/99',
    },
    {
      column1: '7',
      column2: '37',
      column3: '5',
      column4: '245.32',
      column5: '9.66',
      column6: '3.4"/86',
      column7: '3.6"/91',
      column8: '3.8"/96',
      column9: '4"/10',
    },
    {
      column1: '8',
      column2: '38',
      column3: '6',
      column4: '251.99',
      column5: '9.92',
      column6: '3.5"/89',
      column7: '3.7"/94',
      column8: '3.9"/99',
      column9: '4.1"/10.4',
    },
    {
      column1: '9',
      column2: '39',
      column3: '7',
      column4: '258.66',
      column5: '10.18',
      column6: '3.6"/91',
      column7: '3.8"/96',
      column8: '4"/10',
      column9: '4.2"/10.6',
    },
    {
      column1: '10',
      column2: '40',
      column3: '8',
      column4: '265.33',
      column5: '10.45',
      column6: '3.7"/94',
      column7: '3.7"/99',
      column8: '4.1"/10.4',
      column9: '4.3"/11',
    },
    {
      column1: '11',
      column2: '41',
      column3: '9',
      column4: '272',
      column5: '10.7',
      column6: '3.8"/96',
      column7: '4"/10',
      column8: '4.2"/10.6',
      column9: '4.1"/11.2',
    },
    {
      column1: '12',
      column2: '42',
      column3: '10',
      column4: '278.67',
      column5: '10.97',
      column6: '3.9"/99',
      column7: '4.1"/10.4',
      column8: '4.3"/11',
      column9: '4.5"/11.4',
    },
    {
      column1: '13',
      column2: '43',
      column3: '11',
      column4: '285.34',
      column5: '11.23',
      column6: '4."/10',
      column7: '4.2"/10.6',
      column8: '4.4"/11.2',
      column9: '4.6"/11.7',
    },
    {
      column1: '14',
      column2: '44',
      column3: '12',
      column4: '292.01',
      column5: '11.5',
      column6: '4.1"/10.4',
      column7: '4.3"/11',
      column8: '4.5"/11.4',
      column9: '4.7"/12',
    },
    {
      column1: '15',
      column2: '45',
      column3: '13',
      column4: '298.68',
      column5: '11.76',
      column6: '4.2"/10.6',
      column7: '4.4"/11.2',
      column8: '4.6"/11.7',
      column9: '4.8"/12.2',
    },
    {
      column1: '16',
      column2: '46',
      column3: '14',
      column4: '305.35',
      column5: '12.02',
      column6: '4.3"/11',
      column7: '4.5"/11.4',
      column8: '4.7"/12',
      column9: '4.9"/12.5',
    },
    {
      column1: '17',
      column2: '47',
      column3: '15',
      column4: '312.02',
      column5: '12.28',
      column6: '4.4"/11.2',
      column7: '4.6"/11.7',
      column8: '4.8"/12.2',
      column9: '5"/12.7',
    },
  ];
  const dataMen = [
    {
      column1: 'US Men',
      column2: 'EU Men',
      column3: 'UK men',
      column4: 'Insole length, mm',
      column5: 'Insole length, inch',
      column6: 'C',
      column7: 'D',
      column8: 'E',
      column9: 'EE',
    },
    {
      column1: '5',
      column2: '36',
      column3: '4.5',
      column4: '238.65',
      column5: '9.4',
      column6: '3.3"/85',
      column7: '3.5"/89',
      column8: '3.7"/94',
      column9: '3.9"/99',
    },
    {
      column1: '6',
      column2: '37',
      column3: '5.5',
      column4: '245.32',
      column5: '9.66',
      column6: '3.4"/86',
      column7: '3.6"/91',
      column8: '3.8"/96',
      column9: '4"/10',
    },
    {
      column1: '7',
      column2: '38',
      column3: '6.5',
      column4: '251.99',
      column5: '9.92',
      column6: '3.5"/89',
      column7: '3.7"/94',
      column8: '3.9"/99',
      column9: '4.1"/10.4',
    },
    {
      column1: '8',
      column2: '39',
      column3: '7.5',
      column4: '258.66',
      column5: '10.18',
      column6: '3.6"/91',
      column7: '3.8"/96',
      column8: '4"/10',
      column9: '4.2"/10.6',
    },
    {
      column1: '9',
      column2: '40',
      column3: '8.5',
      column4: '265.33',
      column5: '10.45',
      column6: '3.7"/94',
      column7: '3.9"/99',
      column8: '4.1"/10.4',
      column9: '4.3"/11',
    },
    {
      column1: '10',
      column2: '41',
      column3: '9.5',
      column4: '272',
      column5: '10.7',
      column6: '3.8"/96',
      column7: '4"/10',
      column8: '4.2"/10.6',
      column9: '4.4"/11.2',
    },
    {
      column1: '11',
      column2: '42',
      column3: '10.5',
      column4: '278.67',
      column5: '10.97',
      column6: '3.9"/99',
      column7: '4.1"/10.4',
      column8: '4.3"/11',
      column9: '4.5"/11.4',
    },
    {
      column1: '12',
      column2: '43',
      column3: '11.5',
      column4: '285.34',
      column5: '11.23',
      column6: '4"/10',
      column7: '4.2"/10.6',
      column8: '4.4"/11.2',
      column9: '4.6"/11.7',
    },
    {
      column1: '13',
      column2: '44',
      column3: '12.5',
      column4: '292.01',
      column5: '11.5',
      column6: '4.1"/10.4',
      column7: '4.3"/11',
      column8: '4.5"/11.4',
      column9: '4.7"/12',
    },
    {
      column1: '14',
      column2: '45',
      column3: '13.5',
      column4: '298.68',
      column5: '11.76',
      column6: '4.2"/10.6',
      column7: '4.4"/11.2',
      column8: '4.6"/11.7',
      column9: '4.8"/12.2',
    },
    {
      column1: '15',
      column2: '46',
      column3: '14.5',
      column4: '305.35',
      column5: '12.02',
      column6: '4.3"/11',
      column7: '4.5"/11.4',
      column8: '4.7"/12',
      column9: '4.9"/12.5',
    },
    {
      column1: '16',
      column2: '47',
      column3: '15.5',
      column4: '312.02',
      column5: '12.28',
      column6: '4.4"/11.2',
      column7: '4.6"/11.7',
      column8: '4.8"/12.2',
      column9: '5"/12.7',
    },
  ];
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
            <VideoFrame
              src="https://drive.google.com/file/d/1ORbS4BvEb3GuPbkZKATVO5E2nx1damff/preview"
              title="Video Guide"
              className="xl:max-w-[50vw]"
            />
          </div>
          <div className="">
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
