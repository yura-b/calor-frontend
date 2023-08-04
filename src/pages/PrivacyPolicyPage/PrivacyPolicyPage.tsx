import React from 'react';
import Head from '@/layouts/Head';
import { titles } from '@/translations/titles';

import MainLayout from '@/components/MainLayout';

const PrivacyPolicyPage: React.FC = (): React.ReactElement => {
  return (
    <div className="font-poppins h-screen">
      <Head title={titles.privacyPolicyPage} />
      <MainLayout>
        <h1>Privacy Policy Page</h1>
      </MainLayout>
    </div>
  );
};

export default PrivacyPolicyPage;