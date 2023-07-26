import React, { useState } from 'react';
import styles from '@styles/Styles.module.scss';
import { fadeAnimation } from '@styles/Animations';
import ourStoryPhoto from '@assets/aboutImages/ourStoryPhoto.svg';
import { motion } from 'framer-motion';

const OurStory = () => {
  const [showFullText, setShowFullText] = useState(false);

  return (
    <motion.div {...fadeAnimation}>
      <div className="relative bg-custom-turquoise h-48 lg:h-52 m-auto w-full">
        <h1 className={`${styles.header1} text-white text-center uppercase`}>Our Story</h1>
        <div className="top-10 text-center lg:top-16 absolute inset-x-0 flex items-center justify-center">
          <div>
            <img src={ourStoryPhoto} alt="Our Story" />
            <p className={`${styles.header2} text-gray`}>Kseniia Kondart</p>
          </div>
        </div>
      </div>
      <motion.p className={`${styles.body1} text-justify pt-40 px-6 m-auto min-h-max lg:max-w-[80vw] lg:pt-44`}>
        {showFullText
          ? 'CALOR is a footwear brand that was founded by Kseniia Kondart in July 2020 in Ukraine. The concept behind Our Brand was to empower customers to create their own shoes using a 3D online constructor and place orders.CALOR is a footwear brand that was founded by Kseniia Kondart in July 2020 in Ukraine. The concept behind Our Brand was to empower customers to create their own shoes using a 3D online constructor and place orders.'
          : 'CALOR is a footwear brand that was founded by Kseniia Kondart in July 2020 in Ukraine. The concept behind Our Brand was to empower customers to create their own shoes using a 3D online constructor and place orders.'}
      </motion.p>
      <a
        onClick={() => setShowFullText(!showFullText)}
        className="text-gray text-base underline cursor-pointer block text-center py-6 md:text-lg"
      >
        {showFullText ? 'Read Less' : 'Read More'}
      </a>
    </motion.div>
  );
};

export default OurStory;
