import React, { useEffect, useState } from 'react';
import styles from '@styles/Styles.module.scss';
import AccountLayout from '../AccountLayout';
import MainFrame from '@/components/mainFrame';
import { Modal, Rating } from '@mui/material';
import Button from '@/components/ui/Button';
import { useAppSelector } from '@/store/hooks/hooks';
import { DateFormatter } from '@/helpers/functions/dateFormatter';
import { Square } from '@phosphor-icons/react';
import { getBoughtProducts, getUserReviews } from '@/api/products';
import shoeModel1 from '@assets/cartImages/shoeModel1.svg';
import { ProductsDto } from '@/api/dto/products.dto';
import { PostReviewDto } from '@/api/dto/review/postReview.dto';
import SuccessModal from '@/pages/AccountPage/components/Reviews/components/SuccessModal';
import ReviewModal from '@/pages/AccountPage/components/Reviews/components/ReviewModal';

const Reviews: React.FC = (): React.ReactElement => {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [review, setReview] = useState<PostReviewDto | null>(null);
  const [userReviews, setUserReviews] = useState<PostReviewDto[] | null>(null);
  const [userProducts, setUserProducts] = useState<ProductsDto[] | null>(null);
  const [productId, setProductId] = useState<string | null | undefined>(null);
  const [isReviewSuccessfullySent, setIsReviewSuccessfullySent] = useState(false);
  const { access_token } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (access_token) {
      getBoughtProducts(access_token).then((res) => {
        if (res.data) {
          const products: any = Object.values(res.data);
          setUserProducts(products);
        }
      });
      getUserReviews(access_token).then((res) => {
        if (res.data) {
          setUserReviews(res.data);
        }
      });
    }
  }, []);

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
        color = 'mint';
        break;
      case 'PENDING':
        color = 'mintLight';
        break;
      case 'CANCELED':
        color = 'custom-red';
        break;
      default:
        color = 'gray';
    }
    return color;
  };
  const statusText = (status) => {
    let text;
    switch (status) {
      case 'PUBLISHED':
        text = 'Published';
        break;
      case 'PENDING':
        text = 'Considered';
        break;
      case 'CANCELED':
        text = 'Rejected';
        break;
      default:
        text = 'Considered';
    }
    return text;
  };

  useEffect(() => {
    if (isReviewOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isReviewOpen]);

  console.log(userProducts, 'userProducts');

  return (
    <AccountLayout>
      <MainFrame title={'Reviews'} className="overflow-hidden">
        <h2 className={`${styles.header2} text-gray mt-4 ml-4`}>Your Reviews</h2>
        <div className="p-4 w-auto grid grid-cols-1 xl:grid-cols-2 gap-2 h-fit">
          {Boolean(userReviews) &&
            userReviews?.map((item: PostReviewDto, i) => (
              <div
                className={'p-4 shadow-lg  basis-[50%] min-w-[300px] grow'}
                key={i}
              >
                <div>{DateFormatter(item?.date)}</div>
                <div className="w-full flex justify-center mt-2">
                  <img src={item.photo} className=" w-full h-auto sm:w-[170px] md:w-[190px] lg:w-[190px]  " />
                </div>
                <h2 className={`${styles.body1} mt-2 font-bold`}>{item.productName}</h2>
                <Rating name="read-only" value={item.rating} readOnly />
                <h2 className="text-slate-500">{item.category}</h2>
                <h2>From ${item.price}</h2>
                <h2 className={`${styles.body1} text-${statusTextColor(item.status)} font-bold mt-3`}>Your Review</h2>
                <div className={`text-${statusTextColor(item.status)} flex items-center mt-1`}>
                  <Square size={15} weight="fill" />
                  <div className="ml-2">{statusText(item.status)}</div>
                </div>
                <div className="w-full whitespace-pre-line mt-2">{item.experience}</div>
                {item.status === 'CANCELED' && (
                  <div>
                    <div className="text-slate-500 w-full  whitespace-pre-line mt-2">
                      If you want to leave a review, you can write it again
                    </div>

                    <Button
                      color="gray"
                      className="w-full my-4 lg:block"
                      onClick={() => {
                        setReview(item);
                        setIsReviewOpen(!isReviewOpen);
                        setProductId(item?.product_id);
                      }}
                    >
                      Rewrite Review
                    </Button>
                  </div>
                )}
              </div>
            ))}
        </div>

        <h2 className={`${styles.header2} text-gray mt-4 ml-4`}>Write review</h2>
        <div className="p-4 w-full grid grid-cols-1 xl:grid-cols-2 gap-2">
          {Boolean(userProducts) &&
            userProducts?.map((item: ProductsDto, i) => (
              <div className="p-4 bg-mintExtraLight shadow-lg flex flex-col justify-center items-center" key={i}>
                <div className="w-full flex justify-center mt-2">
                  <img src={item.photos[0]} className=" w-full h-auto sm:w-[170px] md:w-[190px] lg:w-[190px]  " />
                </div>
                <h2 className={`${styles.body1} mt-2 font-bold m-auto`}>{item.title}</h2>
                <Rating name="read-only" value={item.rating} readOnly />
                <h2 className="text-slate-500">{item.subcategory}</h2>
                <h2>From ${item.price}</h2>
                <Button
                  color="gray"
                  className="w-full my-4 lg:block m-auto"
                  onClick={() => {
                    setProductId(item?._id);
                    setIsReviewOpen(!isReviewOpen);
                  }}
                >
                  Write review
                </Button>
              </div>
            ))}
        </div>
        <Modal className="flex items-center justify-center h-auto" open={isReviewOpen} onClose={closeReview}>
          <>
            {isReviewOpen && (
              <ReviewModal onClose={closeReview} review={review} productId={productId} onSuccess={openSuccessReview} />
            )}
          </>
        </Modal>
        <Modal
          className="flex items-center justify-center h-auto"
          open={isReviewSuccessfullySent}
          onClose={closeSuccessReview}
        >
          <>{isReviewSuccessfullySent && <SuccessModal onClose={closeSuccessReview} />}</>
        </Modal>
      </MainFrame>
    </AccountLayout>
  );
};

export default Reviews;
