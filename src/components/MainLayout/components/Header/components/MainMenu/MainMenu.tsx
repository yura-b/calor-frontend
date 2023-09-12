import React, { useState, useEffect } from 'react';
import downIcon from '@assets/images/downIcon.svg';
import mintDownIcon from '@assets/images/mintDownIcon.svg';
import { motion, AnimatePresence } from 'framer-motion';
import { HashLink as Link } from 'react-router-hash-link';
import { menuItems } from '../../../../helpers/data';
import { collapseAnimation } from '@styles/Animations';
import { useMediaQuery } from '@react-hook/media-query';

const MainMenu: React.FC = (): React.ReactElement => {
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');
  const [isOpen, setIsOpen] = useState(null);

  const handleToggle = (index) => {
    setIsOpen(isOpen === index ? null : index);
  };

  const [headerHeight, setHeaderHeight] = useState(0);
  const mobileBreakpoint = 1024;
  const updateHeaderHeight = () => {
    const headerElement = document.getElementById('header');
    if (headerElement) {
      setHeaderHeight(headerElement.offsetHeight);
    }
  };

  useEffect(() => {
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, []);
  const scrollToElement = (el) => {
    setTimeout(() => {
      const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
      const yOffset = window.innerWidth < mobileBreakpoint ? headerHeight - 110 : headerHeight;
      window.scrollTo({
        top: yCoordinate - yOffset,
        behavior: 'smooth',
      });
    }, 200);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <nav className={'flex  text-2xl lg:text-base font-semibold  m-auto'}>
      <ul className="w-full flex flex-col gap-2 xl:gap-6  xl:flex-row relative xl:justify-between  xl:max-w-[54vw] m-auto">
        {menuItems.map((menuItem, index) => (
          <li key={index} className="relative py-2 xl:py-0">
            <div className="flex justify-between">
              <div onMouseEnter={() => handleToggle(index)} className="flex cursor-pointer">
                <Link
                  to={menuItem.path}
                  className="flex text-white hover:text-custom-turquoise focus:outline-none xl:py-2 leading-6"
                  style={{ whiteSpace: 'nowrap' }}
                  onClick={scrollToTop}
                >
                  {menuItem.title}{' '}
                </Link>
                {menuItem.subItems?.length ? (
                  <motion.img
                    src={isOpen === index ? mintDownIcon : downIcon}
                    alt={''}
                    className={` ${isOpen === index ? '' : 'brightness-0 invert'} ml-4 xl:ml-1`}
                    animate={{ rotate: isOpen === index ? 180 : 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleToggle(index)}
                  />
                ) : null}
              </div>
            </div>
            <AnimatePresence>
              {isOpen === index && menuItem?.subItems && (
                <motion.nav
                  initial={isLargeScreen ? { opacity: 0, y: -10 } : 'collapsed'}
                  animate={isLargeScreen ? { opacity: 1, y: 0 } : 'open'}
                  exit={isLargeScreen ? { opacity: 0, y: -10 } : 'collapsed'}
                  variants={isLargeScreen ? {} : collapseAnimation?.variants}
                  transition={isLargeScreen ? {} : collapseAnimation.transition}
                  className="flex flex-col  p-2  mt-[4px] xl:absolute z-20 w-full xl:min-w-[8rem] shadow-lg"
                  style={{ backgroundColor: 'rgb(184, 228, 216, 0.9)' }}
                  onMouseLeave={() => setIsOpen(null)}
                >
                  <div
                    className="absolute -top-4 right-1 w-0 h-0 -rotate-90 hidden xl:block"
                    style={{
                      borderWidth: '8px',
                      borderStyle: 'solid',
                      borderColor: 'transparent transparent transparent rgb(184, 228, 216, 0.9)',
                    }}
                  />
                  {menuItem.subItems?.map((option, optionIndex) => (
                    <motion.li key={optionIndex} className="font-medium text-gray xl:hover:font-bold py-1">
                      <Link to={option.path} scroll={scrollToElement}>
                        {option.subTitle}
                      </Link>
                    </motion.li>
                  ))}
                </motion.nav>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MainMenu;
