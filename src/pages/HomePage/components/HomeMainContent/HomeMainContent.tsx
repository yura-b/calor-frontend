import React from 'react';
import styles from '@styles/Styles.module.scss';
import homeMainImg from '@assets/images/homeMainImg.webp';
import homeSemiCircle from '@assets/images/homeSemiCircle.svg';
import homeCircle from '@assets/images/homeCircle.svg';
import Button from '@components/ui/Button';
import { motion } from 'framer-motion';
import { fadeAnimation, scaleAnimation } from '@styles/Animations';
import { processArr } from '../../helpers/data';
import { paths } from '@/routes/paths';
import HomeArrowRightIcon from '@components/ui/HomeArrowRightIcon';
import VideoGuideLink from '@components/VideoGuideLink';
import { useMediaQuery } from '@react-hook/media-query';

interface Props {
  visions?: string;
}
const HomeMainContent: React.FC<Props> = ({ visions }): React.ReactElement => {
  const isSmallerThan1800px = useMediaQuery('(max-width: 1800px)');
  const headingClass = `text-[2.4rem] leading-tight font-black sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl  ${
    isSmallerThan1800px ? '2xl:text-6xl 2xl:leading-tight' : '2xl:text-7xl 2xl:leading-tight'
  }`;
  const visionsContent = {
    __html: visions || '',
  };
  return (
    <div className="w-full bg-custom-red  lg:pt-5">
      <div
        className={`flex w-full justify-around flex-wrap items-center relative z-10  mx-auto ${styles.container} py-0`}
      >
        <div className="flex basis-full lg:basis-2/3 grow items-center gap-0 grow mb-12 lg:mb-0">
          <div className="basis-1/2  flex justify-start grow">
            <motion.p className={`${headingClass}  text-white text-right `} {...fadeAnimation}>
              DESIGN <br /> YOUR OWN <br /> SHOE
            </motion.p>
          </div>
          <motion.img
            src={homeMainImg}
            className="bg-white bg-opacity-0 basis-1/2  w-48 h-auto  sm:max-w-1/2"
            {...scaleAnimation}
            whileHover={{ rotate: 4 }}
          />
        </div>
        <div className="flex basis-1/3 justify-end  grow 2xl:basis-auto">
          <motion.p className={`${headingClass} text-custom-turquoise  text-left  hidden lg:block`} {...fadeAnimation}>
            IT’S <br /> SIMPLE AS <br />
            <div className="flex justify-between items-center max-w-[16rem]">
              1 <HomeArrowRightIcon color="#B8E4D8" /> 2 <HomeArrowRightIcon color="#B8E4D8" /> 3
            </div>
          </motion.p>
        </div>
        <motion.p
          className={`${headingClass} text-custom-turquoise text-center basis-1/3 grow  lg:hidden absolute -bottom-3 sm:-bottom-1.5`}
          {...fadeAnimation}
        >
          IT’S SIMPLE AS
        </motion.p>
      </div>
      <div className="w-full bg-custom-turquoise text-center">
        <motion.p
          className={`${headingClass}  bg-custom-turquoise text-center text-custom-red w-full lg:hidden`}
          {...fadeAnimation}
        >
          <div className="flex justify-between items-center max-w-[12rem] m-auto lg:max-w-[16rem]">
            1 <HomeArrowRightIcon color="#E22D21" /> 2 <HomeArrowRightIcon color="#E22D21" /> 3
          </div>
        </motion.p>
        <motion.div
          className={`${styles.container} flex flex-col justify-between gap-2  lg:flex-row  lg:gap-6 lg:pt-10`}
          {...fadeAnimation}
        >
          {processArr.map((action, index) => (
            <div className="text-gray text-left  flex gap-2 basis-1/3 lg:max-w-[24rem]" key={index}>
              <div className={'flex items-start gap-1 lg:gap-2 h-max'}>
                <h1 className={`${styles.header1} text-custom-red`}>{index + 1} </h1>
                <HomeArrowRightIcon
                  color="#E22D21"
                  className="w-[10px] h-[10px] sm:w-[14px] sm:h-[14px] md:w-[14px] md:h-[14px] lg:w-[16px] lg:[16px]"
                />
              </div>
              <div>
                <h1 className={`${styles.header1} mb-1 lg:mb-4`}>{action.title}</h1>
                <p className={`${styles.body1} `}>{action.content}</p>
              </div>
            </div>
          ))}
        </motion.div>
        <motion.div
          className={`${
            styles.container
          } flex lg:gap-4 justify-between lg:items-center ${'lg:border-t lg:border-t-2 lg:border-gray'} flex-wrap  text-left`}
          {...fadeAnimation}
        >
          <h1 className={`${styles.header1}   text-white lg:text-custom-red sm:basis-[25%] xl:basis-[20%] `}>
            CALOR
            <span className="hidden lg:inline">
              <br />
            </span>{' '}
            BY YOU!
          </h1>
          <div className="sm:basis-[70%] xl:basis-[50%]">
            <div dangerouslySetInnerHTML={visionsContent} className={`${styles.subtitle} mb-2`} />
            {/* <p className={styles.body1}>
              Learn how to do it in our {''}
              <span className="hidden lg:inline-block">
                <VideoGuideLink
                  color="custom-red"
                  src="https://drive.google.com/file/d/1jADBBF8ByG7HdFKs43yMMp8qWNmXi2BH/preview"
                />
                <div></div>
              </span>
              <span className="lg:hidden">Video Guide</span>
            </p> */}
          </div>
          <div className="basis-[100%] xl:basis-[25%] mt-4 lg:mt-0">
            <Button color="red" to={paths.design_shoe} className="mb-4 max-w-[360px] m-auto block">
              Design Your Shoe
            </Button>
            <Button color="gray" className="mb-4 max-w-[360px] m-auto block">
              <VideoGuideLink
                color="white"
                srcWebm={'1P02ClFpZyAz0lmIl4_eQcYyBprGobC70'}
                srcMov={'1VDnW8pSbVadGusbbxfVo4bHr2uwsGuc8'}
                srcMp4={'1OYKazc_mIxEcsXGQ7BmsxBDy3b1q3WGt'}
                className="w-full"
              />
            </Button>
            {/* <Button color="mintExtraLight" to={paths.design_bag}>
              Design Your Bag
            </Button> */}
          </div>
          {/* <div className="m-auto">
            <VideoGuideLink
              className="lg:hidden"
              src="https://drive.google.com/file/d/1Y8q7wboEBcpRffHDF_gLtUg2lQ0s7zQW/preview"
            />
          </div> */}
        </motion.div>
        <img src={homeSemiCircle} className="absolute z-1 top-36 left-0 h-56 sm:hidden" />
        <img
          src={homeCircle}
          className={`hidden sm:block absolute z-1 left-[4%] sm:h-80  sm:top-32 md:h-96 md:top-28  lg:h-64 lg:top-36 lg:left-[10%] xl:top-36 xl:h-80 ${
            isSmallerThan1800px ? '2xl:h-96 2xl:top-32' : '2xl:h-[430px] 2xl:top-44'
          }`}
          style={{ maxWidth: '100%' }}
        />
      </div>
    </div>
  );
};

export default HomeMainContent;
