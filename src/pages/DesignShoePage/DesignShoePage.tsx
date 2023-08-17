import React from 'react';
import Head from '@/layouts/Head';
import { titles } from '@/translations/titles';

import MainLayout from '@/components/MainLayout';
import Constructor from '@/components/Constructor';
interface IProps {
  model: string;
}

const DesignShoePage: React.FC<IProps> = ({ model }): React.ReactElement => {
  return (
    <div className="font-poppins h-screen">
      <Head title={titles.designShoePage} />
      <MainLayout>
        <Constructor model={model} />
      </MainLayout>
    </div>
  );
};

export default DesignShoePage;
