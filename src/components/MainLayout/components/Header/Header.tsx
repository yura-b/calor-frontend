import React, { useState, useEffect } from 'react';
import MainMenu from './components/MainMenu';
import MobileMenu from './components/MobileMenu';
import Busket from '@components/ui/Busket';
import logoText from '@assets/images/logoText.svg';
import logoImg from '@assets/images/LogoImg.svg';
import burgerIcon from '@assets/images/burgerIcon.svg';
import SearchInput from '@/components/ui/SearchInput';
import { Modal } from '@mui/material';
import Cart from '@components/Cart';
import { layoutFadeAnimation } from '@styles/Animations';
import { motion, useCycle } from 'framer-motion';
import userIcon from '@assets/images/userIcon.svg';

const Header: React.FC<{ headerHeight: number; updateHeaderHeight: () => void }> = ({
  headerHeight,
  updateHeaderHeight,
}): React.ReactElement => {
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
      <div className=" flex flex-col m-auto items-center justify-center lg:flex-row lg:justify-between lg:flex-wrap xl:w-[80vw] xl:max-w-[80vw] 2xl:flex-nowrap">
        <div className="flex flex-row items-center justify-between w-full fixed bg-custom-red z-20 top-0 px-6 py-2 lg:p-0 lg:static lg:flex-wrap ">
          <div className="flex items-center justify-center lg:flex lg:basis-full 2xl:basis-1/6">
            <img src={logoImg} alt="" className="w-7 h-7 mr-2 sm:w-7 sm:h-7 lg:w-11 lg:h-11" />
            <img src={logoText} alt="" className="hidden lg:block" />
          </div>
          <div className="hidden mx-4 lg:block">
            <MainMenu />
          </div>
          <div className="ml-auto mr-2 lg:ml-0 flex">
            <Busket count={2} onClick={openCart} />
            <img src={userIcon} className="hidden lg:block" />
          </div>
          <img src={burgerIcon} alt="Menu" onClick={() => toggleOpen()} className="block lg:hidden cursor-pointer" />
          <MobileMenu isOpen={isOpen} toggleOpen={toggleOpen} openCart={openCart} />
        </div>

        <div className="w-full flex flex-row justify-center mt-10 lg:mt-0 lg:basis-1/5 lg:grow">
          <div className="w-full">
            <SearchInput />
          </div>
        </div>
      </div>
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
