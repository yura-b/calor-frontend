import React, { useState, useEffect, useLayoutEffect } from 'react';
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
import NavigationLinks from './components/NavigationLinks';
import { Link, useLocation } from 'react-router-dom';
import { paths } from '@/routes/paths';
import styles from '@/styles/Styles.module.scss';
import { useAppSelector, useAppDispatch } from '@/store/hooks/hooks.ts';
import { Role } from '@/constants/enums/role.enum.ts';
import { useNavigate } from 'react-router';
import AccountMenuLinks from '@pages/AccountPage/components/AccountMenuLinks';
import { cleanUserData } from '@/store/reducers/UserReducer.ts';

const Header: React.FC<{ headerHeight: number; updateHeaderHeight: () => void }> = ({
  updateHeaderHeight,
}): React.ReactElement => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isHome = location.pathname === paths.home;
  const navigate = useNavigate();
  const signInHandler = () => {
    dispatch(cleanUserData());
    navigate('/login');
  };
  const signUpHandler = () => {
    navigate('/signup');
  };

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

  const [isAccountVisible, setIsAccountVisible] = useState(false);

  const { roles, access_token, firstName, secondName } = useAppSelector((state) => state.user);
  const isRegisteredUser = !!(roles?.includes(Role.USER) && access_token);


  return (
    <div
      className="w-full max-h-[140px] bg-custom-red pt-2 pb-1  xl:fixed xl:z-20 xl:top-0 relative xl:h-[108px] "
      id="header"
    >
      <div className={`${styles.container} max-w-[100vw]  xl:max-w-[70vw] pt-2 pb-0`}>
        <div
          className={
            'flex flex-col w-full  fixed  z-20 top-0 bg-custom-red py-2 md:px-20 lg:px-[7.5rem] sm:px-[3rem] px-6 xl:px-0 xl:p-1 xl:static'
          }
        >
          <div className="flex justify-between">
            <Link to={paths.home} className="flex items-center justify-center xl:flex flex-initial ">
              <img src={logoImg} alt="" className="w-7 h-7 mr-2 sm:w-7 sm:h-7 xl:w-10 xl:h-10" />
              <img src={logoText} alt="" className="hidden mb-2 sm:block sm:w-[100px] xl:w-[130px]" />
            </Link>
            <div className="hidden xl:block xl:flex xl:flex-row xl:gap-2 xl:items-center">
              <div className="mr-4">
                <SearchInput />
              </div>
              <div className="hidden xl:block">
                <Busket count={2} onClick={openCart} />
              </div>
              <div>
                {isRegisteredUser && (
                  <>
                    <img
                      src={userIcon}
                      className="hidden xl:block cursor-pointer"
                      onClick={() => setIsAccountVisible(!isAccountVisible)}
                    />
                    {isAccountVisible && (
                      <motion.div
                        className="absolute bg-custom-turquoise px-4 z-20 mt-3 right-[12%] shadow-2xl"
                        {...layoutFadeAnimation}
                      >
                        <div
                          className="absolute -top-[16px] right-11 w-0 h-0 -rotate-90 hidden xl:block"
                          style={{
                            borderWidth: '8px',
                            borderStyle: 'solid',
                            borderColor: 'transparent transparent transparent rgb(184, 228, 216, 0.9)',
                          }}
                        />
                        <AccountMenuLinks firstName={firstName} secondName={secondName} />
                      </motion.div>
                    )}
                  </>
                )}
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
            <div className="flex xl:hidden items-baseline">
              <div className="xl:hidden mt-1">
                <Busket count={2} onClick={openCart} />
              </div>
              <img
                src={burgerIcon}
                alt="Menu"
                onClick={() => toggleOpen()}
                className="block xl:hidden cursor-pointer w-[30px]"
              />
            </div>
            <MobileMenu isOpen={isOpen} toggleOpen={toggleOpen} openCart={openCart} />
          </div>
          <div className={'hidden  xl:block '}>
            <MainMenu />
          </div>
        </div>

        <div className="mt-9 mb-3  sm:w-[320px] sm:mx-auto xl:hidden px-6">
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
