import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { motion } from 'framer-motion';
import { layoutFadeAnimation } from '@styles/Animations';
import { useMediaQuery } from '@react-hook/media-query';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');
  const [headerHeight, setHeaderHeight] = useState(0);

  const updateHeaderHeight = () => {
    const headerElement = document.getElementById('header');
    if (headerElement) {
      setHeaderHeight(headerElement.offsetHeight);
    }
  };

  useEffect(() => {
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, []);
  return (
    <div className="overflow-x-hidden">
      <Header headerHeight={headerHeight} updateHeaderHeight={updateHeaderHeight} />
      <motion.div {...layoutFadeAnimation} style={{ paddingTop: isLargeScreen ? headerHeight : '0px' }}>
        {children}
      </motion.div>
      <Footer />
    </div>
  );
};

export default MainLayout;
