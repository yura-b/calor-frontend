import React, { useState } from 'react';
import MainMenu from './components/MainMenu';
import Busket from '@components/ui/Busket';
import logoText from '@assets/images/logoText.svg';
import logoImg from '@assets/images/LogoImg.svg';
import burgerIcon from '@assets/images/burgerIcon.svg';
import SearchInput from '@/components/ui/SearchInput';
import { Modal } from '@mui/material';
import Cart from '@components/Cart';

const Header: React.FC = (): React.ReactElement => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };
  return (
    <div className="flex flex-col w-full h-auto bg-custom-red items-center justify-around lg:flex-row lg:h-20 px-6 py-3">
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex w-7 lg:w-44">
          <img src={logoImg} alt="" className="w-7 h-7 sm:w-7 sm:h-7 lg:w-11 lg:h-11" />
          <img src={logoText} alt="" className="hidden lg:block" />
        </div>
        <div className="hidden lg:block">
          <MainMenu />
        </div>
        {!isCartOpen && <Busket count={2} onClick={openCart} />}
        <div>
          <img src={burgerIcon} alt="" className="block lg:hidden" />
        </div>
      </div>
      <div className="w-full flex flex-row justify-center mt-3 lg:mt-0">
        <div className="w-full">
          <SearchInput />
        </div>
      </div>
      <Modal className="flex items-center justify-center" open={isCartOpen} onClose={closeCart}>
        <div className="bg-white shadow-lg w-full md:w-1/2 max-h-screen overflow-y-auto">
          <Cart title="Cart" onClose={closeCart} />
        </div>
      </Modal>
    </div>
  );
};

export default Header;
