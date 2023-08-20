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
import { Link, useLocation } from 'react-router-dom';
import { paths } from '@/routes/paths';
import styles from '@/styles/Styles.module.scss';
import { useAppSelector } from '@/store/hooks/hooks.ts';
import { Role } from '@/constants/enums/role.enum.ts';
import { useNavigate } from 'react-router';

const Header: React.FC<{ headerHeight: number; updateHeaderHeight: () => void }> = ({
  updateHeaderHeight,
}): React.ReactElement => {
  const location = useLocation();
  const isHome = location.pathname === paths.home;
  const navigate = useNavigate();
  const signInHandler = () => {
    navigate('/login');
  };
  const signUpHandler = () => {
    navigate('/signup');
  };
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

  const { roles, access_token } = useAppSelector((state) => state.user);
  const isRegisteredUser = !!(roles?.includes(Role.USER) && access_token);

  return (
    <div
      className="w-full max-h-[140px] bg-custom-red pt-2 pb-1  lg:fixed lg:z-20 lg:top-0 relative lg:h-[108px] "
      id="header"
    >
      <div className={`${isSmallerThan1024px ? styles.container : ''} pt-2 pb-0`}>
        <div className={'px-6 flex flex-col  w-full fixed  z-20 top-0 bg-custom-red p-2 lg:p-1 lg:static'}>
          <div className="flex justify-between">
            <Link to={paths.home} className="flex items-center justify-center lg:flex flex-initial ">
              <img src={logoImg} alt="" className="w-7 h-7 mr-2 sm:w-7 sm:h-7 lg:w-10 lg:h-10" />
              <img src={logoText} alt="" className="hidden mb-2 lg:block" />
            </Link>
            <div className="hidden lg:block lg:flex lg:flex-row lg:gap-2 lg:items-center">
              <div className="mr-4">
                <SearchInput />
              </div>
              <div className="hidden lg:block">
                <Busket count={2} onClick={openCart} />
              </div>
              <div>
                {isRegisteredUser && <img src={userIcon} className="hidden lg:block " />}
                {!isRegisteredUser && (
                  <div className="text-white text-[14px]">
                    <button
                      className="px-2 py-1 focus:text-mint hover:drop-shadow-2md hover:font-bold"
                      onClick={signUpHandler}
                    >
                      Sign Up
                    </button>{' '}
                    <button
                      className="bg-gray px-2 py-1 focus:text-mint hover:drop-shadow-2md hover:font-bold"
                      onClick={signInHandler}
                    >
                      Sign In
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="flex lg:hidden items-baseline">
              <div className="lg:hidden mt-1">
                <Busket count={2} onClick={openCart} />
              </div>
              <img
                src={burgerIcon}
                alt="Menu"
                onClick={() => toggleOpen()}
                className="block lg:hidden cursor-pointer w-[30px]"
              />
            </div>
            <MobileMenu isOpen={isOpen} toggleOpen={toggleOpen} openCart={openCart} />
          </div>
          <div className={'hidden  lg:block '}>
            <MainMenu />
          </div>
        </div>

        <div className="mt-9 mb-3  sm:w-[320px] sm:mx-auto lg:hidden px-6">
          <SearchInput />
        </div>
      </div>
      {!isHome && <NavigationLinks color="white" className={'lg:hidden'} />}
      <Modal className="flex items-center justify-center h-auto" open={isCartOpen} onClose={closeCart}>
        <>
          {isCartOpen && (
            <motion.div
              className="absolute bg-white shadow-lg w-full lg:w-[760px] h-full  lg:max-h-[90%]  lg:rounded-md overflow-hidden "
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
