import Review from '@/components/Review/Review';
import { motion } from 'framer-motion';
import { layoutFadeAnimation } from '@styles/Animations';

const ReviewModal = ({ onClose, review, productId, onSuccess }) => {
  return (
    <motion.div
      className="absolute bg-white shadow-lg w-full lg:w-[1024px] h-full lg:max-h-[630px] lg:rounded-md overflow-hidden"
      {...layoutFadeAnimation}
    >
      <Review title="Your review" onClose={onClose} onSuccess={onSuccess} review={review} productId={productId} />
    </motion.div>
  );
};

export default ReviewModal;
