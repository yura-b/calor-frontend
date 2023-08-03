import React from 'react';
import styles from '@styles/Styles.module.scss';
import Button from '@/components/ui/Button';

interface Props {
  backgroundButton: 'gray' | 'turquoise';
  showRoomTitleColor?: string;
  titleColor?: string;
  bodyColor?: string;
}

const HomeShowRoom: React.FC<Props> = ({
  backgroundButton,
  showRoomTitleColor,
  titleColor,
  bodyColor,
}): React.ReactElement => {
  const handleClick = () => {
    console.log('Button clicked!');
  };
  return (
    <div className={`${styles.container} w-full`}>
      <p className={`${styles.subtitle} text-${showRoomTitleColor}`}>Showroom</p>
      <h2 className={`${styles.header1} text-${titleColor}`}>Perfect Fit</h2>
      <p className={`${styles.body1}  text-${bodyColor} text-justify mt-4`}>
        Our experienced team of footwear specialists will guide you through the measurement process, taking precise
        measurements of your feet to guarantee a comfortable and flawless fit.
      </p>
      <Button color={backgroundButton} className="w-full my-6" onClick={handleClick}>
        Make Appointment
      </Button>
    </div>
  );
};

export default HomeShowRoom;
