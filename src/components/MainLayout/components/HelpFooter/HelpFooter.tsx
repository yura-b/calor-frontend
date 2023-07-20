import React from 'react';
import { Link } from 'react-router-dom';
import { helpLinks } from '../../helpers/data';
import styles from '@/styles/Styles.module.scss';
import atIcon from '@/assets/images/atIcon.svg';
import grayTelIcon from '@assets/images/grayTelIcon.svg';

interface Props {
  title: string;
  color?: 'gray' | 'white';
}

const HelpFooter: React.FC<Props> = ({ title, color }): React.ReactElement => {
  return (
    <>
      <h1 className={`${styles.subtitle} text-${color}`}>{title}</h1>
      {helpLinks.map((link, i) => (
        <Link key={i} to="#" className={'flex text-base hover:text-mint focus:outline-none py-2'}>
          {link}
        </Link>
      ))}
      <div className={`flex justify-between text-sm font-bold text-${color} py-4 `}>
        <div className={'flex basis-1/2'}>
          <img src={grayTelIcon} className={`mr-2 filter ${color === 'white' ? 'brightness-0 invert' : ''}`} />
          <span>1 234 567 8910</span>
        </div>
        <div className={'flex '}>
          <img src={atIcon} className={`mr-2 filter ${color === 'white' ? 'brightness-0 invert' : ''}`} />
          <span>2023 Calor</span>
        </div>
      </div>
    </>
  );
};

export default HelpFooter;
