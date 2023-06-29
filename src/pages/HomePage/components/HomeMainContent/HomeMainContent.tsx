import React from 'react';
import Semicircle from '@components/semicircle/Semicircle';

const HomeMainContent: React.FC = (): React.ReactElement => {
  return (
    <div className="w-full h-screen bg-custom-red">
      <Semicircle position={'-left-16 top-40'} />
      <div>
        <p className="text-5xl font-black text-white w-44">DESIGN YOUR OWN SHOE</p>
      </div>
    </div>
  );
};

export default HomeMainContent;
