import React, { useState } from 'react';
import downIcon from '@assets/images/downIcon.svg';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const MainMenu: React.FC = (): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(null);

  const handleToggle = (index) => {
    setIsOpen(isOpen === index ? null : index);
  };
  const menuItems = [
    {
      id: 1,
      title: 'Design Your Shoe',
    },
    {
      id: 2,
      title: 'Design Your Bag',
    },
    {
      id: 3,
      title: 'Accessories',
      subItems: ['All', 'Belts', 'Bracelets', 'Laces', 'Souvenirs', 'T-Shirts'],
    },
    {
      id: 4,
      title: 'Shoe Care Product',
      subItems: ['All', 'Brushes', 'Cleaners', 'Protectors'],
    },
    {
      id: 4,
      title: 'Customer Experience',
    },
  ];
  return (
    <nav className={'flex font-black  text-2xl lg:text-lg font-semibold lg:justify-center'}>
      <ul className="w-full flex flex-col gap-2 lg:items-center lg:flex-row relative lg:gap-6">
        {menuItems.map((menuItem, index) => (
          <li key={index} className="relative py-2 lg:py-0">
            <Link
              to="#"
              className="flex text-white hover:text-custom-turquoise focus:outline-none  lg:py-2 "
              onClick={() => handleToggle(index)}
            >
              {menuItem.title} {menuItem.subItems?.length ? <img src={downIcon} alt={''} className="ml-2" /> : null}
            </Link>
            <AnimatePresence>
              {isOpen === index && (
                <motion.nav
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col bg-white p-2  mt-2 lg:absolute z-20 w-full lg:w-56"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                >
                  {menuItem.subItems?.map((option, optionIndex) => (
                    <li key={optionIndex} className="font-medium text-gray lg:hover:font-bold py-1">
                      <Link to="#">{option}</Link>
                    </li>
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
