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
      .split('/')
      .map((part) => part.replace(/_/g, ' ').replace(/(^\w{1}|\s+\w{1})/g, (match) => match.toUpperCase()))
      .join('/');
  };

  const currentPage = convertToTitleCase(window.location.pathname.slice(1));
  const parts = currentPage.split('/');

  const lastPartStartsWithNumber = /^\d/.test(parts[parts.length - 1]);

  return (
    <div
      className={`${styles.body1} ${styles.container} ${className} pb-2 pt-0  flex text-${color} justify-center  sm:text-sm`}
    >
      {parts.length > 0 && (
        <>
          <Link to={paths.home}>Home</Link>
          <p className="mx-2">{'/'}</p>
        </>
      )}
      {parts.map((part, index) => {
        if (index === parts.length - 1 && lastPartStartsWithNumber) {
          return null;
        }

        return (
          <p key={index} className={index === parts.length - 1 ? 'font-bold' : undefined}>
            {part}
            {index !== parts.length - 1 && <span className="mx-2"></span>}
          </p>
        );
      })}
    </div>
  );
};

export default NavigationLinks;
