import { fadeAnimation, hoverOnButtonAnimation } from '@styles/Animations';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '@styles/Styles.module.scss';
import { Link } from 'react-router-dom';

const InThePress = () => {
  const inThePressItems = [
    {
      title: 'Logo',
    },
    {
      title: 'Logo',
    },
    {
      title: 'Logo',
    },
    {
      title: 'Logo',
    },
    {
      title: 'Logo',
    },
    {
      title: 'Logo',
    },
  ];
  return (
    <motion.div {...fadeAnimation} className="container p-6" id="in_the_press">
      <h1 className={`${styles.header1} text-center mb-6`}>In The Press</h1>
      <AnimatePresence initial={false}>
        <motion.div className="flex flex-wrap gap-2 justify-around lg:justify-around">
          {inThePressItems.map((item, i) => (
            <motion.div {...hoverOnButtonAnimation} key={i} className="text-center bg-lightGray px-6 py-3">
              <Link to="#" key={i}>
                <p className={`${styles.body1} uppercase`}>{item.title}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default InThePress;
