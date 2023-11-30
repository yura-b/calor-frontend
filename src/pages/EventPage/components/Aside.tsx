import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from '@styles/Styles.module.scss';
import Divider from '@mui/material/Divider';
import moment from 'moment';
import { motion } from 'framer-motion';
import { hoverOnButtonAnimation } from '@/styles/Animations';

const Aside = ({ events }) => {
  const { id } = useParams();

  const sortedEventsByDate = events.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  return (
    <>
      <div className="flex flex-col gap-4 justify-center align-top text-sm lg:text-base">
        <h2 className={`${styles.header1} ${styles.container} text-start p-0`}>More events</h2>
        {sortedEventsByDate.map((event) => (
          <>
            <div className="flex flex-col items-start">
              <span className={`${id !== event._id ? '' : 'text-mint'} font-bold`}>{event.title}</span>
              <div className="flex flex-row justify-between w-full">
                <span className={`${id !== event._id ? 'text-thinGray' : 'text-mint'}  flex items-center italic mr-2`}>
                  {moment(event.date).format('MMMM Do YYYY')}
                </span>
                {id !== event._id && (
                  <Link to={`/manager/event/${event._id}`} className="flex flex-col items-start justify-start">
                    <motion.span
                      className="text-gray  text-sm lg:text-base underline cursor-pointer text-center py-1 font-bold hover:text-mint"
                      {...hoverOnButtonAnimation}
                    >
                      Read More
                    </motion.span>
                  </Link>
                )}
              </div>
            </div>
            {id !== event._id ? <Divider variant="fullWidth" /> : <Divider style={{ backgroundColor: '#1EC1AA' }} />}
          </>
        ))}
      </div>
    </>
  );
};

export default Aside;
