import styles from '@styles/Styles.module.scss';
import { fadeAnimation } from '@styles/Animations';
import ksenia from '@assets/aboutImages/ksenia.png';
import { motion } from 'framer-motion';
import ReadMore from '@/components/ReadMore';
import ourStoryArrow from '@/assets/aboutImages/ourStoryArrow.png';

interface Props {
  ourStory?: {
    title: string;
    value: string;
  };
}
const OurStory: React.FC<Props> = ({ ourStory }): React.ReactElement => {
  const initialText = ourStory?.value.match(/[^.!]+[.!]/g)?.slice(0, 3) || '';
  const expandedText = ourStory?.value || '';
  return (
    <motion.div
      {...fadeAnimation}
      id="our_story"
      className="lg:basis-2/3 lg:flex xl:pb-4 lg:gap-10 lg:justify-between  relative z-10"
    >
      <div className="relative bg-custom-turquoise lg:bg-transparent h-48 m-auto w-full lg:m-0 lg:basis-[20%]">
        <h1 className={`${styles.header1} text-white  text-center  lg:hidden`}>{ourStory?.title}</h1>
        <div
          className={`${styles.container} z-10 lg:bg-transparent text-center absolute inset-x-0 flex items-center justify-center lg:justify-start lg:relative lg:py-0 lg:-mt-6  lg:bg-transparent`}
        >
          <div className="relative lg:min-w-[300px] lg:bg-transparent">
            <img
              src={ksenia}
              alt="Our Story"
              className="rounded-full  border  border-white border-[12px] border-opacity-70 object-contain object-cover w-[16rem] h-[16rem] "
            />
            <p className={`${styles.header2} text-gray lg:mt-4 lg:mr-10`}>Kseniia Kondrat</p>
            <div className="absolute top-2 right-0 w-[4rem] h-[4rem] rounded-full bg-white opacity-70"></div>
          </div>
        </div>
      </div>
      <div className="my-auto hidden lg:block">
        <img src={ourStoryArrow} />
      </div>
      <div className=" lg:flex lg:items-center">
        <div>
          <h1 className={`${styles.header1} text-gray text-center lg:text-left lg:pb-3 z-20`}>{ourStory?.title}</h1>
          <ReadMore
            initialText={initialText}
            expandedText={expandedText}
            className={`${styles.body1} pt-32 lg:pt-0 text-justify`}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default OurStory;
