import { useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '@styles/Styles.module.scss';
import { layoutFadeAnimation, fadeAnimation } from '@styles/Animations';
import HelpFooter from '@components/MainLayout/components/HelpFooter';
import arrow from '@assets/images/SignUpHeaderImg/arrow.png';
import X from '@assets/images/SignUpHeaderImg/X.png';

interface MainFrameProps {
  isOpen?: boolean;
  closeFrame?: () => void;
  title?: string;
  children?: ReactNode;
  className?: string;
}

const MainFrame: React.FC<MainFrameProps> = ({ isOpen, closeFrame, title, children, className }) => {
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

  return (
    <AnimatePresence>
      <motion.div className={`   ${isOpen ? '' : 'hidden'}  w-full ${className}`} {...layoutFadeAnimation}>
        <motion.div>
          <header className=" bg-custom-turquoise flex justify-between items-center  px-6 py-3">
            <img src={arrow} className="cursor-pointer w-5 h-5" alt="Left Arrow" />
            <h1 className={`${styles.header1}`}>{title}</h1>
            <img src={X} alt="Close" onClick={closeFrame} className=" cursor-pointer w-5 h-5" />
          </header>
          <motion.div className=" overflow-y-auto" {...fadeAnimation}>
            <main className="">{children}</main>
            <footer className="bg-custom-turquoise h-full px-6 text-gray">
              <HelpFooter title={'Need Help?'} color="gray" />
            </footer>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MainFrame;
