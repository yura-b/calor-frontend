import React from 'react';
import Head from '@/layouts/Head';
import { titles } from '@/translations/titles';
// import VideoReviews from './components/VideoReviews';
import NavigationLinks from '@components/MainLayout/components/Header/components/NavigationLinks';
import MainLayout from '@/components/MainLayout';
import CustomerCreations from '@components/CustomerCreations';
import Inspiration from './components/Inspiration';
import OurShoesFor from './components/OurShoesFor';
import Reviews from './components/Reviews';

const CustomerExperiencePage: React.FC = (): React.ReactElement => {
  return (
    <div className="font-poppins h-screen">
      <Head title={titles.customerExperiencePage} />
      <MainLayout>
        <div className=" hidden lg:block lg:my-4">
          <NavigationLinks color="gray" className=" w-auto" />
        </div>
        {/* Waiting videos */}
        {/* <VideoReviews /> */}
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
