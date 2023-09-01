import React from 'react';
import Head from '@/layouts/Head';
import { titles } from '@/translations/titles';

import MainLayout from '@/components/MainLayout';

const DesignBagPage: React.FC = (): React.ReactElement => {
  return (
    <div className="font-poppins h-screen">
      <Head title={titles.designBagPage} />
      <MainLayout>
        <h1>Design Bag Page</h1>
      </MainLayout>
    </div>
  );
};

export default DesignBagPage;
