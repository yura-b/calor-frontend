import React from 'react';
import Head from '@/layouts/Head';
import { titles } from '@/translations/titles';

import MainLayout from '@/components/MainLayout';

const TermsConditionPage: React.FC = (): React.ReactElement => {
  return (
    <div className="font-poppins h-screen">
      <Head title={titles.termsConditionPage} />
      <MainLayout>
        <h1>Terms Condition Page</h1>
      </MainLayout>
    </div>
  );
};

export default TermsConditionPage;
