import styles from '@styles/Styles.module.scss';
import { motion } from 'framer-motion';
import { fadeAnimation } from '@styles/Animations';
import ReadMore from '@/components/ReadMore';
import whoWeAreArrow from '@assets/aboutImages/whoWeAreArrow.png';
interface Props {
  whoWeAre?: {
    title: string;
    value: string;
  };
}
const WhoWeAre: React.FC<Props> = ({ whoWeAre }): React.ReactElement => {
  const initialText = (whoWeAre?.value || '').split(' ').slice(0, 66).join(' ');
  const expandedText = whoWeAre?.value || '';
  <h1 className={`${styles.header1} text-white text-center`}>?</h1>;
  return (
    <motion.div
      className="bg-custom-turquoise lg:bg-opacity-0 lg:basis-[36%]  lg:flex lg:gap-2 lg:justify-between"
      {...fadeAnimation}
      id="who_we_are"
    >
      <div className={' lg:py-0 lg:basis-[56%] z-10'}>
        <h1 className={`${styles.header1} text-white lg:text-gray text-center lg:text-left mb-3 pt-6 lg:pt-0`}>
          {whoWeAre?.title}
        </h1>
        <ReadMore
          initialText={initialText}
          expandedText={expandedText}
          className={`${styles.body1}  lg:pt-0 lg:mt-0 text-justify`}
        />
        <div className="hidden lg:block mt-8">
          <img src={whoWeAreArrow} style={{ float: 'right' }}></img>
        </div>
      </div>
      <div
        className={`${styles.header1} hidden lg:flex lg:basis-[40%] uppercase  text-right lg:text-[37px] xl:text-[44px] 2xl:text-[50px] flex-col gap-3 w-full mt-10`}
      >
        <h1 className="text-mintExtraLight">calor by you!</h1>
        <h1 className="text-mintExtraLight">calor by you!</h1>
        <h1 className="text-mintExtraLight">calor by you!</h1>
        <h1 className="text-mintExtraLight">calor by you!</h1>
        <h1 className="text-mint">calor by you!</h1>
      </div>
    </motion.div>
  );
};

export default WhoWeAre;
