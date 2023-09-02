import React from 'react';
import styles from '@styles/Styles.module.scss';
import families from '@assets/images/ourShoesFor/families.png';
import familyMob from '@assets/images/ourShoesFor/familyMob.png';
import creative from '@assets/images/ourShoesFor/creative.png';
import creativeMob from '@assets/images/ourShoesFor/creativeMob.png';
import extraOrdinary from '@assets/images/ourShoesFor/extraOrdinary.png';
import extraOrdinaryMob from '@assets/images/ourShoesFor/extraOrdinaryMob.png';
import individuality from '@assets/images/ourShoesFor/individuality.png';
import individualityMob from '@assets/images/ourShoesFor/individualityMob.png';
import business from '@assets/images/ourShoesFor/business.png';
import businessMob from '@assets/images/ourShoesFor/businessMob.png';
import healthcare from '@assets/images/ourShoesFor/healthcare.png';
import healthcareMob from '@assets/images/ourShoesFor/healthcareMob.png';
import corporate from '@assets/images/ourShoesFor/corporate.png';
import corporateMob from '@assets/images/ourShoesFor/corporateMob.png';
import gift from '@assets/images/ourShoesFor/gift.png';
import giftMob from '@assets/images/ourShoesFor/giftMob.png';
import { motion } from 'framer-motion';
import { hoverOnButtonAnimation } from '@styles/Animations';
import { useMediaQuery } from '@react-hook/media-query';

const OurShoesFor: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 1023px)');
  const OurShoesFor = [
    {
      img: isMobile ? familyMob : families,
      title: 'Families',
      description: 'Design matching shoes for the whole family and create a sense of closeness and unity.',
      mt: '0px',
    },
    {
      img: isMobile ? creativeMob : creative,
      title: 'Creatives and Emotionals',
      description:
        ' Creatives and Emotionals: Unleash your creativity and become your own shoe designer. Express your unique style and emotions through custom designs.',
      mt: '0px',
    },
    {
      img: isMobile ? extraOrdinaryMob : extraOrdinary,
      title: 'The Extraordinary',
      description:
        ' Want to take it to the next level? Create shoes where each half pair is different, and stand out with an awesome and cool statement.',
      mt: '0px',
    },
    {
      img: isMobile ? businessMob : business,
      title: 'Business People',
      description:
        'Save time on shoe shopping without compromising on what you want. Our custom-made shoes are perfect for busy professionals who value convenience and style.',
      mt: '-130px',
    },
    {
      img: isMobile ? individualityMob : individuality,
      title: 'Individuality',
      description:
        'If you have specific foot needs, you`ve come to the right place. Our individual approach ensures that your unique feet are catered to with personalized designs and comfort.',
      mt: '0px',
    },
    {
      img: isMobile ? healthcareMob : healthcare,
      title: 'Healthcare Professionals',
      description:
        'Worried about foot comfort? Try our natural material shoes, crafted specifically to your measurements. Take care of your feet while looking great.',
      mt: '-130px',
    },
    {
      img: isMobile ? corporateMob : corporate,
      title: 'Corporate Clients',
      description:
        'Make a statement with a cool corporate style that reflects your business identity. With our customizable options, all your employees can have shoes in the same corporate color.',
      mt: '0px',
    },
    {
      img: isMobile ? giftMob : gift,
      title: 'Original Gift Makers',
      description:
        'Tired of generic gifts from local shops? Be the first to give your loved ones the opportunity to become the designers of their own shoes. Create a truly unique and memorable gift experience.',
      mt: '-30px',
    },
  ];
  return (
    <div className="bg-grayExtraLight">
      <div className={styles.container}>
        <h1 className={`${styles.header1} mb-4`}>Our Shoes Are For...</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                className={'w-full object-contain object-cover mx-auto h-auto  lg:sm:max-h-none'}
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
