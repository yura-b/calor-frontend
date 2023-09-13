import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import BasicRating from '@/components/ui/Rating/Rating';
import Button from '@/components/ui/Button';
import styles from '@styles/Styles.module.scss';
import { addToBasket } from '@/api/basket';
import { useMutation } from 'react-query';

import { SealCheck } from '@phosphor-icons/react';
import { appendToBasket } from '@/store/reducers/BasketSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';

const ProductCart: FC = ({ product, type }): React.ReactElement => {
  const { userId, access_token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { items: basketProducts } = useAppSelector((state) => state.basket);
  const isProductExistInBasket = basketProducts.some(
    (item: any) => item._id === product?._id || item.accessory === product?._id
  );
  const mutation = useMutation(addToBasket, {
    onSuccess: (data) => {
      dispatch(appendToBasket(product));
      console.log(data);
    },
  });

  const requestData = {
    product: product?._id,
    count: 1,
    photo: product?.photos[0],
    measurement: {},
    details: [{}],
  };
  return (
    <div className="w-full flex-col  my-5 flex  justify-end min-h-[260px] sm:min-h-[300px] lg:min-h-[320px] xl:min-h-[300px] 2xl:min-h-[360px]">
      {/* Product img */}
      <div className="min-h-[10vh]">
        <Link to={`/product/${product._id}`}>
          <img
            className="object-contain object-cover w-full h-full mx-auto max-h-[400px]"
            src={product.photos?.[0] || product.photo}
            loading="lazy"
          />
        </Link>
      </div>
      {/* Product content */}
      <div className={`${styles.subtitle} flex justify-start items-center my-1 `}>{product.title}</div>
      <div className="flex flex-row justify-between">
        <BasicRating includeTitle={false} readOnly={true} size="small" rating={product.rating} />
        <span>{product?.rating ? product?.rating : '0'}</span>
      </div>
      <div>{product.categoryTitle}</div>
      <div className={`${styles.body2} flex flex-row justify-between`}>
        <span>From</span>
        <span className="font-bold">{product.price} $</span>
      </div>
      {isProductExistInBasket && (
        <div className="flex justify-center items-center text-mint mt-2">
          <SealCheck className="mr-2" size={32} weight="fill" />
          Already in your cart
        </div>
      )}
      {!isProductExistInBasket && (
        <Button
          className="max-w-full mt-2"
          color="transparentMint"
          to={type === 'shoes' ? `model/${product.title.toLowerCase()}/${product._id}` : null}
          onClick={() => (type === 'shoes' ? null : mutation.mutate({ userId, requestData }))}
        >
          {type === 'shoes' ? 'Design' : 'Add to cart'}
        </Button>
      )}
    </div>
  );
};

export default ProductCart;
