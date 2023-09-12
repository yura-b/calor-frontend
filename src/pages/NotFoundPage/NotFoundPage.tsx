import React from 'react';
import Head from '@/layouts/Head';
import { titles } from '@/translations/titles';

import MainLayout from '@/components/MainLayout';

const NotFoundPage: React.FC = (): React.ReactElement => {
  return (
    <div className="font-poppins h-screen">
      <Head title={titles.notFound} />
      <MainLayout>
        <h1 className="flex justify-center items-center min-h-[50vh]  text-gray lg:text-[60px] font-bold sm:text-[50px] text-[40px] uppercase xl:mt-8">
          404 - Not Found
        </h1>
      </MainLayout>
    </div>
  );
};

export default NotFoundPage;
