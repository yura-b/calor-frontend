import React from 'react';
import styles from '@styles/Styles.module.scss';
import homeMainImg from '@assets/images/homeMainImg.svg';
import homeSemiCircle from '@assets/images/homeSemiCircle.svg';
import Button from '@components/ui/Button';
import { Link } from 'react-router-dom';

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
        <div className="flex basis-full lg:basis-2/3 grow pl-10 items-center gap-4 grow lg: my-6">
          <p className={`${headingClass} text-white text-right basis-1/2 lg:basis-3/5`}>
            DESIGN
            <br />
            YOUR OWN
            <br />
            SHOE
          </p>
          <img src={homeMainImg} className="basis-1/2 lg:basis-2/5 h-48 sm:h-56 md:h-64 lg:h-72 xl:h-96" />
        </div>
        <p className={`${headingClass} text-custom-turquoise basis-1/3 text-left grow hidden lg:block`}>
          IT’S <br /> SIMPLY AS <br />
          {'1  >  2 >   3'}
        </p>
        <p className={`${headingClass} text-custom-turquoise text-center basis-1/3 grow lg:hidden`}>
          {'IT’S SIMPLY AS'}
        </p>
      </div>
      <div className="w-full bg-custom-turquoise text-center px-6">
        <p className={`${headingClass}  bg-custom-turquoise text-center text-custom-red w-full lg:hidden`}>
          {'1  >  2 >    3'}
        </p>
        <div className="flex flex-col justify-around lg:flex-row mt-6 lg:max-w-[90vw] 2xl:max-w-[70vw] mx-auto lg:pt-10">
          {processArr.map((action, index) => (
            <div className="text-gray text-left w-auto">
              <h1 className={styles.header1}>
                <span className="text-custom-red">{index + 1}&gt; </span>
                <span>{action.title}</span>
              </h1>
              <p className={`${styles.body1} ml-10 my-2`}>{action.content}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-around lg:flex-row my-6 lg:max-w-[90vw] 2xl:max-w-[70vw] mx-auto lg:py-10 text-left text-gray">
          <h1 className={`${styles.header1} text-custom-red`}>
            CALOR <br /> BY YOU
          </h1>
          <div>
            <p className={`${styles.body1} font-black`}>
              Create your own sneakers and bag with a unique design that reflects your personality and style.
            </p>
            <p className={styles.body1}>
              Learn how to do it in our
              <span>
                <Link to="" className="font-bold border-b-2 border-gray my-4 mx-auto text-center w-max">
                  Video Guide
                </Link>
              </span>
            </p>
          </div>
          <div>
            <Button color="red" onClick={handleClick}>
              Design Your Shoe
            </Button>
            <Button color="mintExtraLight" onClick={handleClick}>
              Design Your Bag
            </Button>
          </div>
          <Link to="" className="font-bold border-b-2 border-gray my-4 mx-auto text-center w-max lg:hidden">
            Video Guide
          </Link>
        </div>
        <img
          src={homeSemiCircle}
          className="absolute z-1 top-11 left-0 h-64 sm:h-72 sm:top-16 md:h-76 md:top-24 lg:h-80 lg:top-20 xl:h-1/2 xl:top-16"
        />
      </div>
    </div>
  );
};

export default HomeMainContent;
