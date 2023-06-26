import React from 'react';
import Head from '@layouts/Head';
import { titles } from '@/translations/titles';
import styles from './HomePage.module.scss';

const HomePage: React.FC = (): React.ReactElement => {
  return (
    <>
      <Head title={titles.homePage} />
    </>
  );
};

export default HomePage;
