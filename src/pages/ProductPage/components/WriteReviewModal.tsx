import { useState, useEffect } from 'react';
import SuccessModal from '@/pages/AccountPage/components/Reviews/components/SuccessModal';
import ReviewModal from '@/pages/AccountPage/components/Reviews/components/ReviewModal';
import { Modal } from '@mui/material';
import { ProductsDto } from '@/api/dto/products.dto';
import { PostReviewDto } from '@/api/dto/review/postReview.dto';
import Button from '@/components/ui/Button';
import { useAppSelector } from '@/store/hooks/hooks';
import { getBoughtProducts, getUserReviews } from '@/api/products';
import { useParams } from 'react-router';

const WriteReviewModal = () => {
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
  const { id } = useParams();
  return (
    <>
      <Button
        color="gray"
        className="my-4 lg:block max-w-[360px]"
        onClick={() => {
          setProductId(id);
          setIsReviewOpen(!isReviewOpen);
        }}
      >
        Write review
      </Button>
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
    </>
  );
};

export default WriteReviewModal;
