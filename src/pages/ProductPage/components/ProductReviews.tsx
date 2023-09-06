import Rating from '@/components/ui/Rating/Rating';
import ProductComments from './ProductComments';
import WriteReviewModal from './WriteReviewModal';
import styles from '@styles/Styles.module.scss';
import { useAppSelector } from '@/store/hooks/hooks';

const ProductReviews = ({ rating }) => {
  const { access_token } = useAppSelector((state) => state.user);
  return (
    <>
      <h2 className={styles.header1}>Reviews</h2>
      <div className="flex flex-col justify-center items-center gap-4">
        {/* Product Rating */}
        <Rating rating={rating} includeTitle={true} readOnly={true} />
        {/* Product Comments */}
        <ProductComments />
        {/* Leave a Comment */}
        {access_token && <WriteReviewModal />}
      </div>
    </>
  );
};

export default ProductReviews;
