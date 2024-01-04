import React from 'react';
import styles from '@styles/Styles.module.scss';
import Rating from '@/components/ui/Rating/Rating';
import constants from '@/constants/constants';
import { useParams } from 'react-router';

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

      <div className={'flex  justify-between items-center flex-wrap w-full'}>
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

        <div className={` ${oldPrice ? 'text-mint' : 'text-gray'} flex justify-center items-center flex-col ml-2`}>
          <div>
            Price <span className="font-bold ml-2">$ {price}</span>
          </div>
          {oldPrice !== 0 && oldPrice && (
            <div className={`relative ${styles.body2} flex flex-row text-custom-red px-2 -mt-2`}>
              <span className="text-[14px] font-bold ">$ {oldPrice}</span>
              <div className="absolute top-[44%] lg:top-[45%] left-0  w-full  border-b-[2px] border-custom-red "></div>
            </div>
          )}
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
