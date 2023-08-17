import React from 'react';
import { Link } from 'react-router-dom';
import { paths } from '@routes/paths';
import styles from '@/styles/Styles.module.scss';

interface Props {
  color?: string;
  className?: string;
}

const NavigationLinks: React.FC<Props> = ({ color, className }): React.ReactElement => {
  const convertToTitleCase = (str: string) => {
    return str
      .replace(/_/g, ' ')
      .replace(/(^\w{1}|\s+\w{1})/g, (match) => match.toUpperCase())
      .trim();
  };

  const currentPage = convertToTitleCase(window.location.pathname.slice(1));
  return (
    <div
      className={`${styles.body1} ${styles.container} ${className} pb-2 pt-0  flex text-${color} justify-center  lg:text-sm`}
    >
      {window.location.href.split('/')[3] != '' && (
        <>
          <Link to={paths.home}>Home</Link>
          <p className="mx-2">{'/'}</p>
        </>
      )}
      <p className="font-bold">{currentPage}</p>
    </div>
  );
};

export default NavigationLinks;
