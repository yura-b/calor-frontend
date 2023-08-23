import { useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '@styles/Styles.module.scss';
import { layoutFadeAnimation, fadeAnimation } from '@styles/Animations';
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
      <motion.div className={`    w-full ${className}`} {...layoutFadeAnimation}>
        <motion.div>
          <header className=" bg-custom-turquoise flex  items-center  px-6  h-[60px] lg:hidden">
            <h1 className={`${styles.header2} m-auto text-gray uppercase`}>{title}</h1>
            <img src={X} alt="Close" onClick={closeFrame} className=" cursor-pointer w-5 h-5" />
          </header>
          <motion.div
            className="overflow-y-auto flex flex-col justify-between h-screen max-h-[88vh] lg:max-h-[74vh] lg:h-auto "
            {...fadeAnimation}
          >
            <main className="">{children}</main>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MainFrame;
