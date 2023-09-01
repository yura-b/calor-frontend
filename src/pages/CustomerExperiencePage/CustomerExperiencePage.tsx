import React from 'react';
import Head from '@/layouts/Head';
import { titles } from '@/translations/titles';
import VideoReviews from './components/VideoReviews';
import NavigationLinks from '@components/MainLayout/components/Header/components/NavigationLinks';
import MainLayout from '@/components/MainLayout';

const CustomerExperiencePage: React.FC = (): React.ReactElement => {
  return (
    <div className="font-poppins h-screen">
      <Head title={titles.customerExperiencePage} />
      <MainLayout>
        <div className=" hidden lg:block lg:my-4">
          <NavigationLinks color="gray" className=" w-auto" />
        </div>
        <VideoReviews />
      </MainLayout>
    </div>
  );
};

export default CustomerExperiencePage;
