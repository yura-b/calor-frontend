import styles from '@styles/Styles.module.scss';
import { fadeAnimation } from '@styles/Animations';
import ksenia from '@assets/aboutImages/ksenia.png';
import { motion } from 'framer-motion';
import ReadMore from '@/components/ReadMore';

const OurStory = () => {
  const initialText =
    'CALOR is a footwear brand that was founded by Kseniia Kondart in July 2020 in Ukraine. The concept behind Our Brand was to empower customers to create their own shoes using a 3D online constructor and place orders.';
  const expandedText =
    'CALOR is a footwear brand that was founded by Kseniia Kondart in July 2020 in Ukraine. The concept behind Our Brand was to empower customers to create their own shoes using a 3D online constructor and place orders.CALOR is a footwear brand that was founded by Kseniia Kondart in July 2020 in Ukraine. The concept behind Our Brand was to empower customers to create their own shoes using a 3D online constructor and place orders.The concept behind Our Brand was to empower customers to create their own shoes using a 3D online constructor and place orders.CALOR is a footwear brand that was founded by Kseniia Kondart in July 2020 in Ukraine. The concept behind Our Brand was to empower customers to create their own shoes using a 3D online constructor and place orders.The concept behind Our Brand was to empower customers to create their own shoes using a 3D online constructor and place orders.CALOR is a footwear brand that was founded by Kseniia Kondart in July 2020 in Ukraine.';
  return (
    <motion.div {...fadeAnimation} id="our_story" className="lg:basis-2/3 lg:flex r">
      <div className="relative bg-custom-turquoise h-48 m-auto w-full lg:m-0 lg:basis-1/2">
        <h1 className={`${styles.header1} text-white text-center lg:hidden`}>Our Story</h1>
        <div
          className={`${styles.container}  text-center absolute inset-x-0 flex items-center justify-center lg:relative lg:py-0 lg:-mt-6`}
        >
          <div className="relative">
            <img
              src={ksenia}
              alt="Our Story"
              className="rounded-full  border  border-white border-[12px] border-opacity-70 object-contain object-cover w-[16rem] h-[16rem] "
            />
            <p className={`${styles.header2} text-gray lg:mt-4`}>Kseniia Kondart</p>
            <div className="absolute top-2 right-0 w-[4rem] h-[4rem] rounded-full bg-white opacity-70"></div>
          </div>
        </div>
      </div>
      <div className="lg:basis-3/5">
        <h1 className={`${styles.header1} text-white text-center lg:pb-3 `}>Our Story</h1>
        <ReadMore
          initialText={initialText}
          expandedText={expandedText}
          className={`${styles.body1} pt-32 lg:pt-0 text-justify lg:text-left`}
        />
      </div>
    </motion.div>
  );
};

export default OurStory;
