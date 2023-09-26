import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import BasicRating from '@/components/ui/Rating/Rating';
import Button from '@/components/ui/Button';
import styles from '@styles/Styles.module.scss';
import { addToBasket } from '@/api/basket';
import { useMutation } from 'react-query';
import { SealCheck } from '@phosphor-icons/react';
import { appendToBasket } from '@/store/reducers/BasketSlice';
import { addToCartNonRegisterUser } from '@/store/reducers/BasketForNonRegisterUser';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { showMessage } from '@/store/reducers/StatusClientReducer';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ProductCart: FC = ({ product, type }): React.ReactElement => {
  const { userId } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { items: basketProducts } = useAppSelector((state) => state.basket);
  const { items: basketProductsNonRegisterUser } = useAppSelector((state) => state.basketForNonRegisterUser);
  const isProductExistInBasket = basketProducts.some(
    (item: any) =>
      item._id === product?._id || item?.accessory?._id === product?._id || item?.shoes?._id === product?._id
  );
  const isProductExistInBasketNonRegisterUser = basketProductsNonRegisterUser.some(
    (item: any) => item._id === product?._id || item.accessory === product?._id
  );
  const mutation = useMutation(addToBasket, {
    onSuccess: (data) => {
      dispatch(appendToBasket({ ...product, count: 1 }));
      dispatch(showMessage('The product has been successfully added'));
    },
  });

  const requestData = {
    product: product?._id,
    count: 1,
    photo: product?.photos[0],
    measurement: {},
    details: [{}],
    price: product?.price,
  };

  const handleAddToCart = () => {
    if (userId) {
      if (type === 'shoes') {
        return null;
      } else {
        mutation.mutate({ userId, requestData });
      }
    } else {
      if (type === 'shoes') {
        return null;
      } else {
        dispatch(addToCartNonRegisterUser({ ...product, count: 1 }));
        dispatch(showMessage('The product has been successfully added'));
      }
    }
  };

  return (
    <div className="w-full flex-col my-5 flex justify-end min-h-[260px] sm:min-h-[300px] lg:min-h-[320px] xl:min-h-[300px] 2xl:min-h-[360px]">
      {/* Product img */}
      <div className=" min-h-[10vh]">
        <Link to={`/product/${product._id}`}>
          <div className="flex justify-center items-center min-h-[200px]">
            <LazyLoadImage
              className="flex justify-center items-center object-cover w-full h-full mx-auto max-h-[400px]"
              src={product.photos?.[0] || product.photo}
              effect="blur"
            />
          </div>
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
      {(userId && type !== 'shoes' && isProductExistInBasket) ||
      (!userId && type !== 'shoes' && isProductExistInBasketNonRegisterUser) ? (
        <div className="flex justify-center items-center text-mint mt-2">
          <SealCheck className="mr-2" size={32} weight="fill" />
          Already in your cart
        </div>
      ) : null}
      {(!userId && !isProductExistInBasketNonRegisterUser) ||
      (userId && !isProductExistInBasket) ||
      type === 'shoes' ? (
        <Button
          className="max-w-full mt-2"
          color="transparentMint"
          to={type === 'shoes' ? `model/${product.title.toLowerCase()}/${product._id}` : null}
          onClick={handleAddToCart}
        >
          {type === 'shoes' ? 'Design' : 'Add to cart'}
        </Button>
      ) : null}
    </div>
  );
};

export default ProductCart;
