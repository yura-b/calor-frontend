import React, { useState } from 'react';
import downIcon from '@assets/images/downIcon.svg';
import { motion, AnimatePresence } from 'framer-motion';

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
    <nav className="flex font-black  text-xl lg:text-xl lg:font-semibold lg:justify-center">
      <div className="flex flex-col lg:items-center lg:flex-row relative">
        {menuItems.map((menuItem, index) => (
          <div key={index} className="relative lg:w-52 lg:min-w-max lg:max-w-fit">
            <button
              className="lg:px-4 py-2 text-white hover:text-custom-turquoise focus:outline-none"
              onClick={() => handleToggle(index)}
            >
              <p className="flex">
                {menuItem.title} {menuItem.subItems?.length ? <img src={downIcon} alt={''} className="ml-2" /> : null}
              </p>
            </button>
            <AnimatePresence>
              {isOpen === index && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white p-2 rounded mt-2 absolute z-20 w-full opacity-25 "
                >
                  {menuItem.subItems?.map((option, optionIndex) => (
                    <div key={optionIndex} className="text-2xl text-gray lg:text-base py-1">
                      {option}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default MainMenu;
