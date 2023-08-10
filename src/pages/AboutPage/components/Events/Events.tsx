import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from '@react-hook/media-query';
import { fetchEvents } from '@/api/apiFunctions/events';
import { EventDto } from '@/api/dto/event.dto';
import Loader from '@components/ui/Loader';
import { fadeAnimation, hoverOnButtonAnimation } from '@styles/Animations';
import styles from '@styles/Styles.module.scss';
import arrow from '@assets/images/SignUpHeaderImg/arrow.png';
interface Props {
  event: EventDto;
  i: number;
}

const EventCard = ({ event, i }: Props) => (
  <motion.div
    key={i}
    initial="collapsed"
    animate="expanded"
    exit="collapsed"
    variants={{
      collapsed: { scale: 0, opacity: 0 },
      expanded: { scale: 1, opacity: 1 },
    }}
    transition={{ duration: 0.3, ease: 'easeInOut', delay: i * 0.1 }}
    className="basis-[48%] lg:basis-[24%] flex flex-col justify-center items-center  lg:mb-8 h-max p-2"
  >
    <motion.div {...hoverOnButtonAnimation}>
      <img
        src={event.photo}
        alt={event.title}
        className="rounded-full border border-mintExtraLight border-8 object-contain object-cover w-[140px] h-[140px] mx-auto lg:w-[180px] lg:h-[180px]"
      />
      <p className={`${styles.subtitle} font-semibold text-center mt-4 `}>{event.title}</p>
      <p className={`${styles.body2} text-justify text-center `}>{event.announcement}</p>
    </motion.div>
  </motion.div>
);

const EventsComponent: React.FC = () => {
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
  });

  const maxItemsToShowLargeScreen = 4;
  const maxItemsToShowSmallScreen = 2;

  const [showAll, setShowAll] = useState(false);

  const maxItemsToShow = isLargeScreen ? maxItemsToShowLargeScreen : maxItemsToShowSmallScreen;

  const handleSeeAllClick = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };

  return (
    <motion.div {...fadeAnimation} className={`${styles.container}`} id="events">
      <div className="lg:flex items-center justify-between mb-2 lg:mb-6">
        <h1 className={`${styles.header1} text-center `}>Events</h1>
        {events.length > maxItemsToShow && (
          <motion.button
            onClick={handleSeeAllClick}
            className={`${styles.subtitle} cursor-pointer underline hidden lg:block`}
            {...hoverOnButtonAnimation}
          >
            {showAll ? (
              'Show Less'
            ) : (
              <>
                See All Events <img src={arrow} className="rotate-180 ml-2 inline-block" />
              </>
            )}
          </motion.button>
        )}
      </div>
      {loading ? (
        <Loader />
      ) : (
        <AnimatePresence initial={false}>
          {!events.length ? (
            <p className={`${styles.subtitle} text-center mt-4`}>No events</p>
          ) : (
            <motion.div className={`flex ${showAll ? 'flex-wrap' : ''} gap-2 justify-start`}>
              {events.slice(0, showAll ? events.length : maxItemsToShow).map((event, i) => (
                <EventCard event={event} i={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {events.length > maxItemsToShow && (
        <motion.button
          onClick={handleSeeAllClick}
          className={`${styles.subtitle} cursor-pointer mt-4 underline block mx-auto lg:hidden`}
          {...hoverOnButtonAnimation}
        >
          {showAll ? 'Show Less' : 'See All'}
        </motion.button>
      )}
    </motion.div>
  );
};

export default EventsComponent;
