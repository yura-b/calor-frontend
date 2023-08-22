import React from 'react';
import Head from '@/layouts/Head';
import { titles } from '@/translations/titles';

import MainLayout from '@/components/MainLayout';

const ReadyMadeProductsPage: React.FC = (): React.ReactElement => {
  return (
    <div className="font-poppins h-screen">
      <Head title={titles.readyMadeProductsPage} />
      <MainLayout>
        <h1>Ready Made Products Page</h1>
      </MainLayout>
    </div>
  );
};

export default ReadyMadeProductsPage;
