import React from 'react';
import styles from '@styles/Styles.module.scss';
import Button from '@/components/ui/Button';

interface Props {
  backgroundButton: 'gray' | 'turquoise';
  showRoomTitleColor?: string;
  titleColor?: string;
  bodyColor?: string;
  perfectFit?: {
    value: string;
    title: string;
  };
}

const HomeShowRoom: React.FC<Props> = ({
  backgroundButton,
  showRoomTitleColor,
  titleColor,
  bodyColor,
  perfectFit,
}): React.ReactElement => {
  const handleClick = () => {
    console.log('Button clicked!');
  };
  return (
    <div className={`${styles.container} w-full`}>
      <p className={`${styles.subtitle} text-${showRoomTitleColor}`}>Showroom</p>
      <h2 className={`${styles.header1} text-${titleColor}`}>{perfectFit?.title}</h2>
      <p className={`${styles.body1}  text-${bodyColor} text-justify mt-4`}>{perfectFit?.value}</p>
      <Button color={backgroundButton} className="w-full my-6" onClick={handleClick}>
        Make an Appointment
      </Button>
    </div>
  );
};

export default HomeShowRoom;
