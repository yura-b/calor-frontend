import React, { useEffect, useState } from 'react';
import Head from '@/layouts/Head';
import { titles } from '@/translations/titles';
import HomeMainContent from './components/HomeMainContent';
import MainLayout from '@/components/MainLayout';
import HomeGoodsContent from './components/HomeGoodsContent';
import HomeShowRoom from './components/HomeShowRoom';
import HomeCalorByYou from './components/HomeCalorByYou';
import Purchase from './components/Purchase';
import CompleteLook from './components/CompleteLook';
import MyOrder from '@/components/MyOrder';

const HomePage: React.FC = (): React.ReactElement => {
  const [myOrderOpen, setMyOrderOpen] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get('my_orders') === 'true') {
      setMyOrderOpen(true);
    }
  }, []);

  const closeMyOrder = () => {
    setMyOrderOpen(false);
  };
  return (
    <div className="font-poppins h-screen">
      <Head title={titles.homePage} />
      <MainLayout>
        <HomeMainContent />
        <HomeGoodsContent />
        <div className="w-f`ull bg-custom-turquoise lg:hidden">
          <HomeShowRoom backgroundButton="gray" showRoomTitleColor="gray" titleColor="gray" bodyColor="gray" />
        </div>
        <CompleteLook />
        <HomeCalorByYou />
        <Purchase />
      </MainLayout>
      <MyOrder isOpen={myOrderOpen} onClose={closeMyOrder} />
    </div>
  );
};

export default HomePage;
