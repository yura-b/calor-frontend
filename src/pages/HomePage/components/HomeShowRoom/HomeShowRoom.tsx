import React from 'react';
import styles from '@styles/Styles.module.scss';
import Button from '@/components/ui/Button';
import homeRoomSircle from '@assets/images/homeRoomSircle.svg';
import { lookModels } from '../../helpers/data';

const HomeShowRoom: React.FC = (): React.ReactElement => {
  const handleClick = () => {
    console.log('Button clicked!');
  };
  return (
    <div className="w-full bg-custom-turquoise px-6 py-4">
      <p className={`${styles.subtitle}`}>Showroom</p>
      <h2 className={`${styles.header1} uppercase`}>Perfect Fit</h2>
      <p className={`${styles.body1} text-justify mt-4`}>
        Our experienced team of footwear specialists will guide you through the measurement process, taking precise
        measurements of your feet to guarantee a comfortable and flawless fit.
      </p>
      <Button color="gray" className="w-full my-6" onClick={handleClick}>
        Make Appointment
      </Button>
      <h2 className={`${styles.header1} uppercase`}>Complete Your Look</h2>
      <div className="flex gap-10 justify-evenly items-center mt-4">
        {lookModels.map((model, i) => (
          <div className="relative" key={i}>
            <img src={homeRoomSircle} alt="" className="w-full h-36" />
            <img src={model.img} alt="" className="absolute top-5 left-0 w-full h-auto" />
            <p className={`${styles.subtitle} mt-4 text-center uppercase`}>{model.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeShowRoom;
