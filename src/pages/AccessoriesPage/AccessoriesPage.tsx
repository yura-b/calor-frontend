import React from 'react';
import Head from '@/layouts/Head';
import { titles } from '@/translations/titles';

import MainLayout from '@/components/MainLayout';

const AccessoriesPage: React.FC = (): React.ReactElement => {
  return (
    <div className="font-poppins h-screen">
      <Head title={titles.accessories} />
      <MainLayout>
        <h1>Accessories Page</h1>
      </MainLayout>
    </div>
  );
};

export default AccessoriesPage;
