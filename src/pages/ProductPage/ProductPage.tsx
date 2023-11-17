import { useState, useEffect } from 'react';
import styles from '@styles/Styles.module.scss';
import { useQuery, useMutation } from 'react-query';
import { useParams } from 'react-router';
import { getProductById } from '@/api/products';
import Head from '@/layouts/Head';
import MainLayout from '@/components/MainLayout';
import ProductDescription from './components/ProductDescription';
import ProductReviews from './components/ProductReviews';
import NavigationLinks from '@components/MainLayout/components/Header/components/NavigationLinks';
import Slider from '@/components/ui/Slider';
import Button from '@components/ui/Button';
import AccordionSection from '@components/AccordionSection';
import { addToBasket } from '@/api/basket';
import { SealCheck } from '@phosphor-icons/react';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { BasketProduct, appendToBasket, fetchUserProductsInBasket } from '@/store/reducers/BasketSlice';
import { addToCartNonRegisterUser } from '@/store/reducers/BasketForNonRegisterUser';
import { showMessage } from '@/store/reducers/StatusClientReducer';
import { v4 as uuidv4 } from 'uuid';
import { addToCartGTMEvent } from '@/helpers/functions/gtm';
import SizeSelection from '@components/ui/SizeSelection';
import { motion } from 'framer-motion';
import { hoverOnButtonAnimation } from '@/styles/Animations';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Spinner from '@components/ui/Spinner';
import { useNavigate } from 'react-router-dom';
import constants from '@/constants/constants';
import Video from '@components/Video';

