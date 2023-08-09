import { fadeAnimation, hoverOnButtonAnimation } from '@styles/Animations';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '@styles/Styles.module.scss';
import { Link } from 'react-router-dom';
import pressImg from '@/assets/aboutImages/pressImg.svg';
import calorByYou from '@assets/images/calorByYou.svg';
import slider1 from '@assets/aboutImages/slider1.svg';

const InThePress = () => {
  const inThePressItems = [
    {
      img: calorByYou,
    },
    {
      img: slider1,
    },
    {
      img: pressImg,
    },
    {
      img: pressImg,
    },
    {
      img: pressImg,
    },
    {
      img: pressImg,
    },
  ];
  return (
    <motion.div {...fadeAnimation} className={`${styles.container} py-6`} id="in_the_press">
      <h1 className={`${styles.header1} text-center mb-6`}>In The Press</h1>
      <AnimatePresence initial={false}>
        <motion.div className="flex flex-wrap gap-2 justify-around ">
          {inThePressItems.map((item, i) => (
            <Link to="#" key={i} className="basis-[30%] lg:basis-[15%]">
              <motion.div
                {...hoverOnButtonAnimation}
                key={i}
                className="text-center bg-lightGray px-6 py-3 w-full min-h-[50px] lg:min-h-[100px] bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${item.img})` }}
              />
            </Link>
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default InThePress;
