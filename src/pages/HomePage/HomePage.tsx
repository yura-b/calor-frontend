import React from 'react';
import Head from '@/layouts/Head';
import { titles } from '@/translations/titles';
import HomeMainContent from './components/HomeMainContent';
import MainLayout from '@/components/MainLayout';

const HomePage: React.FC = (): React.ReactElement => {
  return (
    <div className="font-poppins">
      <Head title={titles.homePage} />
      <MainLayout>
        <HomeMainContent />
      </MainLayout>
    </div>
  );
};

export default HomePage;
