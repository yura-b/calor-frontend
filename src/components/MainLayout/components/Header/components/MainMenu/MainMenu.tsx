import React, { useState, useEffect } from 'react';
import mintDownIcon from '@assets/images/mintDownIcon.svg';
import { motion, AnimatePresence } from 'framer-motion';
import { HashLink as Link } from 'react-router-hash-link';
import { menuItems } from '../../../../helpers/data';
import { collapseAnimation } from '@styles/Animations';
import { useMediaQuery } from '@react-hook/media-query';
import { useNavigate } from 'react-router';
import { ReactSVG } from 'react-svg';

interface Props {
  isMobileMenuOpen: boolean;
  toggleOpen: () => void;
}

const MainMenu: React.FC<Props> = ({ isMobileMenuOpen, toggleOpen }): React.ReactElement => {
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');
  const [isOpen, setIsOpen] = useState(-1);
  const [isHovered, setIsHovered] = useState(-1);
  const isMobile = window.innerWidth < 1280;
  const navigate = useNavigate();

  const handleToggle = (index) => {
    setIsOpen(isOpen === index ? -1 : index);
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

  const hangleClick = (path) => {
    navigate(path);
    if (isMobile && isMobileMenuOpen) {
      toggleOpen();
    }
  };
  return (
    <nav className={'flex text-2xl lg:text-base font-semibold m-auto'}>
      <ul className="w-full flex flex-col gap-2 xl:gap-6 xl:flex-row relative xl:justify-between xl:max-w-[64vw] m-auto">
        {menuItems.map((menuItem, index) => (
          <li key={index} className="relative py-2 xl:py-0">
            <div
              onMouseEnter={() => setIsHovered(index)}
              onMouseLeave={() => setIsHovered(-1)}
              onClick={() => handleToggle(index)}
              className={`${
                isOpen === index ? 'text-custom-turquoise' : 'text-white'
              } hover:text-custom-turquoise flex justify-between`}
            >
              <div className="flex cursor-pointer items-center xl:items-baseline">
                <Link
                  to={!menuItem.subItems?.length && menuItem.path}
                  className={'flex focus:outline-none xl:py-2 leading-6'}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  {menuItem.title}{' '}
                </Link>
                {menuItem.subItems?.length ? (
                  <ReactSVG
                    src={mintDownIcon}
                    beforeInjection={(svg) => {
                      svg.classList.add('icon');
                      svg.setAttribute('stroke-width', '1');
                      if (isHovered === index || isOpen === index) {
                        svg.setAttribute('stroke', '#B8E4D8');
                      } else {
                        svg.setAttribute('stroke', '#FFFFFF');
                      }
                    }}
                    style={{
                      transform: isOpen === index ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.4s linear',
                    }}
                    className="ml-2 xl:ml-1 "
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
                  variants={collapseAnimation?.variants}
                  transition={collapseAnimation.transition}
                  className="flex flex-col p-2 mt-[4px] xl:absolute z-20 w-full xl:min-w-[8rem] shadow-lg"
                  style={{ backgroundColor: 'rgb(184, 228, 216, 0.9)' }}
                  onMouseLeave={() => setIsOpen(-1)}
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
                      {isMobile ? (
                        <button onClick={() => hangleClick(option.path)}> {option.subTitle}</button>
                      ) : (
                        <Link to={option.path} scroll={scrollToElement}>
                          {option.subTitle}
                        </Link>
                      )}
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
