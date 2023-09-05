import React, { memo } from 'react';
import { Review } from '@/constants/interfaces/review.ts';
import StarRating from '@components/ui/StarRating';
import { DateFormatter } from '@/helpers/functions/dateFormatter.ts';
import CustomButton from '@components/button/CustomButton.tsx';
import { approveReview, deleteReview } from '@/api/reviews.ts';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import { HttpStatusCode } from 'axios';
import IsRegistered from '@components/admin/IsRegistered.tsx';
import { blockUser } from '@/api/users.ts';
import { showMessage } from '@/store/reducers/StatusReducer.ts';
import { Role } from '@/constants/enums/role.enum.ts';

interface IProps extends Review {
  possibilityToApproveAndBlock: boolean;
  onlyForReview?: boolean;
  publishedReviews?: ReviewsState;
  pendingReview?: ReviewsState;
}

interface ReviewsState {
  state: Review[];
  setState: React.Dispatch<React.SetStateAction<Review[]>>;
}

const ReviewComponent: React.FC<IProps> = ({
                                             _id,
                                             photo,
                                             product_id,
                                             user_id,
                                             status,
                                             date,
                                             firstName,
                                             secondName,
                                             experience,
                                             isUserRegistered,
                                             rating,
                                             email,
                                             possibilityToApproveAndBlock,
                                             publishedReviews,
                                             pendingReview,
                                             onlyForReview = false
                                           }) => {


  const { access_token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();


  if (!access_token) return <></>;

  const removeReview = () => {
    pendingReview?.setState((prev) => {
      return prev.filter((el) => el._id !== _id);
    });
    publishedReviews?.setState((prev) => {
      return prev.filter((el) => el._id !== _id);
    });
  };
  const publicHandler = () => {
    approveReview(access_token, _id).then((res) => {
      if (res.status === HttpStatusCode.Ok) {
        removeReview();
        publishedReviews?.setState((prevState) => {
          return [
            ...prevState,
            {
              _id,
              date,
              isUserRegistered,
              firstName,
              secondName,
              experience,
              rating,
              email,
              status,
              photo,
              product_id,
              user_id
            }
          ];
        });
      }
    });
  };
  const role = isUserRegistered ? Role.USER : Role.GUEST;
  const blockUserHandler = (user_id: string) => {
    blockUser(access_token, user_id).then(() => {
      dispatch(showMessage('user was successfully blocked'));
    });
  };

  const deleteHandler = () => {
    deleteReview(access_token, _id).then((res) => {
      if (res.status === HttpStatusCode.Ok) {
        removeReview();
      }
    });
  };

  return (
    <div className={'flex flex-col gap-5 w-full mb-6'}>
      <div className={'flex flex-row gap-5 items-baseline'}>
        <p className={'underline font-bold'}>{firstName + ' ' + secondName}</p>
        <p>
          <IsRegistered role={role} />
        </p>
      </div>
      <p>{email}</p>
      <div className={'flex flex-row gap-5 items-baseline'}>
        <StarRating rating={rating} />
        <p>{DateFormatter(date)}</p>
      </div>
      <p>{experience}</p>

      <div>
        {photo && <img className={'w-[150px]'} src={photo} alt="" />}
      </div>
      {!onlyForReview && (
        <div className={'relative mx-auto flex flex-row gap-8'}>
          {possibilityToApproveAndBlock &&
            <CustomButton title={'Block User'} bgColor={'red'} handler={() => blockUserHandler(user_id)} />}
          <CustomButton title={'Delete Review'} handler={deleteHandler} bgColor={'red'} />
          {possibilityToApproveAndBlock && (
            <CustomButton title={'Public Review'} handler={publicHandler} bgColor={'black'} />
          )}
        </div>
      )}
      <hr />
    </div>
  );
};

export default memo(ReviewComponent);
