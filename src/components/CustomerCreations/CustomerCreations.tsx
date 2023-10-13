import React from 'react';
import styles from '@styles/Styles.module.scss';
import Button from '@/components/ui/Button';
import creation1 from '@assets/images/customerCreations/creation1.jpg';
import creation2 from '@assets/images/customerCreations/creation2.jpg';
import creation3 from '@assets/images/customerCreations/creation3.jpg';
import creation4 from '@assets/images/customerCreations/creation4.jpg';
import creation5 from '@assets/images/customerCreations/creation5.jpg';

const CustomerCreations: React.FC = (): React.ReactElement => {
  const handleClick = () => {
    window.open('https://www.instagram.com/calorshoe', '_blank');
  };

  const homeCustomerCreations = [
    {
      img: creation1,
    },
    {
      img: creation2,
    },
    {
      img: creation3,
    },
    {
      img: creation4,
    },
    {
      img: creation5,
    },
  ];

  return (
    <div className={styles.container}>
      <p className={styles.subtitle}>Customer Creations</p>
      <div className="flex justify-between items-center gap-4">
        <h1 className={'text-2xl font-black text-gray lg:text-3xl xl:text-4xl'}>@calorshoe</h1>
        <Button color="gray" className="w-full my-4 hidden lg:block" onClick={handleClick}>
          Follow Us
        </Button>
      </div>
      <div className="flex overflow-x-auto flex-row gap-2 mx-auto lg:gap-10">
        {homeCustomerCreations.map((item, i) => (
          <div className="flex justify-center items-center lg:basis-1/5  my-4" key={i}>
            <div className={'w-36  text-gray lg:w-full '}>
              <img src={item.img} className="w-full object-contain object-cover max-h-[260px] min-h-[220px] mx-auto " />
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
