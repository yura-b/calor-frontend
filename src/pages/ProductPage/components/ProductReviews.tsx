import Rating from '@/components/ui/Rating/Rating';
import ProductComments from './ProductComments';
import WriteReviewModal from './WriteReviewModal';
import styles from '@styles/Styles.module.scss';
import { useAppSelector } from '@/store/hooks/hooks';
import { useNavigate } from 'react-router';

const ProductReviews = ({ rating }) => {
  const { access_token } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const signInHandler = () => {
    navigate('/login');
  };

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
        {!access_token && (
          <div className="mx-auto">
            <p>Please log in to add your own review</p>
            <button
              className="bg-gray mt-2 px-12 text-white py-1 focus:text-mint hover:drop-shadow-2md hover:font-bold mx-auto block"
              onClick={signInHandler}
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductReviews;
