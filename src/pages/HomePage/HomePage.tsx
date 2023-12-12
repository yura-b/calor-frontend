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
import { useQuery } from 'react-query';
import { getPageSection } from '@/api/manager/pages';
import VideoReviews from '@/pages/CustomerExperiencePage/components/VideoReviews';

const HomePage: React.FC = (): React.ReactElement => {
  const { data } = useQuery('getPageSection', () => getPageSection(), {
    staleTime: Infinity,
  });

  const filteredPagesHome = data?.data.filter((page) => page.page === 'Home Page');
  const benefits = filteredPagesHome?.filter((section) => section?.section === 'Benefits');
  const visions = filteredPagesHome?.filter((section) => section?.section === 'Your Vision, Our Craftsmanship')[0]
    .value;
  const perfectFit = filteredPagesHome?.filter((section) => section?.section === 'Perfect Fit')[0];

  return (
    <div className="font-poppins h-screen">
      <Head title={titles.homePage} />
      <MainLayout>
        <HomeMainContent visions={visions} />
        <div className="lg:pt-8">
          <VideoReviews column={1} xsColumn={2} mdColumn={3} lgColumn={5} xlColumn={5} />
        </div>
        <HomeGoodsContent />
        <div className="w-full bg-custom-turquoise lg:hidden">
          <HomeShowRoom
            backgroundButton="gray"
            showRoomTitleColor="gray"
            titleColor="gray"
            bodyColor="gray"
            perfectFit={perfectFit}
          />
        </div>
        <CompleteLook />
        <HomeCalorByYou benefits={benefits} perfectFit={perfectFit} />
        <Purchase />
      </MainLayout>
    </div>
  );
};

export default HomePage;
