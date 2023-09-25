import React, { useState } from 'react';
import styles from '@styles/Styles.module.scss';
import calorByYou from '@assets/images/calorByYou.png';
import calorByYouBig from '@assets/images/calorByYouBig.png';
import calorCircle from '@assets/images/calorCircle.png';
import { calorByYouItems } from '../../helpers/data';
import HomeShowRoom from '../HomeShowRoom';
import { useMediaQuery } from '@react-hook/media-query';
import { hoverOnButtonAnimation } from '@styles/Animations';
import { motion, AnimatePresence } from 'framer-motion';
import CustomerCreations from '@components/CustomerCreations';

interface benefit {
  page: string;
  section: string;
  title: string;
  value: string;
}
interface Props {
  benefits?: benefit[];
  perfectFit?: {
    title: string;
    value: string;
  };
}
const HomeCalorByYou: React.FC<Props> = ({ benefits, perfectFit }): React.ReactElement => {
  const benefitsWithImg = benefits?.map((benefit, i) => ({
    ...benefit,
    img: calorByYouItems[i].img,
  }));

  const isLargeScreen = useMediaQuery('(min-width: 1024px)');
  const maxItemsToShowLargeScreen = benefitsWithImg?.length || 0;
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
      <div
        className={'relative w-screen lg:h-[400px] h-[200px] bg-cover bg-center bg-no-repeat'}
        style={{ backgroundImage: isLargeScreen ? `url(${calorByYouBig})` : `url(${calorByYou})` }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-custom-red opacity-80"></div>
        <div className="absolute -bottom-2 right-6 lg:bottom-[26px] lg:left-[5vw] xl:left-[24vw] 2xl:left-[28vw]">
          <h1 className="text-white text-4xl font-black sm:text-5xl uppercase">calor by you!</h1>
        </div>
        <div className="hidden lg:block">
          <img src={calorCircle} className="lg:m-auto lg:pt-4" />
        </div>
        <div className="absolute max-w-[400px] w-[400px] min-w-[200px] hidden -top-1 lg:right-[5vw] xl:right-[15vw] lg:block">
          <HomeShowRoom
            backgroundButton="turquoise"
            showRoomTitleColor="white"
            titleColor="custom-turquoise"
            bodyColor="white"
            perfectFit={perfectFit}
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
            {benefitsWithImg?.slice(0, showAll ? benefitsWithImg?.length : maxItemsToShow).map((calorBy, i) => (
              <div key={i} className="flex gap-2 mb-2 items-start basis-[23%]">
                <div className="basis-1/5">
                  <img src={calorBy.img} />
                </div>
                <div className="basis-4/5">
                  <h2 className={`${styles.header2} lg:text-xl`}>{calorBy.title}</h2>
                  <p
                    className={`${styles.body2}  mt-1 text-[16px]`}
                    dangerouslySetInnerHTML={{ __html: calorBy.value || '' }}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
        {benefitsWithImg && benefitsWithImg.length > maxItemsToShow && (
          <div className="flex justify-end">
            <motion.button
              onClick={handleSeeAllClick}
              className={'flex justify-end  cursor-pointer mt-16 xs:mt-2 sm:mt-4 underline text-sm text-gray'}
              {...hoverOnButtonAnimation}
            >
              {showAll ? 'Show Less' : 'Learn More'}
            </motion.button>
          </div>
        )}
      </div>
      <CustomerCreations />
    </div>
  );
};

export default HomeCalorByYou;
