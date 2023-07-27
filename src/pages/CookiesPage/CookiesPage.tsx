import React from 'react';
import Head from '@/layouts/Head';
import { titles } from '@/translations/titles';

import MainLayout from '@/components/MainLayout';

const CookiesPage: React.FC = (): React.ReactElement => {
  return (
    <div className="font-poppins h-screen">
      <Head title={titles.cookiesPage} />
      <MainLayout>
        <h1>Cookies Page</h1>
      </MainLayout>
    </div>
  );
};

export default CookiesPage;