import { useMediaQuery } from '@react-hook/media-query';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isMobileLg = useMediaQuery('(max-width: 1023px)');

  const [dynamicId, setDynamicId] = useState(id || '');
  const { userId, access_token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [sizeButtonStyles, setSizeButtonStyles] = useState({});

  const { items: basketProducts } = useAppSelector((state) => state.basket);
  const { items: basketProductsNonRegisterUser } = useAppSelector((state) => state.basketForNonRegisterUser);

  const isProductExistInBasketNonRegisterUser = basketProductsNonRegisterUser.some(
    (item: BasketProduct) => item.product === dynamicId || item._id === dynamicId || item?.accessory?._id === dynamicId
  );
  const isProductExistInBasket = basketProducts.some(
    (item: BasketProduct) =>
      item?._id === dynamicId || item?.accessory?._id === dynamicId || item?.shoes?._id === dynamicId
  );

  const { data: product } = useQuery(['productById', dynamicId], () => getProductById(dynamicId), {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const { data: winterShoeProduct } = useQuery(
    ['productById', constants.DAYGER_WINTER_ID],
    () => getProductById(constants.DAYGER_WINTER_ID),
    {
      enabled: dynamicId === constants.DAYGER_ID,
    }
  );

  const [selectedSize, setSelectedSize] = useState(null);

  const [isProductExistAndSizeInBasketNonRegisterUser, setIsProductExistAndSizeInBasketNonRegisterUser] =
    useState(false);
  const [isProductExistAndSizeInBasket, setIsProductExistAndSizeInBasket] = useState(false);

  useEffect(() => {
    if (product && product.data && product.data.size && product.data.size.length > 0) {
      setSelectedSize(product.data.size[0]);
      const updatedStyles = {};
      updatedStyles[0] = 'border-2 border-mint text-mint';
      setSizeButtonStyles(updatedStyles);
    } else {
      setSelectedSize(null);
    }
  }, [product, dynamicId]);

  useEffect(() => {
    if (product?.data?.size) {
      const checkProductExistence = () => {
        const exists = basketProductsNonRegisterUser.some((item: BasketProduct) => {
          const hasMatchingAccessoryAndSize =
            (item?.product === dynamicId || item?.accessory?._id === dynamicId || item?.shoes?._id === dynamicId) &&
            item.size === selectedSize;
          return hasMatchingAccessoryAndSize;
        });
        setIsProductExistAndSizeInBasketNonRegisterUser(exists);
      };
      checkProductExistence();
    }
  }, [selectedSize, basketProductsNonRegisterUser, dynamicId]);

  useEffect(() => {
    if (product?.data?.size) {
      const checkProductExistence = () => {
        const exists = basketProducts.some((item: BasketProduct) => {
          const hasMatchingAccessoryAndSize =
            (item._id === dynamicId || item._id === dynamicId || item?.accessory?._id === dynamicId) &&
            item.measurement?.size === selectedSize;
          return hasMatchingAccessoryAndSize;
        });
        setIsProductExistAndSizeInBasket(exists);
      };
      checkProductExistence();
    }
  }, [selectedSize, basketProducts, dynamicId]);

  const variations = product?.data?.variations?.variations?.filter((variant) => variant._id !== product.data._id);
  let requestData = {};

  if (userId) {
    requestData = {
      product: product?.data._id,
      count: 1,
      photo: product?.data.photos[0],
      measurement: {
        size: selectedSize,
      },
      details: {},
      basketItemId: uuidv4(),
    };
  } else {
    requestData = {
      product: product?.data._id,
      count: 1,
      photos: [product?.data.photos[0]],
      measurement: {},
      details: {},
      price: product?.data?.price,
      title: product?.data?.title,
      size: selectedSize,
    };
  }

  const mutation = useMutation(addToBasket, {
    onSuccess: (data) => {
      dispatch(
        appendToBasket({ ...product?.data, size: product?.data.size.find((i) => i === selectedSize), count: 1 })
      );
      dispatch(showMessage('The product has been successfully added'));
      dispatch(fetchUserProductsInBasket({ access_token, userId }));
    },
  });

  const handleAddToCartNonRegisterUser = () => {
    dispatch(addToCartNonRegisterUser({ ...requestData, count: 1 }));
    dispatch(showMessage('The product has been successfully added'));
    addToCartGTMEvent('add_to_cart', { id: product?.data._id, title: product?.data.title });
  };

  const initialSectionsState = [
    {
      title: 'Product details',
      isOpen: false,
    },
    {
      title: 'Promo Videos',
      isOpen: true,
    },
    // {
    //   title: 'Inspiration',
    //   isOpen: false
    // }
  ];

  const [sections, setSections] = useState(initialSectionsState);

  const toggleSection = (index) => {
    setSections((prevSections) =>
      prevSections.map((section, i) => (i === index ? { ...section, isOpen: !section.isOpen } : section))
    );
  };

  const handleSizeClick = (size, index) => {
    setSelectedSize(size);
    const updatedStyles = {};
    updatedStyles[index] = 'border-2 border-mint text-mint';
    setSizeButtonStyles(updatedStyles);
    requestData = { ...requestData, basketItemId: uuidv4() };
  };

  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isWidthGreaterThanHeight, setIsWidthGreaterThanHeight] = useState(false);

  useEffect(() => {
    const checkWindowDimensions = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      if (screenWidth > screenHeight) {
        setIsWidthGreaterThanHeight(true);
      } else {
        setIsWidthGreaterThanHeight(false);
      }
    };

    checkWindowDimensions();
    window.addEventListener('resize', checkWindowDimensions);
    return () => {
      window.removeEventListener('resize', checkWindowDimensions);
    };
  }, []);
  return (
    <div className="font-poppins h-screen">
      <Head title="Product" />
      <MainLayout>
        <div className="hidden lg:flex w-full h-[50px] justify-center items-center pt-10 box-border">
          <NavigationLinks color="gray" className="z-10 w-auto" />
        </div>
        <div className={`md:grid lg:grid-cols-2 flex flex-col md:py-8 lg:gap-16 gap-10 ${styles.container}`}>
          {/* Product Slider */}
          <div>
            <Slider
              images={product?.data.photos}
              color="gray"
              dataShoes={product?.data.category === 'shoes' ? true : false}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
            />
            <div className="hidden lg:block">
              <ProductReviews rating={product?.data.rating} />
            </div>
          </div>
          {/* Product Desription */}
          <div
            className={`flex flex-col bg-mintExtraLight row-span-2 justify-start items-start ${styles.pageident} w-full`}
          >
            <div className="w-full">
              <ProductDescription
                description={product?.data.description}
                title={product?.data.title}
                price={product?.data.price}
                rating={product?.data.rating}
                sizes={product?.data.sizes}
                category={product?.data.category}
                winterShoePrice={winterShoeProduct?.data?.price}
              />
              <div className="py-2 w-full">
                {product?.data.category == 'shoes' && <span>Your shoes will be manufactured in 7-10 days.</span>}
                {product?.data.category !== 'shoes' && (
                  <>
                    {!!product?.data.size.length && (
                      <SizeSelection
                        sizes={product?.data.size || []}
                        setSizeButtonStyles={setSizeButtonStyles}
                        sizeButtonStyles={sizeButtonStyles}
                        handleSizeClick={handleSizeClick}
                      />
                    )}
                  </>
                )}
              </div>
              <div className="flex flex-col justify-center items-center gap-6 py-2">
                <motion.div className={'flex  flex-wrap justify-start items-start text-center w-full gap-4'}>
                  {variations?.map((variation) => {
                    return (
                      <motion.div
                        onClick={() => {
                          setDynamicId(variation._id);
                          setCurrentIndex(0);
                          navigate(`/product/${variation._id}`);
                        }}
                        className="relative basis-[46%] md:basis-[30%] min-w-[120px] cursor-pointer hover:text-mint"
                        {...hoverOnButtonAnimation}
                      >
                        <LazyLoadImage
                          src={variation.photo}
                          className="w-[100px] h-[100px] xs:w-[120px] xs:h-[120px] rounded-full object-contain object-cover mx-auto "
                          alt=""
                          effect="blur"
                          afterLoad={() => {
                            setImageLoaded(true);
                          }}
                          beforeLoad={() => {
                            setImageLoaded(false);
                          }}
                        />
                        {imageLoaded ? null : <Spinner className="absolute top-1/2 left-1/2" />}
                        <p className="truncate">{variation.title}</p>
                      </motion.div>
                    );
                  })}
                </motion.div>
                {product?.data.category == 'shoes' && (
                  <>
                    <Button
                      color="gray"
                      to={`/design_your_shoe/model/${product.data.title.toLowerCase()}/${product.data._id}`}
                    >
                      Design Your Shoe
                    </Button>
                    {/* <Button color="transparentGray" to={paths.ready_made_products}>
                      Choose From Existing
                    </Button> */}
                  </>
                )}
                {userId ? (
                  <>
                    {!product?.data.size || !product?.data.size.length ? (
                      <>
                        {product?.data.category !== 'shoes' && !isProductExistInBasket && (
                          <Button
                            id="gtm-add-to-cart-product"
                            color="gray"
                            onClick={() => {
                              addToCartGTMEvent('add_to_cart', { id: product?.data._id, title: product?.data.title });
                              mutation.mutate({ userId, requestData });
                            }}
                          >
                            Add To Cart
                          </Button>
                        )}
                        {product?.data.category !== 'shoes' && isProductExistInBasket && (
                          <div className="flex justify-center items-center text-mint">
                            <SealCheck className="mr-2" size={32} weight="fill" />
                            Already in your cart
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        {product?.data.category !== 'shoes' && !isProductExistAndSizeInBasket && (
                          <Button
                            color="gray"
                            onClick={() => {
                              addToCartGTMEvent('add_to_cart', { id: product?.data._id, title: product?.data.title });
                              mutation.mutate({ userId, requestData });
                            }}
                          >
                            Add To Cart
                          </Button>
                        )}
                        {product?.data.category !== 'shoes' && isProductExistAndSizeInBasket && (
                          <div className="flex justify-center items-center text-mint">
                            <SealCheck className="mr-2" size={32} weight="fill" />
                            {`Product with size ${selectedSize} is already in your cart`}
                          </div>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {!product?.data.size || !product?.data.size.length ? (
                      <>
                        {product?.data.category !== 'shoes' && !isProductExistInBasketNonRegisterUser && (
                          <Button color="gray" onClick={handleAddToCartNonRegisterUser}>
                            Add To Cart
                          </Button>
                        )}
                        {product?.data.category !== 'shoes' && isProductExistInBasketNonRegisterUser && (
                          <div className="flex justify-center items-center text-mint">
                            <SealCheck className="mr-2" size={32} weight="fill" />
                            Already in your cart
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        {product?.data.category !== 'shoes' && !isProductExistAndSizeInBasketNonRegisterUser && (
                          <Button color="gray" onClick={handleAddToCartNonRegisterUser}>
                            Add To Cart
                          </Button>
                        )}
                        {product?.data.category !== 'shoes' && isProductExistAndSizeInBasketNonRegisterUser && (
                          <div className="flex justify-center items-center text-mint">
                            <SealCheck className="mr-2" size={32} weight="fill" />
                            {`Product with size ${selectedSize} is already in your cart`}
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
              <div className="py-2">
                {sections.map((section, index) => (
                  <AccordionSection
                    key={section.title}
                    title={section.title}
                    isOpen={section.isOpen}
                    toggleAccordion={() => toggleSection(index)}
                    className={`${product?.data.category !== 'shoes' && index > 0 ? 'hidden' : 'block'}`}
                  >
                    {index == 0 && (
                      <div>
                        <h1 className={`${styles.body1} font-bold`}>{product?.data.title}</h1>
                        <div dangerouslySetInnerHTML={{ __html: product?.data.productDetails }} />
                      </div>
                    )}
                    {product?.data.category === 'shoes' && index == 1 && (
                      <div className="my-4">
                        {product?.data.title == 'Yolo' && (
                          <>
                            <p className={`${styles.body2} font-bold mb-2`}>Yolo Woman</p>

                            {isMobile && !isWidthGreaterThanHeight && (
                              <Video
                                srcWebm={'1Prft-gapACdpjTZRNbpGpHPF7ZoeavGi'}
                                srcMp4={'1TvWAALsnAXxXyMwnl9EGfLSJthTJ71eJ'}
                                srcMov={'1laCEgk3-7twImft5NIDHI2KjC_mLIkP0'}
                              />
                            )}
                            {(isMobile && isWidthGreaterThanHeight) ||
                              (!isMobile && (
                                <Video
                                  srcWebm={'18OqXrJ1YVpzqWoD4YfmcGQtC0zdHlwzB'}
                                  srcMp4={'1gk_m2iR5sislnHVq3MxxjYjkCCjG2k-D'}
                                  srcMov={'19gleXiBUABmR8ay6Su_JcqYNo9neyTwL'}
                                  className="w-full"
                                />
                              ))}

                            <p className={`${styles.body2} font-bold mb-2 mt-4`}>Yolo Man</p>

                            {isMobile && !isWidthGreaterThanHeight && (
                              <Video
                                srcWebm={'1lMvlRgVtZ6tZgzTngYM1TDx66ktprmQc'}
                                srcMp4={'1ZiLsXQspQ67x1DrVLFgtGdgaJj2dXkwW'}
                                srcMov={'1LNpcuHSlwrmV_99BiR-i32OIhDAQuj8B'}
                              />
                            )}
                            {(isMobile && isWidthGreaterThanHeight) ||
                              (!isMobile && (
                                <Video
                                  srcWebm={'1lgm98Ml3YC3ukmiJq1JOjgJ2P4flvRAO'}
                                  srcMp4={'1Ph36XTt190l6JdfrOnXdUvMpKRfdJhlI'}
                                  srcMov={'1GwkNIHKP1d7YkO09g5H2gQtZuamMfn7b'}
                                  className="w-full"
                                />
                              ))}
                          </>
                        )}
                        {product?.data.title == 'Dayger' && (
                          <>
                            <p className={`${styles.body2} font-bold mb-2 `}>Dayger Woman</p>
                            {isMobile && !isWidthGreaterThanHeight && (
                              <>
                                <Video
                                  srcWebm={'15LQfAggvSlUKXbWbjukkel3vYkI4_1cJ'}
                                  srcMp4={'1ZZ7n-1DHCJ13ElTHcMcMo0luCjriYyLd'}
                                  srcMov={'18aSl5jCH6KoDgZYkmJVi3JosHLluzfj5'}
                                />
                                <p className={`${styles.body2} font-bold mb-2 mt-6 `}>Dayger Woman Business</p>
                                <Video
                                  srcWebm={'1NAXZDsbUAAUZirDsh89xxYBDOZCsLN-I'}
                                  srcMp4={'1cAb_T29HeJ4S9bIiQB-AQN1TIw-UmeUQ'}
                                  srcMov={'160wXY1o8f8k8Mvli1RfQF13seni6vbmP'}
                                />
                              </>
                            )}
                            {(isMobile && isWidthGreaterThanHeight) ||
                              (!isMobile && (
                                <>
                                  <Video
                                    srcWebm={'1Gh8GsK1iIn0F5hivSHjQU6HfZdMzmnEQ'}
                                    srcMp4={'1FDG660sfu5dYsicn1teT43Vn5DEUdILz'}
                                    srcMov={'1SAvDEKOp980RsR5Xu2tmd7pCaefeMNp2'}
                                    className="w-full"
                                  />
                                  <p className={`${styles.body2} font-bold mb-2 mt-6 `}>Dayger Woman Business</p>
                                  <Video
                                    srcWebm={'1voAl8JJqpzw48uzasLbgbynB7O_Qm_rs'}
                                    srcMp4={'1uuZnCWkTJoGZ1lKiVbUj3PKdZGdE2sgS'}
                                    srcMov={'1PPFi1z5Ebmk5s46hsGbart7NN-NoYhgO'}
                                    className="w-full"
                                  />
                                </>
                              ))}

                            <p className={`${styles.body2} font-bold mb-2 mt-4`}>Dayger Man</p>
                            {isMobile && !isWidthGreaterThanHeight && (
                              <>
                                <Video
                                  srcWebm={'14Us-vetig7gAdAOd4f7rROjtlUBIyurm'}
                                  srcMp4={'1VUuhlA7ZmsB9SWdkfvfkpT4RSKJsXSfU'}
                                  srcMov={'1CYnFKCdCAZ74FNqUrVewZ1evdXQ0Zfyv'}
                                />
                                <p className={`${styles.body2} font-bold mb-2 mt-6 `}>Dayger Man Business</p>
                                <Video
                                  srcWebm={'1smpwSErBiWTz9uCXIF6nQFqiijNApc-X'}
                                  srcMp4={'1L21tRD1C4DHhGwyL7eTSQL7WBLsj2T92'}
                                  srcMov={'1e27VpiWv5yIZhsl4HU7gFfuddM_5Ak8b'}
                                />
                              </>
                            )}
                            {(isMobile && isWidthGreaterThanHeight) ||
                              (!isMobile && (
                                <>
                                  <Video
                                    srcWebm={'1KCbO4aJEOq_zkao_RkwsUDhADfR01uDc'}
                                    srcMp4={'1T2RGkMmfGAYqxcdgBEors1M4ySRY8Rj_'}
                                    srcMov={'1limhKScDiqaOa4azqWfq6EorVbxbocAP'}
                                    className="w-full"
                                  />
                                  <p className={`${styles.body2} font-bold mb-2 mt-6 `}>Dayger Man Business</p>
                                  <Video
                                    srcWebm={'1gFWNyzchoLw3tUOjkxuMB_zDaeWoGxGn'}
                                    srcMp4={'13FeIuE16Hz5hcRIDOtWR1wtXPvuKCF3m'}
                                    srcMov={'1CYfsDPwr5cz_gB2-2pXwKbf0sPCkH0JM'}
                                    className="w-full"
                                  />
                                </>
                              ))}
                          </>
                        )}
                        {product?.data.title == 'Sunrise' && (
                          <>
                            <Video
                              srcWebm={'1AeW0PIzsVK-ZjvZmV9fsZkKfCNtIhu1x'}
                              srcMp4={'1t16ru1MoF3gJiuscXYmIxiYCxhSYdJ5Z'}
                              srcMov={'1kBtnKT7xaTspm4jhYiofuTgJ7nV9qyYZ'}
                              className={`${isMobileLg ? 'md:max-w-[400px] mx-auto' : 'max-w-[20vw] mx-auto'}`}
                            />
                          </>
                        )}
                      </div>
                    )}
                    {product?.data.category === 'shoes' && index == 2 && (
                      <div>
                        <h1>Inspiration</h1>
                      </div>
                    )}
                  </AccordionSection>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:hidden">
            {/* Product Reviews */}

            <ProductReviews rating={product?.data.rating} />
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default ProductPage;
