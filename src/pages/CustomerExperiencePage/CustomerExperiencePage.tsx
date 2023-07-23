import React from 'react';
import Head from '@/layouts/Head';
import { titles } from '@/translations/titles';

import MainLayout from '@/components/MainLayout';

const CustomerExperiencePage: React.FC = (): React.ReactElement => {
  return (
    <div className="font-poppins h-screen">
      <Head title={titles.customerExperiencePage} />
      <MainLayout>
        <h1>Customer Experience Page</h1>
      </MainLayout>
    </div>
  );
};

export default CustomerExperiencePage;
