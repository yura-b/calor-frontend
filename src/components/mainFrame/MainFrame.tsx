import { useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '@styles/Styles.module.scss';
import { layoutFadeAnimation, fadeAnimation } from '@styles/Animations';
import X from '@assets/images/SignUpHeaderImg/X.png';
import { paths } from '@routes/paths';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks/hooks.ts';
import { Role } from '@/constants/enums/role.enum.ts';
import { ReactSVG } from 'react-svg';
import leftArrowIcon from '@assets/images/leftArrowIcon.svg';
import { useNavigate } from 'react-router';

interface MainFrameProps {
  isOpen?: boolean;
  title?: string;
  children?: ReactNode;
  className?: string;
  showCloseBtn?: boolean;
  headerBg?: string;
}

const MainFrame: React.FC<MainFrameProps> = ({
  isOpen,
  title,
  children,
  className,
  showCloseBtn,
  headerBg = 'custom-turquoise',
}) => {
  const { roles, access_token } = useAppSelector((state) => state.user);
  const isRegisteredUser = !!(roles?.includes(Role.USER) && access_token);
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
  const reloadOrderPage = () => {
    window.location.reload();
  };

  const location = useLocation();
  const isAccountPage = location.pathname === paths.account;
  const navigate = useNavigate();
  const goToHomePage = () => {
    navigate('/');
  };

  return (
    <AnimatePresence>
      <motion.div className={`w-full ${className}`} {...layoutFadeAnimation}>
        <motion.div>
          <header className={` bg-${headerBg} flex  items-center  px-6  h-[60px] lg:hidden`}>
            {isAccountPage && (
              <ReactSVG
                src={leftArrowIcon}
                beforeInjection={(svg) => {
                  svg.classList.add('icon');
                  svg.setAttribute('stroke', '#404040');
                }}
                onClick={goToHomePage}
              />
            )}
            <h1 className={`${styles.header2} m-auto text-gray uppercase`}>{title}</h1>
            {!showCloseBtn && isRegisteredUser && (
              <Link to={paths.account}>
                {' '}
                <img src={X} alt="Close" className="cursor-pointer w-5 h-5" />
              </Link>
            )}
            {!showCloseBtn && !isRegisteredUser && (
              <img src={X} alt="Close" className="cursor-pointer w-5 h-5" onClick={reloadOrderPage} />
            )}
          </header>
          <motion.div className="overflow-y-auto flex flex-col justify-between" {...fadeAnimation}>
            <main className="">{children}</main>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MainFrame;
