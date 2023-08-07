import { useState, useEffect } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { aboutLinks } from '../../helpers/data';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '@/styles/Styles.module.scss';
import { collapseAnimation } from '@styles/Animations';
import { paths } from '@/routes/paths';

const AboutCalorFooter = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const toggleAccordion = () => {
    setIsAccordionOpen((prev) => !prev);
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
    <div className="border-b border-white py-2 lg:border-none lg:py-0">
      <motion.div className="flex justify-between items-center" onClick={toggleAccordion}>
        <Link
          to={paths.about}
          className={`${styles.subtitle} ${
            paths.about === window.location.pathname ? 'text-mint' : 'text-white lg:text-custom-turquoise'
          } lg:text-sm lg:font-extrabold`}
          onClick={scrollToTop}
        >
          About Calor
        </Link>
        <h1
          className={`text-[32px] font-extralight ${
            paths.about === window.location.pathname ? 'text-mint' : 'text-white'
          } lg:hidden`}
        >
          {isAccordionOpen ? '-' : '+'}
        </h1>
      </motion.div>
      <AnimatePresence>
        {isAccordionOpen && (
          <motion.div {...collapseAnimation} className="lg:hidden">
            {aboutLinks.map((link, i) => (
              <Link
                key={i}
                to={link.path}
                scroll={scrollToElement}
                className={`flex text-base hover:text-custom-turquoise focus:outline-none py-2 ${styles.link}`}
              >
                {link.subTitle}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="hidden lg:block mt-1">
        {aboutLinks.map((link, i) => (
          <Link
            key={i}
            to={link.path}
            scroll={scrollToElement}
            className={`flex text-xs font-semibold hover:text-custom-turquoise focus:outline-none py-1 ${styles.link}`}
          >
            {link.subTitle}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AboutCalorFooter;
