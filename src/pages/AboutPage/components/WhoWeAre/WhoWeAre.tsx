import styles from '@styles/Styles.module.scss';
import { motion } from 'framer-motion';
import { fadeAnimation } from '@styles/Animations';
import ReadMore from '@/components/ReadMore';
interface Props {
  whoWeAre?: {
    title: string;
    value: string;
  };
}
const WhoWeAre: React.FC<Props> = ({ whoWeAre }): React.ReactElement => {
  const initialText = whoWeAre?.value.match(/[^.!]+[.!]/g)?.slice(0, 3) || '';
  const expandedText = whoWeAre?.value || '';
  <h1 className={`${styles.header1} text-white text-center`}>?</h1>;
  return (
    <motion.div className="bg-custom-turquoise lg:bg-opacity-0 lg:basis-[36%]" {...fadeAnimation} id="who_we_are">
      <div className={`${styles.container} lg:py-0`}>
        <h1 className={`${styles.header1} text-white text-center mb-3`}>{whoWeAre?.title}</h1>
        <ReadMore
          initialText={initialText}
          expandedText={expandedText}
          className={`${styles.body1}  lg:pt-0 lg:mt-0 text-justify`}
        />
      </div>
    </motion.div>
  );
};

export default WhoWeAre;
