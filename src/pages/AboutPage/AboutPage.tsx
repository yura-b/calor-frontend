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
import NavigationLinks from '@components/MainLayout/components/Header/components/NavigationLinks';
import { useQuery } from 'react-query';
import { getPageSection } from '@/api/manager/pages';

const AboutPage: React.FC = (): React.ReactElement => {
  const { data } = useQuery('getPageSection', () => getPageSection());
  const filteredPagesAbout = data?.data.filter((page) => page.page === 'About');
  const whoWeAre = filteredPagesAbout?.find((section) => section?.section === 'Who We Are');
  const ourStory = filteredPagesAbout?.find((section) => section?.section === 'Our Story');
  const ourManufacture = filteredPagesAbout?.find((section) => section?.section === 'Our Manufacture');

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
        <Slider />
        <div className=" lg:bg-custom-turquoise lg:min-h-max lg:py-12">
          <div
            className={`${
              window.innerWidth >= mobileBreakpoint ? styles.container : ''
            } lg:flex lg:justify-center  h-full`}
          >
            <WhoWeAre whoWeAre={whoWeAre} />
            <OurStory ourStory={ourStory} />
          </div>
        </div>
        <OurManufacture ourManufacture={ourManufacture} />
        {/* <Events />
        <InThePress /> */}
      </MainLayout>
    </div>
  );
};

export default AboutPage;
