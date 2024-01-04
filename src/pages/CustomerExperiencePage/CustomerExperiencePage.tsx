import React from 'react';
import Head from '@/layouts/Head';
import { titles } from '@/translations/titles';
import NavigationLinks from '@components/MainLayout/components/Header/components/NavigationLinks';
import MainLayout from '@/components/MainLayout';
import CustomerCreations from '@components/CustomerCreations';
import Inspiration from './components/Inspiration';
import OurShoesFor from './components/OurShoesFor';
import Reviews from './components/Reviews';
import VideoReviewsSlider from './components/VideoReviewsSlider';

const CustomerExperiencePage: React.FC = (): React.ReactElement => {
  return (
    <div className="font-poppins h-screen">
      <Head title={titles.customerExperiencePage} />
      <MainLayout>
        <div className=" hidden lg:block lg:mt-4 lg:mb-2">
          <NavigationLinks color="gray" className=" w-auto" />
        </div>
        <VideoReviewsSlider />
        <div className="bg-mintExtraLight">
          <CustomerCreations />
        </div>
        <Inspiration />
        <OurShoesFor />
        <Reviews />
      </MainLayout>
    </div>
  );
};

export default CustomerExperiencePage;
