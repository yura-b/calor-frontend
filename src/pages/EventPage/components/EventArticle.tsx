import React from 'react';
import styles from '@styles/Styles.module.scss';

const EventArticle = ({ article }) => {
  return (
    <>
      <div className="flex flex-col w-full gap-10">
        <div className="w-full flex justify-center">
          <img src={article.photo} alt={article.title} className="object-contain h-[400px] max-w-full" />
        </div>
        <div className="w-full flex flex-col">
          <h2 className={`${styles.subtitle} font-semibold text-center mt-4 mb-2`}>{article.title}</h2>
          <p>{article.announcement}</p>
        </div>
      </div>
    </>
  )
}

export default EventArticle;