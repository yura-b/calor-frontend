import React from 'react';
import { Link } from "react-router-dom";
import styles from '@styles/Styles.module.scss';

const Aside = ({ events }) => {
  return (
    <>
      <div className="flex flex-col gap-4 justify-center align-top">
        <h2 className={`${styles.header1} ${styles.container} text-start p-0`}>More events</h2>
        {
          events.map((event) => (
            <div className="flex flex-col items-start border-b border-gray">
              <span >{event.title}</span>
              <Link to={`/manager/event/${event._id}`} className="flex flex-col items-start justify-start">
                <span className="text-gray font-semibold text-base underline cursor-pointer text-center py-1 font-boldmd:text-lg">Read More</span>
              </Link>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default Aside;