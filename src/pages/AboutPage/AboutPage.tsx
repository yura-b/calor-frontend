import React from 'react';
import Head from '@/layouts/Head';
import { titles } from '@/translations/titles';
import Slider from './components/Slider';
import WhoWeAre from './components/WhoWeAre';
import OurStory from './components/OurStory';
import MainLayout from '@/components/MainLayout';
import OurManufacture from './components/OurManufacture';
import Events from './components/Events';
import InThePress from './components/InThePress';
import styles from '@styles/Styles.module.scss';

const AboutPage: React.FC = (): React.ReactElement => {
  const mobileBreakpoint = 1024;
  return (
    <div className="font-poppins h-screen">
      <Head title={titles.about} />
      <MainLayout>
        <Slider />
        <div className=" lg:bg-custom-turquoise lg:min-h-max lg:py-12">
          <div
            className={`${
              window.innerWidth >= mobileBreakpoint ? styles.container : ''
            } lg:flex lg:justify-center  h-full`}
          >
            <WhoWeAre />
            <OurStory />
          </div>
        </div>
        <OurManufacture />
        <Events />
        <InThePress />
      </MainLayout>
    </div>
  );
};

export default AboutPage;
