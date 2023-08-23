import styles from '@styles/Styles.module.scss';
import { fadeAnimation } from '@styles/Animations';
import ksenia from '@assets/aboutImages/ksenia.png';
import { motion } from 'framer-motion';
import ReadMore from '@/components/ReadMore';

interface Props {
  ourStory?: {
    title: string;
    value: string;
  };
}
const OurStory: React.FC<Props> = ({ ourStory }): React.ReactElement => {
  const initialText = ourStory?.value.match(/[^.!]+[.!]/g)?.slice(0, 2) || '';
  const expandedText = ourStory?.value || '';
  return (
    <motion.div {...fadeAnimation} id="our_story" className="lg:basis-2/3 lg:flex r">
      <div className="relative bg-custom-turquoise h-48 m-auto w-full lg:m-0 lg:basis-1/2">
        <h1 className={`${styles.header1} text-white text-center lg:hidden`}>{ourStory?.title}</h1>
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
        <h1 className={`${styles.header1} text-white text-center lg:pb-3 `}>{ourStory?.title}</h1>
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
