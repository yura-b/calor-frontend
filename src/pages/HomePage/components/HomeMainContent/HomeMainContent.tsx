import React from 'react';
import styles from '@styles/Styles.module.scss';
import homeMainImg from '@assets/images/homeMainImg.png';
import homeSemiCircle from '@assets/images/homeSemiCircle.svg';
import Button from '@components/ui/Button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeAnimation, scaleAnimation } from '@styles/Animations';
import AnimatedText from '@/helpers/animations/animations';

const HomeMainContent: React.FC = (): React.ReactElement => {
  const headingClass = 'text-4xl font-black leading-tight sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:7xl';
  const processArr = [
    {
      title: 'DESIGN',
      content: 'Make a unique design of your shoes with the help of an online designer.',
    },
    {
      title: 'MANUFACTURE',
      content: 'We produce shoes according to your design and foot sizes in 5-7 working days.',
    },
    {
      title: 'DELIVERY',
      content: 'We pack and send your calories to the nearest post office in the world..',
    },
  ];

  const handleClick = () => {
    console.log('Button clicked!');
  };
  return (
    <div className="w-full bg-custom-red relative">
      <div className="flex w-full justify-around flex-wrap items-center relative z-10 2xl:max-w-[86vw] mx-auto">
        <div className="flex basis-full lg:basis-2/3 grow px-6 items-center gap-4 grow">
          <motion.p className={`${headingClass}  text-white text-right basis-1/2 lg:basis-3/5`} {...fadeAnimation}>
            <AnimatedText text="DESIGN" />
            <br />
            <AnimatedText text="YOUR OWN" />
            <br />
            <AnimatedText text="SHOE" />
          </motion.p>
          <motion.img
            src={homeMainImg}
            className="bg-white bg-opacity-0 basis-1/2 lg:basis-2/5 w-48 h-auto  sm:max-w-1/2"
            {...scaleAnimation}
            whileHover={{ rotate: 4 }}
          />
        </div>
        <motion.p
          className={`${headingClass} text-custom-turquoise basis-1/3 text-left grow hidden lg:block`}
          {...fadeAnimation}
        >
          <AnimatedText text="IT’S" />
          <br />
          <AnimatedText text="SIMPLY AS" />
          <br />
          <AnimatedText text="1  >  2 >   3" />
        </motion.p>
        <motion.p
          className={`${headingClass} text-custom-turquoise text-center basis-1/3 grow lg:hidden`}
          {...fadeAnimation}
        >
          <AnimatedText text="IT’S SIMPLY AS" />
        </motion.p>
      </div>
      <div className="w-full bg-custom-turquoise text-center px-6">
        <motion.p
          className={`${headingClass}  bg-custom-turquoise text-center text-custom-red w-full lg:hidden`}
          {...fadeAnimation}
        >
          <AnimatedText text="1 > 2 > 3" />
        </motion.p>
        <motion.div
          className="flex flex-col justify-around lg:flex-row mt-6 lg:max-w-[90vw] 2xl:max-w-[70vw] mx-auto lg:pt-10"
          {...fadeAnimation}
        >
          {processArr.map((action, index) => (
            <div className="text-gray text-left w-auto" key={index}>
              <h1 className={styles.header1}>
                <span className="text-custom-red">{index + 1}&gt; </span>
                <span>{action.title}</span>
              </h1>
              <p className={`${styles.body1} ml-10 my-2 lg:ml-16`}>{action.content}</p>
            </div>
          ))}
        </motion.div>
        <motion.div
          className={`flex flex-col justify-between ${'lg:border-t lg:border-t-2 lg:border-white'} lg:flex-row my-6 lg:max-w-[90vw] 2xl:max-w-[70vw] mx-auto lg:py-10 text-left`}
          {...fadeAnimation}
        >
          <h1 className={`${styles.header1} ${'text-white lg:text-custom-red'} lg:basis-auto`}>
            CALOR
            <span className="hidden lg:inline">
              <br />
            </span>{' '}
            BY YOU!
          </h1>
          <div className="lg:basis-3/5">
            <p className={`${styles.body1} font-black`}>
              Create your own sneakers and bag with a unique design that reflects your personality and style.
            </p>
            <p className={styles.body1}>
              Learn how to do it in our {''}
              <span className="hidden lg:inline-block">
                <Link to="" className="border-b-2 border-custom-red my-4 mx-auto text-center text-custom-red w-max">
                  Video Guide
                </Link>
              </span>
              <span className=" lg:hidden">Video Guide</span>
            </p>
          </div>
          <div className="lg:basis-auto">
            <Button color="red" onClick={handleClick}>
              Design Your Shoe
            </Button>
            <Button color="mintExtraLight" onClick={handleClick}>
              Design Your Bag
            </Button>
          </div>
          <Link to="" className="border-b-2 border-gray my-4 mx-auto text-center w-max lg:hidden">
            Video Guide
          </Link>
        </motion.div>
        <img
          src={homeSemiCircle}
          className="absolute z-1 top-8 left-0 h-64 sm:h-72 sm:top-16 md:h-76 md:top-24 lg:h-76 lg:top-12 xl:h-1/2"
        />
      </div>
    </div>
  );
};

export default HomeMainContent;
