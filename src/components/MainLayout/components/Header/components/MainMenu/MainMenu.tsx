import React, { useState } from 'react';
import downIcon from '@assets/images/downIcon.svg';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { menuItems } from '../../../../helpers/data';
import { collapseAnimation } from '@styles/Animations';
import { useMediaQuery } from '@react-hook/media-query';

const MainMenu: React.FC = (): React.ReactElement => {
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');
  const [isOpen, setIsOpen] = useState(null);

  const handleToggle = (index) => {
    setIsOpen(isOpen === index ? null : index);
  };

  return (
    <nav className={'flex font-black  text-2xl lg:text-lg font-semibold'}>
      <ul className="w-full flex flex-col gap-2  lg:flex-row relative lg:gap-6">
        {menuItems.map((menuItem, index) => (
          <li key={index} className="relative py-2 lg:py-0">
            <Link
              to={menuItem.path}
              className="flex text-white hover:text-custom-turquoise focus:outline-none lg:py-2 "
              onClick={() => handleToggle(index)}
            >
              {menuItem.title}{' '}
              {menuItem.subItems?.length ? (
                <motion.img
                  src={downIcon}
                  alt={''}
                  className={'ml-2'}
                  animate={{ rotate: isOpen === index ? 180 : 0 }}
                  transition={{ duration: 0.4 }}
                />
              ) : null}
            </Link>
            <AnimatePresence>
              {isOpen === index && menuItem?.subItems && (
                <motion.nav
                  initial={isLargeScreen ? { opacity: 0, y: -10 } : 'collapsed'}
                  animate={isLargeScreen ? { opacity: 1, y: 0 } : 'open'}
                  exit={isLargeScreen ? { opacity: 0, y: -10 } : 'collapsed'}
                  variants={isLargeScreen ? {} : collapseAnimation?.variants}
                  transition={isLargeScreen ? {} : collapseAnimation.transition}
                  className="flex flex-col bg-white p-2  mt-2 lg:absolute z-20 w-full lg:w-56"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                >
                  {menuItem.subItems?.map((option, optionIndex) => (
                    <motion.li key={optionIndex} className="font-medium text-gray lg:hover:font-bold py-1">
                      <Link to="#">{option}</Link>
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
