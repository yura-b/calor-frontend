import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { motion } from 'framer-motion';
import { layoutFadeAnimation } from '@styles/Animations';
import { useMediaQuery } from '@react-hook/media-query';
import CustomizedSnackbars from '../admin/CustomizedSnackbars';
import FacebookMessenger from '../FacebookMessenger/FacebookMessenger';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const isLargeScreen = useMediaQuery('(min-width: 1280px)');
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

  useEffect(() => {
    if (!sessionStorage.getItem('fb-messanger') || sessionStorage.getItem('fb-messanger') === 'false') {
      if (document.querySelectorAll('.fb_iframe_widget').length === 0) {
        sessionStorage.setItem('fb-messanger', 'true')
      }
    }

    const addFacebookMessangerToSession = () => {
      sessionStorage.setItem('fb-messanger', 'false');
    }

    window.addEventListener('beforeunload', addFacebookMessangerToSession);

    return () => {
      window.removeEventListener('beforeunload', addFacebookMessangerToSession);
    };
  }, []);

  return (
    <div className="overflow-x-hidden flex flex-col min-h-screen justify-between">
      <Header headerHeight={headerHeight} updateHeaderHeight={updateHeaderHeight} />
      <motion.div
        {...layoutFadeAnimation}
        id="content"
        style={{ paddingTop: isLargeScreen ? headerHeight : '0px' }}
        className="min-h-[50vh]"
      >
        {children}
      </motion.div>
      <CustomizedSnackbars />
      {
        sessionStorage.getItem('fb-messanger') !== 'true' ?
          <div className="fixed bottom-0 right-0 p-4">
            <FacebookMessenger />
          </div>
          : null
      }
      <Footer />
    </div>
  );
};

export default MainLayout;
