import React from 'react';
import Head from '@/layouts/Head';
import { titles } from '@/translations/titles';
import VideoGuides from './components/VideoGuides';
import SizeGuide from './components/SizeGuide';
import FAQ from './components/FAQ';
import Shipping from './components/Shipping';
import ReturnsExchange from './components/ReturnsExchange';

import MainLayout from '@/components/MainLayout';
import NavigationLinks from '@components/MainLayout/components/Header/components/NavigationLinks';

const HelpPage: React.FC = (): React.ReactElement => {
  return (
    <div className="font-poppins h-screen">
      <Head title={titles.helpPage} />
      <MainLayout>
        <div className=" hidden lg:block lg:my-4">
          <NavigationLinks color="gray" className=" w-auto" />
        </div>
        <VideoGuides />
        <SizeGuide />
        <FAQ />
        <Shipping />
        <ReturnsExchange />
      </MainLayout>
    </div>
  );
};

export default HelpPage;
