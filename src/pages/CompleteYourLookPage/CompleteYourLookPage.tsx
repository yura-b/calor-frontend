import { FC, useEffect } from 'react';
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
import { appendToBasket } from '@/store/reducers/BasketSlice';
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
  const { userId } = useAppSelector((state) => state.user);

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
        )[0],
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

  const mutation = useMutation(addToBasket, {
    onSuccess: (data) => {
      dispatch(appendToBasket({ ...completeLookItems[step]?.product, count: 1 }));
      dispatch(showMessage('The product has been successfully added'));
    },
  });

  let requestData = {};

  if (userId) {
    requestData = {
      product: completeLookItems[step]?.product?._id,
      count: 1,
      photo: completeLookItems[step]?.product?.photos[0],
      measurement: {},
      details: {},
      price: completeLookItems[step]?.product?.price,
      basketItemId: uuidv4(),
    };
  } else {
    requestData = {
      product: completeLookItems[step]?.product,
      count: 1,
      photo: [completeLookItems[step]?.product],
      measurement: {},
      details: {},
      price: completeLookItems[step]?.product?.price,
      title: completeLookItems[step]?.product?.title,
      basketItemId: uuidv4(),
    };
  }

  const handleAddToCart = () => {
    if (userId && step >= 1) {
      mutation.mutate({ userId, requestData });
    } else {
      dispatch(addToCartNonRegisterUser({ ...completeLookItems[step]?.product, count: 1 }));
      dispatch(showMessage('The product has been successfully added'));
    }
    navigate('/');
  };

  useEffect(() => {
    dispatch(setStep(Steps.FIRST));
  }, []);

  const { items: basketProducts } = useAppSelector((state) => state.basket);
  const { items: basketProductsNonRegisterUser } = useAppSelector((state) => state.basketForNonRegisterUser);

  const isProductExistInBasket = basketProducts.some(
    (item: any) => item?.accessory?._id === completeLookItems[step]?.product?._id
  );
  const isProductExistInBasketNonRegisterUser = basketProductsNonRegisterUser.some(
    (item: any) => item._id === completeLookItems[step]?.product?._id
  );

  return (
    <div className="font-poppins h-screen">
      <Head title={titles.completeYourLook} />
      <MainLayout>
        <div className={`${styles.container} w-full flex flex-col items-center`}>
          <CompleteYourLookHeader />
          {isLoading ? <Loader /> : <CompleteYourLookItem item={completeLookItems[step]} />}
          <Button color="transparentGray" className="w-full my-2  " onClick={handleSkip}>
            Skip
          </Button>
          <Button color="transparentGray" className="w-full my-2 " onClick={handleViewAll}>
            View All
          </Button>
          {completeLookItems[step]?.product &&
            ((!userId && !isProductExistInBasketNonRegisterUser) || (userId && !isProductExistInBasket)) && (
              <Button color="gray" className="w-full my-2 " onClick={handleAddToCart}>
                Add to cart
              </Button>
            )}

          {completeLookItems[step]?.product &&
          ((userId && isProductExistInBasket) || (!userId && isProductExistInBasketNonRegisterUser)) ? (
            <div className="flex justify-center items-center text-mint mt-2">
              <SealCheck className="mr-2" size={32} weight="fill" />
              Already in your cart
            </div>
          ) : null}
        </div>
      </MainLayout>
    </div>
  );
};

export default CompleteYourLookPage;
