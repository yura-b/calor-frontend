import React from 'react';
import Head from '@/layouts/Head';
import { titles } from '@/translations/titles';
import HomeMainContent from './components/HomeMainContent';
import MainLayout from '@/components/MainLayout';
import HomeGoodsContent from './components/HomeGoodsContent';
import HomeShowRoom from './components/HomeShowRoom';
import HomeCalorByYou from './components/HomeCalorByYou';
import Purchase from './components/Purchase';
import CompleteLook from './components/CompleteLook';

const HomePage: React.FC = (): React.ReactElement => {
  return (
    <div className="font-poppins h-screen">
      <Head title={titles.homePage} />
      <MainLayout>
        <HomeMainContent />
        <HomeGoodsContent />
        <div className="w-full bg-custom-turquoise lg:hidden">
          <HomeShowRoom backgroundButton="gray" showRoomTitleColor="gray" titleColor="gray" bodyColor="gray" />
        </div>
        <CompleteLook />
        <HomeCalorByYou />
        <Purchase />
      </MainLayout>
    </div>
  );
};

export default HomePage;
