import { motion } from 'framer-motion';
import MainMenu from '../MainMenu';
import closeBtn from '@assets/cartImages/closeBtnIcon.png';
import userIcon from '@assets/images/userIcon.svg';
import { useNavigate } from 'react-router';
import Busket from '@components/ui/Busket';
import checkIcon from '@assets/images/checkIcon.svg';
import styles from '@styles/Styles.module.scss';
import Button from '@/components/ui/Button';

const MobileMenu = ({ isOpen, toggleOpen, openCart }) => {
  const navigate = useNavigate();
  const signInHandler = () => {
    navigate('/login');
  };
  const signUpHandler = () => {
    navigate('/signup');
  };
  const mobileMenuCalorItems = ['Faster Checkout', 'Access  Your Complete Order History', 'Discount Rewards Program'];
  const handleClick = () => {
    console.log('Button clicked!');
  };
  return (
    <motion.div
      className={`lg:hidden absolute bg-custom-red w-screen z-20 h-screen top-0 right-0  ${isOpen ? '' : 'hidden'}`}
      animate={isOpen ? 'open' : 'closed'}
    >
      <motion.div
        className={`text-white  ${isOpen ? '' : 'hidden'}`}
        initial={{ opacity: 0, display: 'none' }}
        animate={{ opacity: isOpen ? 1 : 0, display: isOpen ? 'block' : 'none' }}
      >
        <header className="flex justify-between align-center px-6 py-3 border-b-2 border-lightGray">
          <img src={userIcon} />
          <div className={'flex justify-center '}>
            <span className={'ml-2 underline font-bold'} onClick={signInHandler}>
              Sign In
            </span>
            /
            <span className={'underline font-bold'} onClick={signUpHandler}>
              Sign Up
            </span>
          </div>
          <Busket count={2} onClick={openCart} />
          <img src={closeBtn} alt="Menu" onClick={toggleOpen} className="block lg:hidden cursor-pointer w-5 h-5" />
        </header>
        <main className="px-6">
          <MainMenu />
          <h1 className="mt-6 -mb-2 text-custom-turquoise text-4xl font-black sm:text-5xl md:text-6xl">
            {'calor by you!'.toLocaleUpperCase()}
          </h1>
        </main>
        <footer className="bg-custom-turquoise h-full px-6">
          <div className="py-4">
            <ul className={`list-none ${styles.subtitle}`}>
              {mobileMenuCalorItems.map((item, index) => (
                <li key={index} className="mb-2 flex items-center">
                  <img src={checkIcon} className="mr-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <Button color="gray" className="w-full my-4" onClick={handleClick}>
            Create an Account
          </Button>
        </footer>
      </motion.div>
    </motion.div>
  );
};

export default MobileMenu;
