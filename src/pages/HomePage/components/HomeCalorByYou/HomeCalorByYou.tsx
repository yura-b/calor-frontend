import React, { useState } from 'react';
import styles from '@styles/Styles.module.scss';
import Button from '@/components/ui/Button';
import calorByYou from '@assets/images/calorByYou.svg';
import homeCustomerCreation1 from '@assets/images/homeCustomerCreation1.svg';
import homeCustomerCreation2 from '@assets/images/homeCustomerCreation2.svg';
import { calorByYouItems } from '../../helpers/data';
import HomeShowRoom from '../HomeShowRoom';
import { useMediaQuery } from '@react-hook/media-query';
import { hoverOnButtonAnimation } from '@styles/Animations';
import { motion, AnimatePresence } from 'framer-motion';

const HomeCalorByYou: React.FC = (): React.ReactElement => {
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');
  const handleClick = () => {
    console.log('Button clicked!');
  };

  const homeCustomerCreations = [
    {
      img: homeCustomerCreation1,
    },
    {
      img: homeCustomerCreation2,
    },
    {
      img: homeCustomerCreation1,
    },
    {
      img: homeCustomerCreation1,
    },
    {
      img: homeCustomerCreation1,
    },
  ];
  const maxItemsToShowLargeScreen = calorByYouItems.length;
  const maxItemsToShowSmallScreen = 3;

  const [showAll, setShowAll] = useState(false);

  const maxItemsToShow = isLargeScreen ? maxItemsToShowLargeScreen : maxItemsToShowSmallScreen;

  const handleSeeAllClick = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };
  const containerVariants = {
    expanded: {
      height: 'auto',
      transition: { duration: 0.4 },
    },
    collapsed: {
      height: isLargeScreen ? 'auto' : '360px',
      transition: { duration: 0.4 },
    },
  };
  return (
    <div className="w-full bg-white">
      <div className="relative w-screen lg:h-[400px]">
        <div className={`${styles.container} py-0 px-0 max-w-[100vw] md:max-w-[80vw] lg:max-w-[70vw]`}>
          <img src={calorByYou} alt="Your Image" className=" lg:h-[400px] lg:w-auto " />
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-custom-red opacity-80"></div>
        <div className="absolute -bottom-2 right-6 lg:top-[180px] lg:left-[5vw] xl:left-[30vw]">
          <h1 className="text-white text-4xl font-black sm:text-5xl   uppercase">calor by you!</h1>
        </div>
        <div className="absolute max-w-[400px] w-[400px] min-w-[200px] hidden top-4 lg:right-[5vw] xl:right-[15vw] lg:block">
          <HomeShowRoom
            backgroundButton="turquoise"
            showRoomTitleColor="white"
            titleColor="custom-turquoise"
            bodyColor="white"
          />
        </div>
      </div>
      <div className={`${styles.container}`}>
        <AnimatePresence initial={false}>
          <motion.div
            className="flex flex-col justify-start gap-2  pt-6 lg:flex-row lg:flex-wrap lg:gap-6"
            variants={containerVariants}
            initial="collapsed"
            animate={showAll ? 'expanded' : 'collapsed'}
          >
            {calorByYouItems.slice(0, showAll ? calorByYouItems.length : maxItemsToShow).map((calorBy, i) => (
              <div key={i} className="flex gap-2 mb-2 items-start basis-[23%]">
                <div className="basis-1/5">
                  <img src={calorBy.img} />
                </div>
                <div className="basis-4/5">
                  <h2 className={styles.header2}>{calorBy.title}</h2>
                  <p className={`${styles.body2} text-justify mt-1`}>{calorBy.text}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
        {calorByYouItems.length > maxItemsToShow && (
          <div className="flex justify-end">
            <motion.button
              onClick={handleSeeAllClick}
              className={'flex justify-end  cursor-pointer mt-4 underline text-sm text-gray'}
              {...hoverOnButtonAnimation}
            >
              {showAll ? 'Show Less' : 'Learn More'}
            </motion.button>
          </div>
        )}
      </div>
      <div className={styles.container}>
        <p className={styles.subtitle}>Customer Creations</p>
        <div className="flex justify-between items-center">
          <h1 className={'text-2xl font-black text-gray lg:text-4xl'}>@calor_custom_sneakers</h1>
          <Button color="gray" className="w-full my-4 hidden lg:block" onClick={handleClick}>
            Follow Us
          </Button>
        </div>
        <div className="flex overflow-x-auto flex-row gap-2 mx-auto lg:gap-10">
          {homeCustomerCreations.map((item, i) => (
            <div className="flex justify-center items-center lg:basis-1/5  my-4" key={i}>
              <div className={'w-36  text-gray lg:w-full '}>
                <img src={item.img} className="w-full" />
              </div>
            </div>
          ))}
        </div>
        <Button color="gray" className="w-full my-4 lg:hidden" onClick={handleClick}>
          Follow Us
        </Button>
      </div>
    </div>
  );
};

export default HomeCalorByYou;
