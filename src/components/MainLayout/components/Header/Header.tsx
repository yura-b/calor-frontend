import React, { useState } from 'react';
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

const Header: React.FC = (): React.ReactElement => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOpen, toggleOpen] = useCycle(false, true);
  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <div className=" w-full h-auto bg-custom-red px-6 py-3">
      <div className=" flex flex-col m-auto items-center justify-center lg:flex-row lg:justify-between xl:w-[80vw] xl:max-w-[80vw] ">
        <div className="flex flex-row items-center justify-center w-full">
          <div className="flex w-7 lg:w-44">
            <img src={logoImg} alt="" className="w-7 h-7 sm:w-7 sm:h-7 lg:w-11 lg:h-11" />
            <img src={logoText} alt="" className="hidden lg:block" />
          </div>
          <div className="hidden lg:block">
            <MainMenu />
          </div>
          <Busket count={2} onClick={openCart} />
          <img src={burgerIcon} alt="Menu" onClick={() => toggleOpen()} className="block lg:hidden cursor-pointer" />
          <MobileMenu isOpen={isOpen} toggleOpen={toggleOpen} openCart={openCart} />
        </div>
        <div className="w-full flex flex-row justify-center mt-3 lg:mt-0 lg:basis-1/5">
          <div className="w-full">
            <SearchInput />
          </div>
        </div>
      </div>
      <Modal className="flex items-center justify-center" open={isCartOpen} onClose={closeCart}>
        <>
          {isCartOpen && (
            <motion.div
              className="bg-white shadow-lg w-full h-screen my-6 md:w-1/2 rounded-md"
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
