import React from 'react';
import Head from '@/layouts/Head';
import { titles } from '@/translations/titles';
import Slider from './components/Slider';
import WhoWeAre from './components/WhoWeAre';
import OurStory from './components/OurStory';
import MainLayout from '@/components/MainLayout';
import OurManufacture from './components/OurManufacture';
import Events from './components/Events';
import InThePress from './components/InThePress';

const AboutPage: React.FC = (): React.ReactElement => {
  return (
    <div className="font-poppins h-screen">
      <Head title={titles.about} />
      <MainLayout>
        <Slider />
        <WhoWeAre />
        <OurStory />
        <OurManufacture />
        <Events />
        <InThePress />
      </MainLayout>
    </div>
  );
};

export default AboutPage;
