import React from 'react';
import { Link } from 'react-router-dom';
import { paths } from '@routes/paths';
import styles from '@/styles/Styles.module.scss';

const NavigationLinks: React.FC = (): React.ReactElement => {
  const convertToTitleCase = (str: string) =>
    str
      .replace(/_./g, (match) => match[1].toUpperCase())
      .replace(/^(.)/, (match) => match.toUpperCase())
      .replace(/([A-Z])/g, ' $1')
      .trim();
  const currentPage = convertToTitleCase(window.location.href.split('/')[3]);

  return (
    <div className={`${styles.body1} flex text-white justify-center mt-4 lg:hidden`}>
      {window.location.href.split('/')[3] != '' && (
        <>
          <Link to={paths.home}>Home</Link>
          <p className="mx-2">/</p>
        </>
      )}
      <p>{currentPage}</p>
    </div>
  );
};

export default NavigationLinks;
