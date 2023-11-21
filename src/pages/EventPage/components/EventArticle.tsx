import React from 'react';
import styles from '@styles/Styles.module.scss';
import Head from '@/layouts/Head';
import moment from 'moment';
import Divider from '@mui/material/Divider';

const EventArticle = ({ article }) => {
  return (
    <>
      <Head title={article.title} />
      <div className="flex flex-col w-full gap-10">
        <div className="w-full flex justify-center">
          <img src={article.photo} alt={article.title} className="object-contain h-[400px] max-w-full" />
        </div>
        <div className="w-full flex flex-col">
          <h2 className={`${styles.subtitle} font-semibold text-center mt-4 mb-2`}>{article.title}</h2>
          <p>{article.announcement}</p>
          <Divider className="py-4" variant="fullWidth" />
          <div className="flex justify-end">
            <span className="text-thinGray flex items-center italic">
              {moment(article.date).format('MMMM Do YYYY')}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventArticle;