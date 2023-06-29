import React, { useState } from 'react';
import downIcon from '@assets/images/downIcon.svg';

const MainMenu: React.FC = (): React.ReactElement => {
  const [activeMenuItem, setActiveMenuItem] = useState(null);

  const handleMenuItemClick = (itemId) => {
    if (activeMenuItem === itemId) {
      setActiveMenuItem(null);
    } else {
      setActiveMenuItem(itemId);
    }
  };
  const menuItems = [
    {
      id: 1,
      title: 'Design Your Shoe',
      subItems: [],
    },
    {
      id: 2,
      title: 'Design Your Bag',
      subItems: [],
    },
    {
      id: 3,
      title: 'Accessories',
      subItems: ['Sub Item 7', 'Sub Item 8', 'Sub Item 9'],
    },
    {
      id: 4,
      title: 'Shoe Care Product',
      subItems: ['Sub Item 10', 'Sub Item 11', 'Sub Item 12'],
    },
    {
      id: 4,
      title: 'Customer Experience',
      subItems: [],
    },
  ];
  return (
    <nav className="flex justify-center font-black  text-xl lg:text-xl lg:font-semibold">
      <div className="flex flex-col items-center lg:flex-row">
        {menuItems.map((menuItem) => (
          <div key={menuItem.id} className="relative group">
            <button
              className="px-4 py-2 text-white hover:bg-gray-700 focus:outline-none"
              onClick={() => handleMenuItemClick(menuItem.id)}
            >
              <p className="flex">
                {menuItem.title} {menuItem.subItems.length ? <img src={downIcon} alt={''} className="ml-2" /> : null}
              </p>
            </button>
            {activeMenuItem === menuItem.id && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                {menuItem.subItems.map((subItem, index) => (
                  <a key={index} href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {subItem}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default MainMenu;
