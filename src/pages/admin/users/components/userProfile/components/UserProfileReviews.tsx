import React from 'react';
import { Review } from '@/constants/interfaces/review.ts';
import ReviewComponent from '@pages/admin/reviews/textReviews/components/ReviewComponent.tsx';

const UserProfileReviews: React.FC<{ reviews: Review[] }> = ({ reviews }) => {
  if (reviews.length === 0) {
    return <div>This user has not posted a review yet</div>;
  }
  return (
    <div>
      {reviews.map((review) => {
        return (
          <ReviewComponent key={review._id} {...review} onlyForReview={true} possibilityToApproveAndBlock={false} />
        );
      })}
    </div>
  );
};

export default UserProfileReviews;
