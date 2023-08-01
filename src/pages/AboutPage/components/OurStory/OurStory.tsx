import styles from '@styles/Styles.module.scss';
import { fadeAnimation } from '@styles/Animations';
import ourStoryPhoto from '@assets/aboutImages/ourStoryPhoto.svg';
import { motion } from 'framer-motion';
import ReadMore from '@/components/ReadMore';

const OurStory = () => {
  const initialText =
    'CALOR is a footwear brand that was founded by Kseniia Kondart in July 2020 in Ukraine. The concept behind Our Brand was to empower customers to create their own shoes using a 3D online constructor and place orders.';
  const expandedText =
    'CALOR is a footwear brand that was founded by Kseniia Kondart in July 2020 in Ukraine. The concept behind Our Brand was to empower customers to create their own shoes using a 3D online constructor and place orders.CALOR is a footwear brand that was founded by Kseniia Kondart in July 2020 in Ukraine. The concept behind Our Brand was to empower customers to create their own shoes using a 3D online constructor and place orders.The concept behind Our Brand was to empower customers to create their own shoes using a 3D online constructor and place orders.CALOR is a footwear brand that was founded by Kseniia Kondart in July 2020 in Ukraine. The concept behind Our Brand was to empower customers to create their own shoes using a 3D online constructor and place orders.The concept behind Our Brand was to empower customers to create their own shoes using a 3D online constructor and place orders.CALOR is a footwear brand that was founded by Kseniia Kondart in July 2020 in Ukraine. The concept behind Our Brand was to empower customers to create their own shoes using a 3D online constructor and place orders.The concept behind Our Brand was to empower customers to create their own shoes using a 3D online constructor and place orders.CALOR is a footwear brand that was founded by Kseniia Kondart in July 2020 in Ukraine. The concept behind Our Brand was to empower customers to create their own shoes using a 3D online constructor and place orders.The concept behind Our Brand was to empower customers to create their own shoes using a 3D online constructor and place orders.CALOR is a footwear brand that was founded by Kseniia Kondart in July 2020 in Ukraine. The concept behind Our Brand was to empower customers to create their own shoes using a 3D online constructor and place orders.';
  return (
    <motion.div {...fadeAnimation} id="our_story">
      <div className="relative bg-custom-turquoise h-48 lg:h-52 m-auto w-full pt-2">
        <h1 className={`${styles.header1} text-white text-center`}>Our Story</h1>
        <div className="top-10 text-center lg:top-16 absolute inset-x-0 flex items-center justify-center container">
          <div>
            <img src={ourStoryPhoto} alt="Our Story" />
            <p className={`${styles.header2} text-gray`}>Kseniia Kondart</p>
          </div>
        </div>
      </div>
      <ReadMore initialText={initialText} expandedText={expandedText} className={`${styles.body1} pt-40 lg:pt-44`} />
    </motion.div>
  );
};

export default OurStory;
