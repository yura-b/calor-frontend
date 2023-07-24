import React from 'react';
import Head from '@/layouts/Head';
import { titles } from '@/translations/titles';
import HomeMainContent from './components/HomeMainContent';
import MainLayout from '@/components/MainLayout';
import HomeGoodsContent from './components/HomeGoodsContent';
import HomeShowRoom from './components/HomeShowRoom';
import HomeCalorByYou from './components/HomeCalorByYou';
import Purchase from './components/Purchase';

const HomePage: React.FC = (): React.ReactElement => {
  return (
    <div className="font-poppins h-screen">
      <Head title={titles.homePage} />
      <MainLayout>
        <HomeMainContent />
        <HomeGoodsContent />
        <HomeShowRoom />
        <HomeCalorByYou />
        <Purchase />
      </MainLayout>
    </div>
  );
};

export default HomePage;
