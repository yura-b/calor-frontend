import styles from '@styles/Styles.module.scss';
import { motion } from 'framer-motion';
import { fadeAnimation } from '@styles/Animations';

const WhoWeAre = () => {
  return (
    <motion.div className="bg-custom-turquoise lg:bg-opacity-0 lg:basis-1/3" {...fadeAnimation} id="who_we_are">
      <div className={`${styles.container} lg:py-0`}>
        <h1 className={`${styles.header1} text-white text-center`}>Who We Are?</h1>
        <p className={`${styles.body1} text-justify mt-3 lg:text-left`}>
          CALOR is a premium shoe brand that offers customers the unique opportunity to create their own shoes through a
          3D constructor and order them online. Our brand is built on the principles of quality, creativity, and
          customer satisfaction.
        </p>
      </div>
    </motion.div>
  );
};

export default WhoWeAre;
