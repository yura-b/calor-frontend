import { useState } from 'react';
import { fadeAnimation, hoverOnButtonAnimation } from '@styles/Animations';
import event1 from '@assets/aboutImages/event1.svg';
import event2 from '@assets/aboutImages/event2.svg';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '@styles/Styles.module.scss';
import { useMediaQuery } from '@react-hook/media-query';

const Events = () => {
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');
  const eventsItems = [
    {
      title: 'Title1',
      description: 'News announcement',
      photo: event1,
    },
    {
      title: 'Title2',
      description: 'News announcement',
      photo: event2,
    },
    {
      title: 'Title3',
      description: 'News announcement',
      photo: event1,
    },
    {
      title: 'Title4',
      description: 'News announcement',
      photo: event1,
    },
    {
      title: 'Title4',
      description: 'News announcement',
      photo: event1,
    },
    {
      title: 'Title4',
      description: 'News announcement',
      photo: event1,
    },
  ];

  const maxItemsToShowLargeScreen = 4;
  const maxItemsToShowSmallScreen = 2;

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
      height: isLargeScreen ? '260px' : '200px',
      transition: { duration: 0.4 },
    },
  };
  return (
    <motion.div {...fadeAnimation} className="container p-6" id="events">
      <h1 className={`${styles.header1} text-center mb-6`}>Events</h1>
      <AnimatePresence initial={false}>
        <motion.div
          className="flex flex-wrap gap-2 justify-around lg:justify-around"
          variants={containerVariants}
          initial="collapsed"
          animate={showAll ? 'expanded' : 'collapsed'}
        >
          {eventsItems.slice(0, showAll ? eventsItems.length : maxItemsToShow).map((item, i) => (
            <motion.div
              key={i}
              className="basis-2/5 lg:basis-1/5 flex flex-col justify-center items-center text-center max-h-60 mb-4 lg:mb-8"
              {...fadeAnimation}
              whileHover={{ scale: 1.1 }}
            >
              <img
                src={item.photo}
                alt=""
                style={{ maxWidth: isLargeScreen ? '200px' : '140px', maxHeight: isLargeScreen ? '200px' : '140px' }}
                className="rounded-full"
              />
              <p className={`${styles.subtitle} font-semibold truncate w-36 mt-4 lg:w-48`}>{item.title}</p>
              <p className={`${styles.body2} truncate w-36 lg:w-48`}>{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      {eventsItems.length > maxItemsToShow && (
        <motion.button
          onClick={handleSeeAllClick}
          className={`${styles.subtitle} cursor-pointer mt-4 underline block mx-auto`}
          {...hoverOnButtonAnimation}
        >
          {showAll ? 'Show Less' : 'See All'}
        </motion.button>
      )}
    </motion.div>
  );
};

export default Events;
