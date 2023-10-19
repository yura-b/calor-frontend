import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useQuery, useMutation } from 'react-query';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import CompleteYourLookHeader from './components/CompleteYourLookHeader';
import CompleteYourLookItem from './components/CompleteYourLookItem';
import { getProducts } from '@/api/products';
import { setStep, Steps } from '@/store/reducers/CompleteLookReducer';
import Button from '@/components/ui/Button';
import Loader from '@/components/ui/Loader';
import MainLayout from '@/components/MainLayout';
import Head from '@/layouts/Head';
import { titles } from '@/translations/titles';
import styles from '@styles/Styles.module.scss';
import { addToBasket } from '@/api/basket';
import { appendToBasket, BasketProduct, fetchUserProductsInBasket } from '@/store/reducers/BasketSlice';
import { showMessage } from '@/store/reducers/StatusClientReducer';
import { addToCartNonRegisterUser } from '@/store/reducers/BasketForNonRegisterUser';
import { SealCheck } from '@phosphor-icons/react';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

interface IProps {}

const CompleteYourLookPage: FC<IProps> = () => {
  const { step } = useAppSelector((state) => state.completeLook);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery('products', getProducts, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  let completeLookItems = {};
  const { userId, access_token } = useAppSelector((state) => state.user);

  if (!isLoading) {
    completeLookItems = {
      // 0: {
      //   title: 'How about a matching belt?',
      //   emptyProduct: 'Belt coming soon',
      //   product: products?.data.accessories.filter((item) => item.subcategory === 'Belts')[0],
      // },
      0: {
        title: 'Would you like to add some accessories?',
        emptyProduct: 'Accessories coming soon',
        product: products?.data.accessories.filter(
          (item) => item.category.categoryTitle === 'Accessories' && item.subcategory !== 'Belts'
        )[2],
      },
      1: {
        title: `In order to keep your ${
          location.pathname.includes('yolo') ? 'fabric' : 'leather'
        } in a good condition for a long time, we recommend to try this product`,
        emptyProduct: 'Product coming soon',
        product: products?.data.accessories
          .filter((item) => item.category.categoryTitle === 'Care Product')
          .filter((item) =>
            location.pathname.includes('yolo') ? item.subcategory == 'Cleaners' : item.subcategory == 'Protectors'
          )[0],
      },
    };
  }
  const { items: basketProducts } = useAppSelector((state) => state.basket);
  const { items: basketProductsNonRegisterUser } = useAppSelector((state) => state.basketForNonRegisterUser);

  const isProductExistInBasket = basketProducts.some(
    (item: BasketProduct) =>
      item._id === completeLookItems[step]?.product?._id ||
      item?.accessory?._id === completeLookItems[step]?.product?._id
  );

  const isProductExistInBasketNonRegisterUser = basketProductsNonRegisterUser.some(
    (item: BasketProduct) => item._id === completeLookItems[step]?.product?._id
  );

  const handleSkip = () => {
    // if (step < 2) {
    if (step < 1) {
      dispatch(setStep(step + 1));
    } else {
      navigate('/');
    }
  };

  const handleViewAll = () => {
    // step === 0
    //   ? navigate('/accessories/belts')
    //   : step === 1
    //   ? navigate('/accessories')
    //   : step === 2
    //   ? navigate('/shoe_care_product')
    //   : navigate('/');
    step === 0 ? navigate('/accessories') : step === 1 ? navigate('/shoe_care_product') : navigate('/');
  };

  const [sizeButtonStyles, setSizeButtonStyles] = useState({});
  const [selectedSize, setSelectedSize] = useState(null);
  const [isProductExistAndSizeInBasketNonRegisterUser, setIsProductExistAndSizeInBasketNonRegisterUser] =
    useState(false);
  const [isProductExistAndSizeInBasket, setIsProductExistAndSizeInBasket] = useState(false);

  useEffect(() => {
    if (
      completeLookItems[step]?.product &&
      completeLookItems[step]?.product?.size &&
      completeLookItems[step]?.product?.size.length > 0
    ) {
      setSelectedSize(completeLookItems[step]?.product?.size[0]);
      const updatedStyles = {};
      updatedStyles[0] = 'border-2 border-mint text-mint';
      setSizeButtonStyles(updatedStyles);
    } else {
      setSelectedSize(null);
    }
  }, [completeLookItems[step]?.product, step]);

  useEffect(() => {
    if (completeLookItems[step]?.product?.size) {
      const checkProductExistence = () => {
        const exists = basketProductsNonRegisterUser.some((item: BasketProduct) => {
          const hasMatchingAccessoryAndSize =
            item._id === completeLookItems[step]?.product?._id && item.size === selectedSize;
          return hasMatchingAccessoryAndSize;
        });
        setIsProductExistAndSizeInBasketNonRegisterUser(exists);
      };
      checkProductExistence();
    }
  }, [selectedSize, basketProductsNonRegisterUser, step]);

  useEffect(() => {
    if (completeLookItems[step]?.product?.size) {
      const checkProductExistence = () => {
        const exists = basketProducts.some((item: BasketProduct) => {
          const hasMatchingAccessoryAndSize =
            item?.measurement?.size === selectedSize && item?.accessory?._id === completeLookItems[step]?.product?._id;
          return hasMatchingAccessoryAndSize;
        });
        setIsProductExistAndSizeInBasket(exists);
      };
      checkProductExistence();
    }
  }, [selectedSize, basketProducts, step]);

  const mutation = useMutation(addToBasket, {
    onSuccess: (data) => {
      dispatch(
        appendToBasket({
          ...completeLookItems[step]?.product,
          size: completeLookItems[step]?.product?.size.find((i) => i === selectedSize),
          count: 1,
        })
      );
      dispatch(showMessage('The product has been successfully added'));
      dispatch(fetchUserProductsInBasket({ access_token, userId }));
    },
  });

  let requestData = {};

  if (userId) {
    requestData = {
      product: completeLookItems[step]?.product?._id,
      count: 1,
      photo: completeLookItems[step]?.product?.photos[0],
      measurement: {
        size: selectedSize,
      },
      details: {},
      price: completeLookItems[step]?.product?.price,
      basketItemId: uuidv4(),
    };
  } else {
    requestData = {
      product: { ...completeLookItems[step]?.product, size: selectedSize },
      count: 1,
      photo: [completeLookItems[step]?.product],
      measurement: {},
      details: {},
      price: completeLookItems[step]?.product?.price,
      title: completeLookItems[step]?.product?.title,
      size: selectedSize,
    };
  }

  const handleAddToCart = () => {
    if (userId && step >= 0) {
      mutation.mutate({ userId, requestData });
    } else {
      dispatch(addToCartNonRegisterUser({ ...completeLookItems[step]?.product, size: selectedSize, count: 1 }));
      dispatch(showMessage('The product has been successfully added'));
    }
    if (step < 1) {
      dispatch(setStep(step + 1));
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    dispatch(setStep(Steps.FIRST));
  }, []);

  const handleSizeClick = (size, index) => {
    setSelectedSize(size);
    const updatedStyles = {};
    updatedStyles[index] = 'border-2 border-mint text-mint';
    setSizeButtonStyles(updatedStyles);
    requestData = { ...requestData, size: selectedSize, basketItemId: uuidv4() };
  };

  return (
    <div className="font-poppins h-screen">
      <Head title={titles.completeYourLook} />
      <MainLayout>
        <div className={`${styles.container} w-full flex flex-col items-center`}>
          <CompleteYourLookHeader />
          {isLoading ? (
            <Loader />
          ) : (
            <CompleteYourLookItem
              item={completeLookItems[step]}
              setSizeButtonStyles={setSizeButtonStyles}
              sizeButtonStyles={sizeButtonStyles}
              handleSizeClick={handleSizeClick}
            />
          )}
          <Button color="transparentGray" className="w-full my-2  " onClick={handleSkip}>
            Skip
          </Button>
          <Button color="transparentGray" className="w-full my-2 " onClick={handleViewAll}>
            View All
          </Button>
          {completeLookItems[step]?.product &&
            (!completeLookItems[step]?.product?.size || !completeLookItems[step]?.product?.size?.length) &&
            ((!userId && !isProductExistInBasketNonRegisterUser) || (userId && !isProductExistInBasket)) && (
              <Button color="gray" className="w-full my-2 " onClick={handleAddToCart}>
                Add to cart
              </Button>
            )}

          {completeLookItems[step]?.product &&
          completeLookItems[step]?.product?.size?.length === 0 &&
          ((userId && isProductExistInBasket) || (!userId && isProductExistInBasketNonRegisterUser)) ? (
            <div className="flex justify-center items-center text-mint mt-2">
              <SealCheck className="mr-2" size={32} weight="fill" />
              Already in your cart
            </div>
          ) : null}

          {completeLookItems[step]?.product &&
            completeLookItems[step]?.product?.size?.length > 0 &&
            ((!userId && !isProductExistAndSizeInBasketNonRegisterUser) ||
              (userId && !isProductExistAndSizeInBasket)) && (
              <Button color="gray" className="w-full my-2 " onClick={handleAddToCart}>
                Add to cart
              </Button>
            )}

          {completeLookItems[step]?.product &&
          completeLookItems[step]?.product?.size?.length > 0 &&
          ((userId && isProductExistAndSizeInBasket) || (!userId && isProductExistAndSizeInBasketNonRegisterUser)) ? (
            <div className="flex justify-center items-center text-mint mt-2">
              <SealCheck className="mr-2" size={32} weight="fill" />
              {`Product with size ${selectedSize} is already in your cart`}
            </div>
          ) : null}
        </div>
      </MainLayout>
    </div>
  );
};

export default CompleteYourLookPage;
