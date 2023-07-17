import React from 'react';
import styles from '@styles/Styles.module.scss';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';
import calorByYou from '@assets/images/calorByYou.svg';
import homeCalorMade from '@assets/images/homeCalorMade.svg';
import homeCalorQuality from '@assets/images/homeCalorQuality.svg';
import homeCalorDesign from '@assets/images/homeCalorDesign.svg';
import homeCustomerCreation1 from '@assets/images/homeCustomerCreation1.svg';
import homeCustomerCreation2 from '@assets/images/homeCustomerCreation2.svg';

const HomeCalorByYou: React.FC = (): React.ReactElement => {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  const calorByYouItems = [
    {
      title: 'Made-To-Order',
      text: 'You get not only unique shoes, but also an expression of your individuality through shoes.',
      img: homeCalorMade,
    },
    {
      title: 'High Quality Material',
      text: 'We use only high-quality materials to make our sneakers: genuine Italian leather and suede, wool and fur.',
      img: homeCalorQuality,
    },
    {
      title: 'Own design',
      text: 'The main reason you are here is to try yourself as a designer of your own shoes or bag, right? So, we did a constructors for you to make it super easy!',
      img: homeCalorDesign,
    },
  ];
  const homeCustomerCreations = [
    {
      img: homeCustomerCreation1,
    },
    {
      img: homeCustomerCreation2,
    },
    {
      img: homeCustomerCreation1,
    },
    {
      img: homeCustomerCreation1,
    },
  ];
  return (
    <div className="w-full bg-white">
      <div className="relative w-screen">
        <img src={calorByYou} alt="Your Image" className="w-full" />
        <div className="absolute top-0 left-0 w-full h-full bg-custom-red opacity-80"></div>
        <div className="absolute -bottom-2 right-6">
          <h1 className="text-white text-4xl font-black sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            {'calor by you!'.toLocaleUpperCase()}
          </h1>
        </div>
      </div>
      <div className="flex flex-col justify-between  gap-4 px-6 pt-6 lg:flex-row">
        {calorByYouItems.map((calorBy, i) => (
          <div key={i} className="flex gap-4 mb-2 items-start basis-1/4">
            <img src={calorBy.img} />
            <div>
              <h2 className={styles.header2}>{calorBy.title}</h2>
              <p className={`${styles.body2} text-justify mt-1`}>{calorBy.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end pr-6">
        <Link to="" className="border-b-2 border-gray text-sm text-gray">
          Learn More
        </Link>
      </div>
      <div className="px-6 mt-4">
        <p className={styles.subtitle}>Customer Creations</p>
        <h1 className={styles.header1}>@calor_custom_sneakers</h1>
      </div>
      <div className="flex overflow-x-auto flex-row mx-auto pl-6">
        {homeCustomerCreations.map((item, i) => (
          <div className="flex justify-center items-center mr-4 my-4" key={i}>
            <div className={'w-36 grow text-gray max-w-xs h-auto'}>
              <img src={item.img} />
            </div>
          </div>
        ))}
      </div>
      <div className="px-6">
        <Button color="gray" className="w-full my-4" onClick={handleClick}>
          Follow Us
        </Button>
      </div>
    </div>
  );
};

export default HomeCalorByYou;
