import React, { useState, useEffect } from 'react';
import MainMenu from './components/MainMenu';
import MobileMenu from './components/MobileMenu';
import Busket from '@components/ui/Busket';
import logoText from '@assets/images/logoText.svg';
import logoImg from '@assets/images/logoImg.svg';
import burgerIcon from '@assets/images/burgerIcon.svg';
import SearchInput from '@/components/ui/SearchInput';
import { Modal } from '@mui/material';
import Cart from '@components/Cart';
import { layoutFadeAnimation } from '@styles/Animations';
import { motion, useCycle } from 'framer-motion';
import userIcon from '@assets/images/userIcon.svg';
import { useMediaQuery } from '@react-hook/media-query';
import NavigationLinks from './components/NavigationLinks';
import { Link } from 'react-router-dom';
import { paths } from '@/routes/paths';

const Header: React.FC<{ headerHeight: number; updateHeaderHeight: () => void }> = ({
  updateHeaderHeight,
}): React.ReactElement => {
  const isSmallerThan1600px = useMediaQuery('(max-width: 1600px)');
  const isSmallerThan1024px = useMediaQuery('(min-width: 1024px)');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOpen, toggleOpen] = useCycle(false, true);
  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, [updateHeaderHeight]);

  return (
    <div className="w-full h-auto bg-custom-red px-6 py-3 lg:fixed lg:z-20 lg:top-0 relative" id="header">
      <div
        className={`flex flex-row m-auto items-center justify-center   xl:w-[90vw] xl:max-w-[90vw] ${
          isSmallerThan1600px && isSmallerThan1024px ? 'flex-wrap' : 'flex-nowrap'
        }`}
      >
        <div
          className={`flex flex-row items-center justify-between w-full fixed bg-custom-red z-20 top-0 px-6 py-2 lg:p-0 lg:static ${
            isSmallerThan1600px && isSmallerThan1024px ? 'flex-wrap justify-around' : 'flex-nowrap'
          }`}
        >
          <Link to={paths.home} className="flex items-center justify-center lg:flex flex-initial 2xl:basis-1/6">
            <img src={logoImg} alt="" className="w-7 h-7 mr-2 sm:w-7 sm:h-7 lg:w-11 lg:h-11" />
            <img src={logoText} alt="" className="hidden lg:block" />
          </Link>
          <div className={`hidden mx-4 lg:block mt-2 ${isSmallerThan1600px && isSmallerThan1024px ? 'mr-24' : ''}`}>
            <MainMenu />
          </div>
          <div
            className={`ml-auto mr-2 lg:ml-0 flex  ${
              isSmallerThan1600px && isSmallerThan1024px ? 'absolute right-6 top-6' : ''
            }`}
          >
            <Busket count={2} onClick={openCart} />
            <img src={userIcon} className="hidden lg:block" />
          </div>
          <img src={burgerIcon} alt="Menu" onClick={() => toggleOpen()} className="block lg:hidden cursor-pointer" />
          <MobileMenu isOpen={isOpen} toggleOpen={toggleOpen} openCart={openCart} />
        </div>

        <div className="w-full lg:w-auto flex flex-row justify-center mt-10 lg:mt-0 md:w-max">
          <SearchInput />
        </div>
      </div>
      <NavigationLinks />
      <Modal className="flex items-center justify-center h-auto" open={isCartOpen} onClose={closeCart}>
        <>
          {isCartOpen && (
            <motion.div
              className="absolute bg-white shadow-lg w-full lg:w-1/2 h-full  lg:h-4/5 max-h-full lg:rounded-md overflow-hidden "
              {...layoutFadeAnimation}
            >
              <Cart title="Cart" onClose={closeCart} />
            </motion.div>
          )}
        </>
      </Modal>
    </div>
  );
};

export default Header;
