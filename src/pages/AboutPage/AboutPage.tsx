import React from 'react';
import Head from '@/layouts/Head';
import { titles } from '@/translations/titles';
import Slider from '@/components/ui/Slider';
import WhoWeAre from './components/WhoWeAre';
import OurStory from './components/OurStory';
import MainLayout from '@/components/MainLayout';
import OurManufacture from './components/OurManufacture';
import Events from './components/Events';
import InThePress from './components/InThePress';
import styles from '@styles/Styles.module.scss';
import NavigationLinks from '@components/MainLayout/components/Header/components/NavigationLinks';
import slider1 from '@assets/aboutImages/slider1.svg';
import calorByYou from '@assets/images/calorByYou.svg';
import calorByYouBig from '@assets/images/calorByYouBig.png';

const AboutPage: React.FC = (): React.ReactElement => {
  const mobileBreakpoint = 1024;
  return (
    <div className="font-poppins h-screen">
      <Head title={titles.about} />
      <MainLayout>
        <div className="relative hidden lg:block">
          <NavigationLinks
            color="white"
            className="absolute top-8  left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-auto"
          />
        </div>
        <Slider images={[slider1, calorByYou, calorByYouBig]}/>
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
