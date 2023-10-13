import React, { useEffect, useState } from 'react';
import CustomSearch from '@components/admin/CustomSearch.tsx';
import { getAllReviews } from '@/api/reviews.ts';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import { useCleanUserDataAndNavigateToLogin } from '@/hooks/CleanUserData.ts';
import { Review, ReviewStatusEnum } from '@/constants/interfaces/review.ts';
import ReviewComponent from '@pages/admin/reviews/textReviews/components/ReviewComponent.tsx';
import Navigation from '@components/admin/Navigation.tsx';
import { loading, loadingFinished } from '@/store/reducers/StatusReducer.ts';

const array = [ReviewStatusEnum.CANCELED, ReviewStatusEnum.PUBLISHED, ReviewStatusEnum.PENDING];

const TextReviewsGrid = () => {
  const { access_token } = useAppSelector((state) => state.user);
  const clearData = useCleanUserDataAndNavigateToLogin();

  const [selectedReviews, setSelectedReviews] = useState<string>(ReviewStatusEnum.PENDING);
  const [filter, setFilter] = useState('');
  const dispatch = useAppDispatch();

  const [publishedReviews, setPublishedReview] = useState<Review[]>([]);
  const [pendingReviews, setPendingReviews] = useState<Review[]>([]);
  const [canceledReviews, setCanceledReview] = useState<Review[]>([]);

  useEffect(() => {
    if (!access_token) return;
    dispatch(loading());
    getAllReviews(access_token, filter)
      .then((res) => {
        setPublishedReview(res.data.filter((review: Review) => review.status === ReviewStatusEnum.PUBLISHED));
        setPendingReviews(res.data.filter((review: Review) => review.status === ReviewStatusEnum.PENDING));
        setCanceledReview(res.data.filter((review: Review) => review.status === ReviewStatusEnum.CANCELED));
      })
      .catch((e) => {
        clearData(e);
      });

    dispatch(loadingFinished());
  }, [filter]);

  if (!publishedReviews || !canceledReviews || !pendingReviews) return;

  const reviewNavigation = {
    [ReviewStatusEnum.CANCELED]: canceledReviews,
    [ReviewStatusEnum.PUBLISHED]: publishedReviews,
    [ReviewStatusEnum.PENDING]: pendingReviews,
  };

  return (
    <div className={'pl-10'}>
      <CustomSearch searchButton={setFilter} />
      <div className={'flex ml-4 mb-12'}>
        <Navigation setState={setSelectedReviews} state={selectedReviews} array={array} />
      </div>
      {reviewNavigation[selectedReviews]?.length === 0 ? (
        <p>Review list is empty</p>
      ) : (
        reviewNavigation[selectedReviews]?.map((el) => (
          <ReviewComponent
            key={el._id}
            {...el}
            onlyForReview={selectedReviews === ReviewStatusEnum.CANCELED}
            possibilityToApproveAndBlock={selectedReviews === ReviewStatusEnum.PENDING}
            pendingReview={{ state: pendingReviews, setState: setPendingReviews }}
            publishedReviews={{ state: publishedReviews, setState: setPublishedReview }}
          />
        ))
      )}
    </div>
  );
};

export default TextReviewsGrid;
