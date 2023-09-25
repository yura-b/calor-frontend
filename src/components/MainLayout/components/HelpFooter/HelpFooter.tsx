import React, { useState, useEffect } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { helpLinks, privacyLinks } from '../../helpers/data';
import styles from '@/styles/Styles.module.scss';
import atIcon from '@/assets/images/atIcon.svg';
import grayTelIcon from '@assets/images/grayTelIcon.svg';
import mintTelcon from '@assets/images/mintTelcon.svg';
import { collapseAnimation } from '@styles/Animations';
import { useQuery } from 'react-query';
import { getPageSection } from '@/api/manager/pages';
import { useAppSelector } from '@/store/hooks/hooks.ts';
import { Role } from '@/constants/enums/role.enum.ts';
import { paths } from '@/routes/paths';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  title: string;
  color?: 'gray' | 'white';
  isOpen: boolean;
  toggleOpen: () => void;
}

const HelpFooter: React.FC<Props> = ({ title, color, isOpen, toggleOpen }): React.ReactElement => {
  const { data, isLoading, error } = useQuery('getPageSection', () => getPageSection(), {
    staleTime: Infinity,
  });
  const filteredPagesFooter = data?.data.filter((page) => page.page === 'Footer');
  const phone = filteredPagesFooter?.find((section) => section?.section === 'Phone Number').value;
  const email = filteredPagesFooter?.find((section) => section?.section === 'Email').value;
  const address = filteredPagesFooter?.find((section) => section?.section === 'Address').value;
  const commaIndex = address?.indexOf(',');
  const address1 = address?.substring(0, commaIndex);
  const address2 = address?.substring(commaIndex + 1).trim();
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const mobileBreakpoint = 1024;
  const isMobile = window.innerWidth < 1280;

  const toggleAccordion = () => {
    if (window.innerWidth < mobileBreakpoint) {
      setIsAccordionOpen((prev) => !prev);
    }
  };
  const { roles, access_token } = useAppSelector((state) => state.user);
  const isRegisteredUser = !!(roles?.includes(Role.USER) && access_token);
  const [headerHeight, setHeaderHeight] = useState(0);
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
      const yOffset = window.innerWidth < mobileBreakpoint ? headerHeight - 20 : headerHeight + 10;
      const scrollToY = yCoordinate - yOffset;
      window.scrollTo({
        top: scrollToY,
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

  const handleLinkClick = (el) => {
    scrollToElement(el);
    if (isMobile && isOpen) {
      toggleOpen();
    }
  };

  return (
    <>
      {color !== 'white' ? (
        <>
          <div
            className={`${styles.subtitle} ${
              paths.helpPage === window.location.pathname ? 'text-mint' : `text-${color} lg:text-custom-turquoise`
            }
           lg:text-sm lg:font-extrabold`}
          >
            {title}
          </div>
          {helpLinks.map((link, i) => (
            <Link
              key={i}
              to={link.path}
              className={'flex text-base hover:text-mint focus:outline-none py-2'}
              scroll={handleLinkClick}
            >
              {link.title}
            </Link>
          ))}
        </>
      ) : (
        <div className="border-b border-white lg:border-none lg:py-0">
          <div className="flex justify-between items-center" onClick={toggleAccordion}>
            <Link
              to={paths.helpPage}
              className={`${styles.subtitle} ${
                paths.helpPage === window.location.pathname ? 'text-mint' : `text-${color} lg:text-custom-turquoise`
              }
          } lg:text-sm lg:font-extrabold`}
              onClick={scrollToTop}
            >
              {title}
            </Link>
            <h1
              className={`text-[32px] font-extralight ${
                paths.helpPage === window.location.pathname ? 'text-mint' : 'text-white'
              } lg:hidden`}
            >
              {isAccordionOpen ? '-' : '+'}
            </h1>
          </div>
          <AnimatePresence>
            {isAccordionOpen && (
              <motion.div {...collapseAnimation}>
                {helpLinks.map((link, i) => (
                  <Link
                    key={i}
                    to={link.path}
                    className={'flex text-base hover:text-custom-turquoise focus:outline-none py-2'}
                    scroll={handleLinkClick}
                  >
                    {link.title}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          <div className="hidden lg:block mt-1">
            {helpLinks.map((link, i) => (
              <Link
                key={i}
                to={link.path}
                className={'flex text-xs font-semibold hover:text-custom-turquoise focus:outline-none py-1'}
                scroll={handleLinkClick}
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      )}
      {color == 'white' && (
        <div className="lg:hidden flex flex-col">
          {isRegisteredUser && (
            <Link
              to={paths.myOrders}
              className={`${styles.subtitle}  text-white lg:text-custom-turquoise lg:text-sm lg:font-extrabold py-3 border-b border-white`}
              onClick={scrollToTop}
            >
              Check Order Status
            </Link>
          )}
          {!isRegisteredUser && (
            <Link
              to={paths.myOrder}
              className={`${styles.subtitle} text-white lg:text-custom-turquoise lg:text-sm lg:font-extrabold py-3 border-b border-white`}
              onClick={scrollToTop}
            >
              Check Order Status
            </Link>
          )}
          <Link
            to="https://calorfranchise.com/"
            className={`${styles.subtitle} text-${color} lg:text-custom-turquoise lg:text-sm lg:font-extrabold  py-3 border-b border-white`}
          >
            Be Our Partner
          </Link>
        </div>
      )}
      <div
        className={`flex justify-between text-sm text-${color} py-4 ${
          color === 'white' ? 'px-0' : 'font-bold'
        } lg:hidden`}
      >
        {isLoading ? (
          <p>Loading data...</p>
        ) : error ? (
          <p>Error loading data</p>
        ) : (
          <a href={`tel:+${phone}`} className="cursor-pointer">
            <div className={'flex basis-1/2 '}>
              <img
                src={grayTelIcon}
                className={`mr-2 filter ${color === 'white' ? 'brightness-0 invert' : ''}`}
                alt=""
              />
              <span dangerouslySetInnerHTML={{ __html: phone || '' }} />
            </div>
          </a>
        )}
        <div className={'flex'}>
          <img src={atIcon} className={`mr-2 filter ${color === 'white' ? 'brightness-0 invert' : ''}`} alt="" />
          <span>2023 Calor</span>
        </div>
      </div>
      <div className={'lg:flex lg:absolute lg:right-0 lg:bottom-10 hidden lg:block lg:text-sm'}>
        <img src={atIcon} className={`mr-2 filter ${color === 'white' ? 'brightness-0 invert' : ''}`} alt="" />
        <span>2023 Calor</span>
      </div>
      {/* <div className={'lg:flex lg:absolute lg:right-0 lg:bottom-4 hidden lg:block lg:text-[12px]'}>
        Designed & developed by{' '}
        <Link to="https://www.bart-solutions.com/" className="underline ml-1 font-bold" target="_blank">
          bART Solutions
        </Link>
      </div> */}
      {color === 'white' && (
        <>
          {isLoading ? (
            <p>Loading data...</p>
          ) : error ? (
            <p>Error loading data</p>
          ) : (
            <div className="text-xs">
              <div className="flex  justify-between lg:flex-col">
                <a href={`tel:+${phone}`} className="cursor-pointer hidden lg:block">
                  <div className={'mb-1   lg:text-custom-turquoise lg:flex'}>
                    <img src={mintTelcon} className={'mr-2  '} alt="" />
                    <span className="lg:text-sm lg:font-extrabold" dangerouslySetInnerHTML={{ __html: phone || '' }} />
                  </div>
                </a>
                <div className="font-semibold leading-6">
                  <p dangerouslySetInnerHTML={{ __html: address1 || '' }} />
                  <p dangerouslySetInnerHTML={{ __html: address2 || '' }} />
                </div>
                <p className="font-semibold leading-6">
                  <a href={`mailto:${email}`} dangerouslySetInnerHTML={{ __html: email || '' }} />
                </p>
              </div>
            </div>
          )}
          <div className="flex justify-between text-xs mt-3 lg:flex-col lg:justify-start lg:mt-0 lg:absolute lg:right-2 lg:top-16 xl:relative xl:top-0">
            <h1 className={'text-custom-turquoise hidden xl:block xl:text-sm xl:font-extrabold'}>Info</h1>
            {privacyLinks.map((link, i) => (
              <Link
                key={i}
                to={link.path}
                className={' text-xs font-semibold hover:text-custom-turquoise focus:outline-none py-1'}
                onClick={(e) => {
                  if (link.isPdfLink) {
                    e.preventDefault();
                    window.open(link.path, '_blank');
                  }
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>
          {/* <div className={'lg:hidden text-[12px] text-center my-2'}>
            Designed & developed by{' '}
            <Link to="https://www.bart-solutions.com/" className="underline ml-1 font-bold" target="_blank">
              bART Solutions
            </Link>
          </div> */}
        </>
      )}
    </>
  );
};

export default HelpFooter;
