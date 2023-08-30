import React from 'react';
import styles from '@styles/Styles.module.scss';
import Button from '@/components/ui/Button';
import homeCustomerCreation1 from '@assets/images/homeCustomerCreation1.svg';
import homeCustomerCreation2 from '@assets/images/homeCustomerCreation2.svg';

const CustomerCreations: React.FC = (): React.ReactElement => {
  const handleClick = () => {
    window.open('https://www.instagram.com/calor_custom_sneakers/', '_blank');
  };

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
    {
      img: homeCustomerCreation1,
    },
  ];

  return (
    <div className={styles.container}>
      <p className={styles.subtitle}>Customer Creations</p>
      <div className="flex justify-between items-center gap-4">
        <h1 className={'text-2xl font-black text-gray lg:text-3xl xl:text-4xl'}>@calor_custom_sneakers</h1>
        <Button color="gray" className="w-full my-4 hidden lg:block" onClick={handleClick}>
          Follow Us
        </Button>
      </div>
      <div className="flex overflow-x-auto flex-row gap-2 mx-auto lg:gap-10">
        {homeCustomerCreations.map((item, i) => (
          <div className="flex justify-center items-center lg:basis-1/5  my-4" key={i}>
            <div className={'w-36  text-gray lg:w-full '}>
              <img src={item.img} className="w-full object-contain object-cover h-full mx-auto " />
            </div>
          </div>
        ))}
      </div>
      <Button color="gray" className="w-full my-4 lg:hidden" onClick={handleClick}>
        Follow Us
      </Button>
    </div>
  );
};

export default CustomerCreations;
