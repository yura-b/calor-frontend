import styles from '@styles/Styles.module.scss';
import { fadeAnimation } from '@styles/Animations';
import ourStoryPhoto from '@assets/aboutImages/ourStoryPhoto.svg';
import { motion } from 'framer-motion';
import ReadMore from '@/components/ReadMore';

const OurStory = () => {
  const initialText =
    'CALOR is a footwear brand that was founded by Kseniia Kondart in July 2020 in Ukraine. The concept behind Our Brand was to empower customers to create their own shoes using a 3D online constructor and place orders.';
  const expandedText =
    'CALOR is a footwear brand that was founded by Kseniia Kondart in July 2020 in Ukraine. The concept behind Our Brand was to empower customers to create their own shoes using a 3D online constructor and place orders.CALOR is a footwear brand that was founded by Kseniia Kondart in July 2020 in Ukraine. The concept behind Our Brand was to empower customers to create their own shoes using a 3D online constructor and place orders.The concept behind Our Brand was to empower customers to create their own shoes using a 3D online constructor and place orders.CALOR is a footwear brand that was founded by Kseniia Kondart in July 2020 in Ukraine. The concept behind Our Brand was to empower customers to create their own shoes using a 3D online constructor and place orders.The concept behind Our Brand was to empower customers to create their own shoes using a 3D online constructor and place orders.CALOR is a footwear brand that was founded by Kseniia Kondart in July 2020 in Ukraine.';
  return (
    <motion.div {...fadeAnimation} id="our_story" className="lg:basis-2/3 lg:flex lg:items-center">
      <div className="relative bg-custom-turquoise h-48 m-auto w-full lg:m-0 lg:basis-1/2">
        <h1 className={`${styles.header1} text-white text-center lg:hidden`}>Our Story</h1>
        <div
          className={`${styles.container}  text-center pt-0  absolute inset-x-0 flex items-center justify-center lg:relative lg:py-0 lg:-mt-16`}
        >
          <div>
            <img src={ourStoryPhoto} alt="Our Story" />
            <p className={`${styles.header2} text-gray lg:mt-4`}>Kseniia Kondart</p>
          </div>
        </div>
      </div>
      <div className="lg:basis-3/5">
        <h1 className={`${styles.header1} text-white text-center lg:pb-3 `}>Our Story</h1>
        <ReadMore initialText={initialText} expandedText={expandedText} className={`${styles.body1} pt-40 lg:pt-0`} />
      </div>
    </motion.div>
  );
};

export default OurStory;
