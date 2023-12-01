import React, { FC, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BasicRating from '@/components/ui/Rating/Rating';
import Button from '@/components/ui/Button';
import styles from '@styles/Styles.module.scss';
import { addToBasket } from '@/api/basket';
import { useMutation } from 'react-query';
import { SealCheck } from '@phosphor-icons/react';
import { appendToBasket, BasketProduct } from '@/store/reducers/BasketSlice';
import { addToCartNonRegisterUser } from '@/store/reducers/BasketForNonRegisterUser';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import { showMessage } from '@/store/reducers/StatusClientReducer';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Spinner from '@components/ui/Spinner';
import { v4 as uuidv4 } from 'uuid';
import { addToCartGTMEvent } from '@/helpers/functions/gtm';
import constants from '@/constants/constants';
import { paths } from '@/routes/paths';

const ProductCart = ({ product, type, winterShoePrice }): React.ReactElement => {
  const location = useLocation();
  const isHome = location.pathname === paths.home;
  const isDesignShoe = location.pathname === paths.design_shoe;
  const { userId } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [selectedSize, setSelectedSize] = useState(null);
  const { items: basketProducts } = useAppSelector((state) => state.basket);
  const { items: basketProductsNonRegisterUser } = useAppSelector((state) => state.basketForNonRegisterUser);

  const isProductExistInBasket = basketProducts.some(
    (item: BasketProduct) =>
      item._id === product?._id || item?.accessory?._id === product?._id || item?.shoes?._id === product?._id
  );

  const isProductExistInBasketNonRegisterUser = basketProductsNonRegisterUser.some(
    (item: BasketProduct) => (item.product === product?._id || item.accessory === product?._id) && item.size === null
  );
  const mutation = useMutation(addToBasket, {
    onSuccess: (data) => {
      dispatch(appendToBasket({ ...product, count: 1 }));
      dispatch(showMessage('The product has been successfully added'));
    },
  });

  useEffect(() => {
    if (product && product.data && product.data.size && product.data.size.length > 0) {
      setSelectedSize(product.data.size[0]);
    } else {
      setSelectedSize(null);
    }
  }, [product]);

  let requestData = {};

  if (userId) {
    requestData = {
      product: product?._id,
      count: 1,
      photo: product?.photos[0],
      measurement: {
        size: selectedSize,
      },
      details: {},
      basketItemId: uuidv4(),
    };
  } else {
    requestData = {
      product: product?._id,
      count: 1,
      photos: [product?.photos[0]],
      measurement: {},
      details: {},
      price: product?.price,
      title: product?.title,
      size: selectedSize,
    };
  }

  const handleAddToCart = () => {
    if (userId) {
      if (type === 'shoes') {
        return null;
      } else {
        addToCartGTMEvent('add_to_cart', { id: product?._id, title: product?.title });
        mutation.mutate({ userId, requestData });
      }
    } else {
      if (type === 'shoes') {
        return null;
      } else {
        addToCartGTMEvent('add_to_cart', { id: product?._id, title: product?.title });
        dispatch(addToCartNonRegisterUser({ ...requestData, count: 1 }));
        dispatch(showMessage('The product has been successfully added'));
      }
    }
  };

  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <div
      className={`w-full flex-col my-1 lg:my-5 flex justify-between min-h-[260px] sm:min-h-[300px] lg:min-h-[320px] xl:min-h-[300px] 2xl:min-h-[360px] ${
        isHome ? '' : 'min-w-[300px] sm:min-w-0'
      }`}
    >
      <div className="min-h-[10vh] flex justify-center items-center">
        <Link to={`/product/${product._id}`}>
          <div
            className={`flex justify-center items-center ${
              isHome
                ? 'min-h-[210px] sm:min-h-[220px] md:min-h-[260px] lg:min-h-[290px] xl:min-h-[300px] 2xl:min-h-[340px]'
                : isDesignShoe
                ? 'min-h-[380px] sm:min-h-[310px] md:min-h-[260px] lg:min-h-[320px] xl:min-h-[320px] 2xl:min-h-[400px]'
                : 'min-h-[380px] sm:min-h-[290px] md:min-h-[200px] lg:min-h-[260px] xl:min-h-[300px] 2xl:min-h-[340px]'
            }    relative`}
          >
            <LazyLoadImage
              className="flex justify-center items-center object-cover w-[400px] sm:w-[300px] md:w-[200px] lg:w-[280px] xl:w-[300px] 2xl:w-[340px] min-w-[100%]  mx-auto max-h-[380px] sm:max-h-[290px] md:max-h-[200px] lg:max-h-[260px] xl:max-h-[300px] 2xl:max-h-[340px]"
              src={product.photos?.[0] || product.photo}
              effect="blur"
              afterLoad={() => {
                setImageLoaded(true);
              }}
              beforeLoad={() => {
                setImageLoaded(false);
              }}
            />
            {imageLoaded ? null : <Spinner className="absolute" />}
          </div>
        </Link>
      </div>
      {/* Product content */}
      <div>
        <div className={`${styles.subtitle} my-2 truncate`}>{product.title}</div>
        <div className="flex flex-row justify-between">
          <BasicRating includeTitle={false} readOnly={true} size="small" rating={product.rating} />
          <span>{product?.rating ? product?.rating : '0'}</span>
        </div>
        <div>{product.categoryTitle}</div>
        {product._id !== constants.DAYGER_ID && (
          <div className={`${styles.body2} flex flex-row `}>
            <span>From</span>
            <span className="font-bold ml-2">$ {product.price}</span>
          </div>
        )}
        {product._id == constants.DAYGER_ID && (
          <div className={`${styles.body2} flex flex-row `}>
            <div>
              <span className="mr-2">From</span>
              <span className="font-bold">$ {product.price}</span>
            </div>
            <div>
              <span className="mx-2">to</span>
              <span className="font-bold">$ {winterShoePrice}</span>
            </div>
          </div>
        )}
        {(userId && type !== 'shoes' && isProductExistInBasket && product?.size?.length == 0) ||
        (!userId && type !== 'shoes' && isProductExistInBasketNonRegisterUser && product?.size?.length == 0) ? (
          <div className="flex justify-center items-center text-mint mt-2">
            <SealCheck className="mr-2" size={32} weight="fill" />
            Already in your cart
          </div>
        ) : null}
        {(!userId && !isProductExistInBasketNonRegisterUser && product?.size?.length == 0) ||
        (userId && !isProductExistInBasket && product?.size?.length == 0) ||
        type === 'shoes' ? (
          <Button
            id="gtm-add-to-cart-product"
            className="max-w-full mt-2"
            color="transparentMint"
            to={type === 'shoes' ? `model/${product.title.toLowerCase()}/${product._id}` : null}
            onClick={handleAddToCart}
          >
            {type === 'shoes' ? 'Design' : 'Add to cart'}
          </Button>
        ) : (
          (!isProductExistInBasketNonRegisterUser || !isProductExistInBasket) &&
          product?.size?.length !== 0 && (
            <p>
              <Button className="max-w-full mt-2" color="transparentMint" to={`/product/${product._id}`}>
                Choose a size
              </Button>
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default ProductCart;
