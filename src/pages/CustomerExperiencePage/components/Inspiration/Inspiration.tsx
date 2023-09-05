import React from 'react';
import styles from '@styles/Styles.module.scss';
import inspiration1 from '@images/inspiration/inspiration1.svg';
import inspiration2 from '@images/inspiration/inspiration2.svg';
import inspiration3 from '@images/inspiration/inspiration3.svg';
import inspiration4 from '@images/inspiration/inspiration4.svg';

const Inspiration: React.FC = () => {
  const homeCustomerCreations = [
    {
      img: inspiration1,
    },
    {
      img: inspiration2,
    },
    {
      img: inspiration3,
    },
    {
      img: inspiration4,
    },
  ];
  return (
    <div className="bg-custom-turquoise">
      <div className={styles.container}>
        <h1 className={styles.header1}>Inspiration</h1>
        <div className="flex justify-between overflow-x-auto flex-row gap-2 mx-auto lg:gap-10">
          {homeCustomerCreations.map((item, i) => (
            <div className="flex justify-center items-center lg:basis-1/5  my-4" key={i}>
              <div className={'w-36 lg:w-full'}>
                <img src={item.img} className="w-full object-contain object-cover h-full mx-auto z-10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inspiration;
