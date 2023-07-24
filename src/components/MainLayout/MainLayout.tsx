import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { motion } from 'framer-motion';
import { layoutFadeAnimation } from '@styles/Animations';

const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <div>
    <Header />
    <motion.div {...layoutFadeAnimation}>{children}</motion.div>
    <Footer />
  </div>
);

export default MainLayout;
