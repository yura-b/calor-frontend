import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from '@react-hook/media-query';
import { fetchEvents } from '@/api/apiFunctions/events';
import { EventDto } from '@/api/dto/event.dto';
import Loader from '@components/ui/Loader';
import { fadeAnimation, hoverOnButtonAnimation } from '@styles/Animations';
import styles from '@styles/Styles.module.scss';

const EventCard = ({ event, isLargeScreen }) => (
  <motion.div
    className="basis-2/5 lg:basis-1/5 flex flex-col justify-center items-center text-center lg:mb-8"
    whileHover={{ scale: 1.1 }}
  >
    <img
      src={event.photo}
      alt=""
      style={{
        maxWidth: isLargeScreen ? '200px' : '140px',
        maxHeight: isLargeScreen ? '200px' : '140px',
        width: isLargeScreen ? '200px' : '140px',
        height: isLargeScreen ? '200px' : '140px',
      }}
      className="rounded-full"
    />
    <p className={`${styles.subtitle} font-semibold truncate w-36 mt-4 lg:w-48`}>{event.title}</p>
    <p className={`${styles.body2} truncate w-36 lg:w-48`}>{event.announcement}</p>
  </motion.div>
);

const Events: React.FC = () => {
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');
  const [events, setEvents] = useState<EventDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventData = async () => {
      const eventData = await fetchEvents();
      setEvents(eventData);
      setLoading(false);
    };

    fetchEventData();
  }, []);

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
      height: isLargeScreen ? '300px' : '230px',
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div {...fadeAnimation} className={`${styles.container}`} id="events">
      <h1 className={`${styles.header1} text-center mb-6`}>Events</h1>

      {loading ? (
        <Loader />
      ) : (
        <AnimatePresence initial={false}>
          {!events.length ? (
            <p className={`${styles.subtitle} text-center mt-4`}>No events</p>
          ) : (
            <motion.div
              className={`flex ${showAll ? 'flex-wrap' : ''} gap-2 justify-around`}
              variants={containerVariants}
              initial="collapsed"
              animate={showAll ? 'expanded' : 'collapsed'}
            >
              {events.slice(0, showAll ? events.length : maxItemsToShow).map((event, i) => (
                <EventCard key={i} event={event} isLargeScreen={isLargeScreen} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {events.length > maxItemsToShow && (
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
