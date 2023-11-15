import React from 'react';
import Head from '@/layouts/Head';
import { titles } from '@/translations/titles';
import Slider from './components/Slider/Slider';
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
import calorByYouBig1 from '@assets/aboutImages/calorByYouBig1.png';
import calorByYou1 from '@assets/aboutImages/calorByYou1.png';
import calorByYouBig2 from '@assets/aboutImages/calorByYouBig2.png';
import calorByYou2 from '@assets/aboutImages/calorByYou2.png';
import calorByYouBig3 from '@assets/aboutImages/calorByYouBig3.png';
import calorByYou3 from '@assets/aboutImages/calorByYou3.png';
import aboutBigSircle from '@assets/aboutImages/aboutBigSircle.png';

const AboutPage: React.FC = (): React.ReactElement => {
  const { data } = useQuery('getPageSection', () => getPageSection());
  const filteredPagesAbout = data?.data.filter((page) => page.page === 'About');
  const whoWeAre = filteredPagesAbout?.find((section) => section?.section === 'Who We Are');
  const ourStory = filteredPagesAbout?.find((section) => section?.section === 'Our Story');
  const ourManufacture = filteredPagesAbout?.find((section) => section?.section === 'Our Manufacture');

  const mobileBreakpoint = 1024;
  const breakpoint640 = 640;
  let sliderItems;
  if (window.innerWidth > breakpoint640) {
    sliderItems = [
      {
        img: calorByYouBig1,
      },
      {
        img: calorByYouBig2,
      },
      {
        img: calorByYouBig3,
      },
    ];
  } else {
    sliderItems = [
      {
        img: calorByYou1,
      },
      {
        img: calorByYou2,
      },
      {
        img: calorByYou3,
      },
    ];
  }
  console.log(sliderItems);
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
        <div className="relative">
          <img
            src={aboutBigSircle}
            className="absolute hidden lg:block opacity-10 z-1 w-[600px] brightness-50 invert "
            style={{
              top: '44%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
          <div className=" lg:bg-custom-turquoise lg:min-h-max lg:py-0">
            <div className={`z-10 ${window.innerWidth >= mobileBreakpoint ? styles.container : ''}   h-full lg:pb-0`}>
              <WhoWeAre whoWeAre={whoWeAre} />
            </div>
          </div>
          <div className=" lg:bg-mintExtraLight lg:min-h-max lg:py-12 2xl:py-20">
            <div className={`${window.innerWidth >= mobileBreakpoint ? styles.container : ''}   h-full`}>
              <OurStory ourStory={ourStory} />
            </div>
          </div>
          <div>
            <OurManufacture ourManufacture={ourManufacture} />
          </div>
        </div>
        <Events />
        <InThePress />
      </MainLayout>
    </div>
  );
};

export default AboutPage;
