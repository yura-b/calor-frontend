import React from 'react';
import { Link } from 'react-router-dom';
import styles from '@styles/Styles.module.scss';
import Rating from '@/components/ui/Rating/Rating';

const ProductDescription = ({ description, title, price, subcategory, rating, season }) => {
  return (
    <div className="text-gray">
      <div className="flex justify-start items-center py-1">
        <span className={styles.subtitle}>{title}</span>
      </div>

      <div className="flex justify-start items-center">
        <span className="text-thinGray font-thin">Category</span>
      </div>

      <div className="flex flex-row justify-between items-center">
        <div className="flex justify-start py-2">
          {' '}
          <Rating rating={rating} includeTitle={true} readOnly={true} className="flex flex-row-reverse" />
        </div>
        <div className="flex justify-end">
          From <span className="font-bold ml-4">${price}</span>
        </div>
      </div>

      <div className="flex flex-col items-start">
        <div className="flex">
          <ul className="list-disc">
            <li className="py-1">
              <p>
                <span className="font-bold">Season</span> {season}
              </p>
            </li>
            <li className="py-1">
              <p>
                <span className="font-bold">Size</span> {'size'}{' '}
              </p>{' '}
              <Link to="/" className="text-mint underline">
                Your shoe size is not on the list?
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductDescription);
