import React from 'react';
import styles from '@styles/Styles.module.scss';
import yolo1 from '@images/inspiration/yolo1.jpg';
import yolo2 from '@images/inspiration/yolo2.jpg';
import yolo3 from '@images/inspiration/yolo3.jpg';
import yolo4 from '@images/inspiration/yolo4.jpg';
import yolo5 from '@images/inspiration/yolo5.jpg';
import yolo6 from '@images/inspiration/yolo6.jpg';
import sunrise1 from '@images/inspiration/sunrise1.jpg';
import sunrise2 from '@images/inspiration/sunrise2.jpg';
import sunrise3 from '@images/inspiration/sunrise3.jpg';
import sunrise4 from '@images/inspiration/sunrise4.jpg';
import sunrise5 from '@images/inspiration/sunrise5.jpg';
import sunrise6 from '@images/inspiration/sunrise6.jpg';
import sunrise7 from '@images/inspiration/sunrise7.jpg';
import sunrise8 from '@images/inspiration/sunrise8.jpeg';
import sunrise9 from '@images/inspiration/sunrise9.jpg';
import sunrise10 from '@images/inspiration/sunrise10.jpg';
import sunrise11 from '@images/inspiration/sunrise11.jpg';
import sunrise12 from '@images/inspiration/sunrise12.jpg';
import sunrise13 from '@images/inspiration/sunrise13.jpg';
import sunrise14 from '@images/inspiration/sunrise14.jpg';
import sunrise15 from '@images/inspiration/sunrise15.jpg';
import sunrise16 from '@images/inspiration/sunrise16.jpg';
import dayger1 from '@images/inspiration/dayger1.jpg';
import dayger2 from '@images/inspiration/dayger2.jpg';
import dayger3 from '@images/inspiration/dayger3.jpg';
import dayger4 from '@images/inspiration/dayger4.jpg';
import dayger5 from '@images/inspiration/dayger5.jpg';
import dayger6 from '@images/inspiration/dayger6.jpg';
import dayger7 from '@images/inspiration/dayger7.jpeg';
import Slider from '../Slider';
import { useMediaQuery } from '@react-hook/media-query';

const Inspiration: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 1023px)');

  const homeCustomerCreations = [
    yolo1,
    yolo2,
    yolo3,
    yolo4,
    yolo5,
    yolo6,
    sunrise1,
    sunrise2,
    sunrise3,
    sunrise4,
    sunrise5,
    sunrise6,
    sunrise7,
    sunrise8,
    sunrise9,
    sunrise10,
    sunrise11,
    sunrise12,
    sunrise13,
    sunrise14,
    sunrise15,
    sunrise16,
    dayger1,
    dayger2,
    dayger3,
    dayger4,
    dayger5,
    dayger6,
    dayger7,
  ];
  return (
    <div className="bg-custom-turquoise">
      <div className={styles.container}>
        <h1 className={styles.header1}>Inspiration</h1>
        {!isMobile && <Slider images={homeCustomerCreations} />}
        {isMobile && (
          <div className="flex justify-between overflow-x-auto flex-row gap-2 mx-auto lg:gap-10">
            {homeCustomerCreations.map((item, i) => (
              <div className="flex justify-center items-center lg:basis-1/5  my-4" key={i}>
                <div className={'w-36 lg:w-full'}>
                  <img
                    src={item}
                    className=" object-contain object-cover  mx-auto z-10 min-h-[180px] max-h-[180px] w-[120px]"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Inspiration;
