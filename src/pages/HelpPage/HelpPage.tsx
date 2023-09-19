import React from 'react';
import Head from '@/layouts/Head';
import { titles } from '@/translations/titles';
import VideoGuides from './components/VideoGuides';
import SizeGuide from './components/SizeGuide';
import FAQ from './components/FAQ';
import Shipping from './components/Shipping';
import ReturnsExchange from './components/ReturnsExchange';
import styles from '@styles/Styles.module.scss';
import MainLayout from '@/components/MainLayout';
import NavigationLinks from '@components/MainLayout/components/Header/components/NavigationLinks';

const HelpPage: React.FC = (): React.ReactElement => {
  const mobileBreakpoint = 1024;
  return (
    <div className="font-poppins h-screen">
      <Head title={titles.helpPage} />
      <MainLayout>
        <div className=" hidden lg:block lg:my-4">
          <NavigationLinks color="gray" className=" w-auto" />
        </div>
        {/* Waiting videos */}
        {/* <VideoGuides /> */}
        <div className={`${styles.container} w-full  lg:flex lg:items-start lg:justify-around gap-6`}>
          <div className="basis-[48%]">
            <SizeGuide />
            {window.innerWidth >= mobileBreakpoint && (
              <div className={'bg-mintExtraLight px-6'}>
                <div id="shipping">
                  <Shipping />
                </div>
                <div id="returns&Exchange">
                  <ReturnsExchange />
                </div>
              </div>
            )}
          </div>
          <div className="basis-[48%]">
            <FAQ />
          </div>
        </div>
        <div className="block lg:hidden bg-mintExtraLight">
          <div id="shipping">
            <Shipping />
          </div>
          <div id="returns&Exchange">
            <ReturnsExchange />
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default HelpPage;
