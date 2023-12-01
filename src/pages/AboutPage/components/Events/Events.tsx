import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from '@react-hook/media-query';
import { fetchEvents } from '@/api/apiFunctions/events';
import { EventDto } from '@/api/dto/event.dto';
import Loader from '@components/ui/Loader';
import { fadeAnimation, hoverOnButtonAnimation } from '@styles/Animations';
import styles from '@styles/Styles.module.scss';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import leftArrowIcon from '@assets/images/leftArrowIcon.svg';
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
    className="lg:mb-8 h-max"
  >
    <motion.div {...hoverOnButtonAnimation}>
      {/* <Link to={`/manager/event/${event._id}`}> */}
        <img
          src={event.photo}
          alt={event.title}
          className="rounded-full border-mintExtraLight border-8 object-cover w-[140px] h-[140px] mx-auto lg:w-[180px] lg:h-[180px]"
        />
      {/* </Link> */}
      <div className="line-clamp-2 mt-2 text-center">
        <span className={`${styles.body1} font-semibold text-center mt-4`}>{event.title}</span>
      </div>
      <div className="mt-2">
        <span className={`${styles.body1} text-center mt-4`}>{event.announcement}</span>
      </div>
    </motion.div>
  </motion.div>
);

const EventsComponent: React.FC = () => {
  const isLargeScreen = useMediaQuery('(min-width: 768px)');
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

  const sortedEventsByDate = events.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  return (
    <motion.div {...fadeAnimation} className={`${styles.container}`} id="events">
      <div className="lg:flex items-center justify-between mb-2 lg:mb-6">
        <h1 className={`${styles.header1} text-center `}>Events</h1>
        {sortedEventsByDate.length > maxItemsToShow && (
          <motion.button
            onClick={handleSeeAllClick}
            className={`${styles.subtitle} cursor-pointer underline hidden lg:block`}
            {...hoverOnButtonAnimation}
          >
            {showAll ? (
              'Show Less'
            ) : (
              <div className="flex items-center">
                <p>See All Events</p>
                <ReactSVG
                  src={leftArrowIcon}
                  beforeInjection={(svg) => {
                    svg.classList.add('icon');
                    svg.setAttribute('stroke', '#404040');
                  }}
                  style={{
                    transform: 'rotate(180deg)',
                  }}
                  className="ml-2"
                />
              </div>
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
            <motion.div className={'grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-1 lg:gap-2'}>
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
