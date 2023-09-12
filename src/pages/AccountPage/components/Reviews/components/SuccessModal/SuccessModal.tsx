import { motion } from 'framer-motion';
import { layoutFadeAnimation } from '@styles/Animations';

import ReviewHeader from '@/components/Review/ReviewHeader';

const SuccessModal = ({ onClose }) => {
  return (
    <motion.div
      className="absolute bg-white shadow-lg w-full lg:w-[369px] h-full lg:max-h-[150px] lg:rounded-md overflow-hidden"
      {...layoutFadeAnimation}
    >
      <div className="font-poppins h-full flex flex-col">
        <div className="flex-1 overflow-y-auto md:my-0">
          <ReviewHeader title="Your review" onClose={onClose} />
          <h2 className="p-4">Your review will be reviewed and posted on our website soon.</h2>
        </div>
      </div>
    </motion.div>
  );
};

export default SuccessModal;
