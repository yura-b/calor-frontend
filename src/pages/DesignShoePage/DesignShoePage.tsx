import React from 'react';
import Head from '@/layouts/Head';
import { titles } from '@/translations/titles';

import MainLayout from '@/components/MainLayout';
import Constructor from '@/components/Constructor';

const DesignShoePage: React.FC = (): React.ReactElement => {
  return (
    <div className="font-poppins h-screen">
      <Head title={titles.designShoePage} />
      <MainLayout>
        <Constructor />
      </MainLayout>
    </div>
  );
};

export default DesignShoePage;
