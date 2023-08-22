import styles from '@styles/Styles.module.scss';
import { motion } from 'framer-motion';
import { fadeAnimation } from '@styles/Animations';
interface Props {
  whoWeAre?: {
    title: string;
    value: string;
  };
}
const WhoWeAre: React.FC<Props> = ({ whoWeAre }): React.ReactElement => {
  <h1 className={`${styles.header1} text-white text-center`}>?</h1>;
  return (
    <motion.div className="bg-custom-turquoise lg:bg-opacity-0 lg:basis-1/3" {...fadeAnimation} id="who_we_are">
      <div className={`${styles.container} lg:py-0`}>
        <h1 className={`${styles.header1} text-white text-center`}>{whoWeAre?.title}</h1>
        <p className={`${styles.body1} text-justify mt-3 lg:text-left`}>{whoWeAre?.value}</p>
      </div>
    </motion.div>
  );
};

export default WhoWeAre;
