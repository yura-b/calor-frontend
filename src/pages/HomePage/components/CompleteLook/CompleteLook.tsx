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
      <div className={`${styles.container} lg:flex gap-8 items-center justify-between`}>
        <div className="flex lg:basis-auto ">
          <h2 className={`${styles.header1}  lg:max-w-[260px]`}>Complete Your Look</h2>
          <HomeArrowRightIcon color="#404040" className="hidden lg:block" />
        </div>
        <div className="flex gap-6 justify-around items-center mt-4 ml-4 lg:basis-9/12">
          {lookModels.map((model, i) => (
            <motion.div
              className="relative min-w-[140px] lg:w-[200px] max-w-[220px]"
              key={i}
              {...hoverOnButtonAnimation}
            >
              <Link to={model.path}>
                <img src={homeRoomSircle} alt="" className="w-full" style={{ transform: 'rotate(30deg)' }} />
                <motion.img
                  src={model.img}
                  alt=""
                  className="absolute top-8 left-0 object-contain object-cover w-[200px] h-auto mx-auto"
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
