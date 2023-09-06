import { FC, useState } from 'react';
import { Divider } from '@material-ui/core';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import { getReview } from '@/api/reviews';
import Loader from '@/components/ui/Loader';
import moment from 'moment';
import StarRating from '@/components/ui/StarRating';
import { motion } from 'framer-motion';
import { fadeAnimation } from '@styles/Animations';

const ProductComments: FC = () => {
  const { id } = useParams();
  const {
    data: review,
    isLoading,
    isError,
  } = useQuery(['products', getReview], () => getReview(id), {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
  const [showAllReviews, setShowAllReviews] = useState(false);

  const reviewsToDisplay = showAllReviews ? review?.data : (review?.data || []).slice(0, 2);
  return isLoading ? (
    <Loader />
  ) : (
    <>
      <motion.div className="flex  overflow-x-auto flex-col gap-2 w-full text-gray" {...fadeAnimation}>
        {reviewsToDisplay.length ? (
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
              transition={{ duration: 0.3, ease: 'easeInOut', delay: i * 0.1 }}
            >
              <p className="font-bold">
                {item.firstName} {item.secondName}
              </p>
              <StarRating rating={item.rating} />
              <p className="py-2">{item.experience}</p>
              {item.photo && <img src={item.photo} className="object-contain object-cover w-[140px] h-[140px]" />}
              <p className="py-2 text-grayLight">{moment(item.date).fromNow()}</p>
              <Divider className="px-[40px]" variant="fullWidth" />
            </motion.div>
          ))
        ) : (
          <p className="font-bold">No reviews</p>
        )}
      </motion.div>
      {review?.data.length > 2 && (
        <button onClick={() => setShowAllReviews(!showAllReviews)} className="font-bold underline text-gray">
          {showAllReviews ? 'Less Reviews' : 'More Reviews'}
        </button>
      )}
    </>
  );
};

export default ProductComments;
