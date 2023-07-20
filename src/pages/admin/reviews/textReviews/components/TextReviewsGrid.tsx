import React, { useEffect, useState } from 'react';
import CustomSearch from '@components/admin/CustomSearch.tsx';
import { getAllReviews } from '@/api/reviews.ts';
import { useAppSelector } from '@/store/hooks/hooks.ts';
import { useCleanUserDataAndNavigateToLogin } from '@components/hooks/CleanUserData.ts';
import { Review, ReviewStatusEnum } from '@/constants/interfaces/review.ts';
import ReviewComponent from '@pages/admin/reviews/textReviews/components/ReviewComponent.tsx';

const TextReviewsGrid = () => {
  const { access_token } = useAppSelector((state) => state.user);
  const clearData = useCleanUserDataAndNavigateToLogin();

  const [history, isHistory] = useState(true);
  const [filter, setFilter] = useState('');

  const defaultStyles = ' font-bold px-6 cursor-pointer font-bold border-b-2 border-black';
  const stylesForHistory = history && ' text-white bg-black';
  const stylesForPending = !history && ' text-white bg-black';
  const [publishedReviews, setPublishedReview] = useState<Review[]>([]);
  const [pendingReviews, setPendingReviews] = useState<Review[]>([]);
  useEffect(() => {
    if (!access_token) return;
    getAllReviews(access_token, filter)
      .then((res) => {
        console.log(res);

        setPublishedReview(res.data.filter((review) => review.status === ReviewStatusEnum.PUBLISHED));
        setPendingReviews(res.data.filter((review) => review.status !== ReviewStatusEnum.PUBLISHED));
      })
      .catch((e) => {
        clearData(e);
      });
  }, [filter]);

  const filteredReviews = history ? publishedReviews : pendingReviews;
  console.log(publishedReviews);
  console.log(filteredReviews);
  return (
    <div className={'pl-10'}>
      <CustomSearch searchButton={setFilter} />
      <div className={'flex ml-4 mb-12'}>
        <div className={stylesForHistory + defaultStyles} onClick={() => isHistory(true)}>
          History
        </div>
        <div className={stylesForPending + defaultStyles} onClick={() => isHistory(false)}>
          Pending
        </div>
      </div>
      {filteredReviews.map((el) => (
        <ReviewComponent
          key={el._id}
          {...el}
          possibilityToApproveAndBlock={!history}
          pendingReview={{ state: pendingReviews, setState: setPendingReviews }}
          publishedReviews={{ state: publishedReviews, setState: setPublishedReview }}
        />
      ))}
    </div>
  );
};

export default TextReviewsGrid;
