import React, { useState } from 'react';
import styles from '@styles/Styles.module.scss';
import { useQuery } from 'react-query';
import { getReviews } from '@/api/reviews';
import StarRating from '@/components/ui/StarRating';
import { motion } from 'framer-motion';
import { fadeAnimation } from '@styles/Animations';

const Reviews: React.FC = () => {
  const { data, isLoading, error } = useQuery('getReviews', () => getReviews());
  const [showAllReviews, setShowAllReviews] = useState(false);

  const reviewsToDisplay = showAllReviews ? data?.data : (data?.data || []).slice(0, 2);
  if (isLoading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>Error loading data</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header1}>Reviews</h1>
      <div className="flex lg:flex-row overflow-x-auto flex-col gap-2 lg:gap-6 text-gray" {...fadeAnimation}>
        {reviewsToDisplay?.length ? (
          reviewsToDisplay.map((item, i) => (
            <motion.div
              className="flex flex-col lg:basis-1/2 my-4"
              key={i}
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              variants={{
                collapsed: { scale: 0, opacity: 0 },
                expanded: { scale: 1, opacity: 1 },
              }}
            >
              <p className="font-bold">
                {item.firstName} {item.secondName}
              </p>
              <StarRating rating={item.rating} />
              <p className="py-2">{item.experience}</p>
              {item.photo && <img src={item.photo} className="object-contain object-cover w-[140px] h-[140px]" />}
              <p className="py-2 text-grayLight">{new Date(item.date).toISOString().split('T')[0]}</p>
            </motion.div>
          ))
        ) : (
          <p className="font-bold">No reviews</p>
        )}
      </div>
      {data?.data?.length > 2 && (
        <button onClick={() => setShowAllReviews(!showAllReviews)} className="font-bold underline text-gray">
          {showAllReviews ? 'Less Reviews' : 'More Reviews'}
        </button>
      )}
    </div>
  );
};

export default Reviews;
