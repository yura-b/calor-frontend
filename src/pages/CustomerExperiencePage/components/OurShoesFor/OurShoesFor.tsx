import React from 'react';
import styles from '@styles/Styles.module.scss';
import families from '@assets/images/ourShoesFor/families.svg';
import creative from '@assets/images/ourShoesFor/creative.svg';
import extraOrdinary from '@assets/images/ourShoesFor/extraOrdinary.svg';
import individuality from '@assets/images/ourShoesFor/individuality.svg';
import { motion } from 'framer-motion';
import { hoverOnButtonAnimation } from '@styles/Animations';

const OurShoesFor: React.FC = () => {
  const OurShoesFor = [
    {
      img: families,
      title: 'Families',
      description: 'Design matching shoes for the whole family and create a sense of closeness and unity.',
      mt: '0px',
    },
    {
      img: creative,
      title: 'Creatives and Emotionals',
      description: 'Design matching shoes for the whole family and create a sense of closeness and unity.',
      mt: '0px',
    },
    {
      img: extraOrdinary,
      title: 'The Extraordinary',
      description: 'Design matching shoes for the whole family and create a sense of closeness and unity.',
      mt: '0px',
    },
    {
      img: creative,
      title: 'Business People',
      description: 'Design matching shoes for the whole family and create a sense of closeness and unity.',
      mt: '-130px',
    },
    {
      img: individuality,
      title: 'Individuality',
      description:
        'Design matching shoes for the whole family and create a sense of closeness and unity. Design matching shoes for the whole family and create a sense of closeness and unity.',
      mt: '0px',
    },
    {
      img: creative,
      title: 'Healthcare Professionals',
      description: 'Design matching shoes for the whole family and create a sense of closeness and unity.',
      mt: '-130px',
    },
    {
      img: families,
      title: 'Corporate Clients',
      description: 'Design matching shoes for the whole family and create a sense of closeness and unity.',
      mt: '0px',
    },
    {
      img: creative,
      title: 'Original Gift Makers',
      description: 'Design matching shoes for the whole family and create a sense of closeness and unity.',
      mt: '0px',
    },
    {
      img: extraOrdinary,
      title: '................',
      description: 'Design matching shoes for the whole family and create a sense of closeness and unity.',
      mt: '0px',
    },
  ];
  return (
    <div className="bg-grayExtraLight">
      <div className={styles.container}>
        <h1 className={`${styles.header1} mb-4`}>Our Shoes Are For...</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {OurShoesFor.map((item, index) => (
            <motion.div
              key={index}
              className={'relative'}
              style={{ marginTop: window.innerWidth >= 1024 ? item.mt : '' }}
              {...hoverOnButtonAnimation}
            >
              <img
                src={item.img}
                alt={`Image ${index + 1}`}
                className={
                  'w-full object-contain object-cover mx-auto h-auto max-h-[360px]  sm:max-h-[460px] lg:sm:max-h-none'
                }
              />
              <p className="font-bold mt-4">{item.title}</p>
              <p>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurShoesFor;
