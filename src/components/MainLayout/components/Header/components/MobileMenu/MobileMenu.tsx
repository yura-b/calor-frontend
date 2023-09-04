import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainMenu from '../MainMenu';
import closeBtn from '@assets/cartImages/closeBtnIcon.png';
import userIcon from '@assets/images/userIcon.svg';
import { useNavigate } from 'react-router';
import Busket from '@components/ui/Busket';
import checkIcon from '@assets/images/checkIcon.svg';
import styles from '@styles/Styles.module.scss';
import Button from '@/components/ui/Button';
import { layoutFadeAnimation, fadeAnimation } from '@styles/Animations';
import HelpFooter from '@components/MainLayout/components/HelpFooter';
import { mobileMenuCalorItems } from '../../../../helpers/data';
import { useAppSelector } from '@/store/hooks/hooks.ts';
import { Role } from '@/constants/enums/role.enum.ts';
import { paths } from '@routes/paths';
import { Link } from 'react-router-dom';
interface Props {
  isOpen: boolean;
  toggleOpen: () => void;
  openCart: () => void;
}

const MobileMenu: React.FC<Props> = ({ isOpen, toggleOpen, openCart }): React.ReactElement => {
  const navigate = useNavigate();
  const signInHandler = () => {
    navigate('/login');
  };
  const signUpHandler = () => {
    navigate('/signup');
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

  const { roles, access_token, firstName, secondName } = useAppSelector((state) => state.user);
  const isRegisteredUser = !!(roles?.includes(Role.USER) && access_token);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          style={{ overflowY: 'auto', maxHeight: '100%', height: '100%' }}
          className={`xl:hidden fixed bg-custom-red left-0 right-0 z-20 top-0  ${isOpen ? '' : 'hidden'}  w-full`}
          {...layoutFadeAnimation}
        >
          <motion.div className={`text-white ${isOpen ? '' : 'hidden'}`}>
            <header className="fixed right-0 z-10 top-0 bg-custom-red flex justify-between w-full right-2 align-center px-6 py-3 border-b-2 border-custom-turquoise">
              <div className="flex items-center">
                {isRegisteredUser && (
                  <Link to={paths.account}>
                    {' '}
                    <img src={userIcon} />
                  </Link>
                )}
                {!isRegisteredUser && <img src={userIcon} />}
                {isRegisteredUser && (
                  <p className="ml-2 pt-1 border-box font-bold">
                    {firstName} {secondName}
                  </p>
                )}
                {!isRegisteredUser && (
                  <div className={'flex justify-center '}>
                    <span className={'ml-2 underline font-bold'} onClick={signInHandler}>
                      Sign In
                    </span>
                    /
                    <span className={'underline font-bold'} onClick={signUpHandler}>
                      Sign Up
                    </span>
                  </div>
                )}
              </div>
              <div className="flex">
                <Busket count={2} onClick={openCart} />
                <img
                  src={closeBtn}
                  alt="Menu"
                  onClick={toggleOpen}
                  className="block xl:hidden cursor-pointer w-5 h-5"
                />
              </div>
            </header>
            <motion.div className="mt-16 overflow-y-auto" {...fadeAnimation}>
              <main className="px-6">
                <MainMenu />
                <h1 className="mt-6 -mb-2 text-custom-turquoise text-4xl font-black sm:text-5xl md:text-6xl uppercase">
                  calor by you!
                </h1>
              </main>
              <footer className="bg-custom-turquoise h-full px-6 text-gray">
                {!isRegisteredUser && (
                  <>
                    <div className="pt-4">
                      <ul className={`list-none ${styles.subtitle}`}>
                        {mobileMenuCalorItems.map((item, index) => (
                          <li key={index} className="mb-2 flex items-center">
                            <img src={checkIcon} className="mr-2" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button color="gray" className="w-full my-4" onClick={signUpHandler}>
                      Create an Account
                    </Button>
                  </>
                )}
                <div className="xl:hidden min-h-[54vh] pt-10">
                  <HelpFooter title={'Need Help?'} color="gray" />
                </div>
              </footer>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
