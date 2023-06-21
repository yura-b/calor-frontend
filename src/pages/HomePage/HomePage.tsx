import React from 'react';
import Head from '@/layouts/Head';

interface Props {
  props: any;
}

const HomePage: React.FC<Props> = (): React.ReactElement => {
  return <Head title="Home Page" />;
};

export default HomePage;
