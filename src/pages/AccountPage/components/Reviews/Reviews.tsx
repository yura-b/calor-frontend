import React, { useState } from 'react';
import styles from '@styles/Styles.module.scss';
import AccountLayout from '../AccountLayout';
import MainFrame from '@/components/mainFrame';
import Review from '@/components/Review/Review';
import { motion } from 'framer-motion';
import { layoutFadeAnimation } from '@/styles/Animations';
import { Modal, Rating } from '@mui/material';
import Button from '@/components/ui/Button';

import ReviewHeader from '@/components/Review/ReviewHeader';
import { findPublished } from '@/api/reviews';
import { useAppSelector } from '@/store/hooks/hooks';
import { useQuery } from 'react-query';
import { DateFormatter } from '@/helpers/functions/dateFormatter';
import { Square } from '@phosphor-icons/react';

const Reviews: React.FC = (): React.ReactElement => {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [review, setReview] = useState(null);
  const [isReviewSuccessfullySent, setIsReviewSuccessfullySent] = useState(false);
  const { userId } = useAppSelector((state) => state.user);
  const { data, isLoading } = useQuery('findPublished', () => findPublished());
  const reviews = data?.data;

  console.log(data, 'data');
  console.log(userId, 'userId');

  const closeReview = () => {
    setIsReviewOpen(false);
  };
  const openSuccessReview = () => {
    setIsReviewSuccessfullySent(true);
  };
  const closeSuccessReview = () => {
    setIsReviewSuccessfullySent(false);
  };

  const statusTextColor = (status) => {
    let color;
    switch (status) {
      case 'PUBLISHED':
        color = 'green';
        break;
      case 'CONSIDERED':
        color = 'orange';
        break;
      case 'REJECTED':
        color = 'red';
        break;
      default:
        color = 'black';
    }
    return color;
  };

  return (
    <AccountLayout>
      <MainFrame title={'Reviews'} className="overflow-hidden">
        {/* <Button onClick={() => setIsReviewOpen(!isReviewOpen)}>Write review</Button> */}
        <h2 className={`${styles.header2} text-gray mt-4 ml-4`}>Your Review</h2>
        <div className="p-4 w-full grid grid-cols-2 gap-2">
          {isLoading === false &&
            reviews.length > 0 &&
            reviews
              ?.filter((el) => el.user_id === userId)
              .map((item, i) => (
                <div className="p-4 " key={i}>
                  <div>{DateFormatter(item.date)}</div>
                  <div className="w-full flex justify-center mt-2">
                    <img src={item.photo} className=" w-full h-auto sm:w-[170px] md:w-[190px] lg:w-[190px]  " />
                  </div>
                  <h2 className="mt-2">{item.productName}</h2>
                  <Rating name="read-only" value={item.rating} readOnly />
                  <h2>{item.category}</h2>
                  <h2>From ${item.price}</h2>
                  <h2 className={`${styles.body1} font-bold text-gray mt-3`}>Your Review</h2>
                  <div className={`text-${statusTextColor(item.status)}-500 flex items-center mt-1`}>
                    <Square size={15} weight="fill" />
                    <div className="ml-2">{item.status}</div>
                  </div>
                  <div className="w-full whitespace-pre-line mt-2">{item.experience}</div>
                  <Button
                    color="gray"
                    className="w-full my-4 lg:block"
                    onClick={() => {
                      setReview(item);
                      setIsReviewOpen(!isReviewOpen);
                    }}
                  >
                    Rewrite Review
                  </Button>
                </div>
              ))}
        </div>
        <Modal className="flex items-center justify-center h-auto" open={isReviewOpen} onClose={closeReview}>
          <>
            {isReviewOpen && (
              <motion.div
                className="absolute bg-white shadow-lg w-full lg:w-[1024px] h-full  lg:max-h-[630px]  lg:rounded-md overflow-hidden"
                {...layoutFadeAnimation}
              >
                <Review title="Your review" onClose={closeReview} onSuccess={openSuccessReview} review={review} />
              </motion.div>
            )}
          </>
        </Modal>
        <Modal
          className="flex items-center justify-center h-auto"
          open={isReviewSuccessfullySent}
          onClose={closeSuccessReview}
        >
          <>
            {isReviewSuccessfullySent && (
              <motion.div
                className="absolute bg-white shadow-lg w-full lg:w-[369px] h-full  lg:max-h-[150px]  lg:rounded-md overflow-hidden"
                {...layoutFadeAnimation}
              >
                <div className="font-poppins  h-full flex flex-col">
                  <div className="flex-1 overflow-y-auto md:my-0">
                    <ReviewHeader title="Your review" onClose={closeSuccessReview} />
                    <h2 className="p-4">Your review will be considered and posted on our website soon.</h2>
                  </div>
                </div>
              </motion.div>
            )}
          </>
        </Modal>
      </MainFrame>
    </AccountLayout>
  );
};

export default Reviews;
