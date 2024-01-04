import React from 'react';
import styles from '@styles/Styles.module.scss';
import Rating from '@/components/ui/Rating/Rating';
import constants from '@/constants/constants';
import { useParams } from 'react-router';
import OldPrice from '@components/OldPrice';

const ProductDescription = ({ title, price, rating, sizes, category, description, winterShoePrice, oldPrice }) => {
  const { id } = useParams();
  return (
    <div className="text-gray">
      <div className="flex justify-start items-center py-1">
        <span className={styles.subtitle}>{title}</span>
      </div>

      <div className="flex justify-start items-center">
        <span className="text-thinGray font-thin">Category</span>
      </div>

      <div className={'flex  justify-between items-center flex-wrap w-full gap-2'}>
        <div className="flex justify-start py-2">
          {' '}
          <Rating rating={rating} includeTitle={true} readOnly={true} className="flex flex-row-reverse" />
        </div>
        {/* {id !== constants.DAYGER_ID && (
          <div className="flex justify-end">
            From <span className="font-bold ml-2">$ {price}</span>
          </div>
        )} */}
        {/* {winterShoePrice && id === constants.DAYGER_ID && (
          <div className="flex justify-end">
            From <span className="font-bold mx-2">$ {price}</span>
            to
            <span className="font-bold ml-2">$ {winterShoePrice}</span>
          </div>
        )} */}

        <div className={`md:${styles.body2} flex flex-row items-center`}>
          <p className="mr-1">Price</p>
          {oldPrice !== 0 && oldPrice && <OldPrice oldPrice={oldPrice} />}
          <p className="font-bold ml-2">$ {price}</p>
        </div>
      </div>
      <div className="py-2 w-full">
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>
      {/* <div className="flex flex-col items-start">
        <div className="flex">
          {category === 'shoes' && (
            <ul className="list-disc">
              <li className="py-1">
                <p>
                  <span className="font-bold">Size</span> {sizes && Math.min(...sizes)}-{sizes && Math.max(...sizes)}
                </p>{' '}
                <Link to="/" className="text-mint underline">
                Your shoe size is not on the list?
              </Link>
              </li>
            </ul>
          )}
        </div>
      </div> */}
    </div>
  );
};

export default React.memo(ProductDescription);
