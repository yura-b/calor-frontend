import React from 'react';
import styles from '@styles/Styles.module.scss';
import homeRoomSircle from '@assets/images/homeRoomSircle.svg';
import { lookModels } from '../../helpers/data';
import HomeArrowRightIcon from '@components/ui/HomeArrowRightIcon';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { hoverOnButtonAnimation } from '@styles/Animations';

const CompleteLook: React.FC = (): React.ReactElement => {
  return (
    <div className=" bg-custom-turquoise">
      <div className={`${styles.container} pt-4 pb-6 lg:flex gap-8 items-center justify-between`}>
        <div className="flex lg:basis-auto ">
          <h2 className={`${styles.header1}  lg:max-w-[260px]`}>Complete Your Look</h2>
          <HomeArrowRightIcon color="#404040" className="hidden lg:block" />
        </div>
        <div className="flex gap-6 justify-around items-centerml-4 lg:basis-9/12">
          {lookModels.map((model, i) => (
            <motion.div
              className="relative min-w-[140px] w-[220px] 2xl:w-[300px] max-w-[380px]"
              key={i}
              {...hoverOnButtonAnimation}
            >
              <Link to={model.path}>
                <img
                  src={homeRoomSircle}
                  alt=""
                  className="w-full min-h-[200px] md:min-h-[240px] h-[260px]  md:h-[360px]"
                  style={{ transform: 'rotate(30deg)' }}
                />
                <motion.img
                  src={model.img}
                  alt=""
                  className="absolute top-[46%] sm:top-[50%]  left-[40%]  sm:left-[44%] transform -translate-x-1/2 -translate-y-1/2 object-contain object-cover w-[360px] h-auto mx-auto"
                />
                <p className={`${styles.subtitle} mt-4 -ml-5 text-center uppercase`}>{model.title}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompleteLook;
