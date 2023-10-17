import { useState } from 'react';
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
import { BasketProduct, appendToBasket } from '@/store/reducers/BasketSlice';
import { addToCartNonRegisterUser } from '@/store/reducers/BasketForNonRegisterUser';
import { showMessage } from '@/store/reducers/StatusClientReducer';
import { v4 as uuidv4 } from 'uuid';
import { addToCartGTMEvent } from '@/helpers/functions/gtm';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Spinner from '@components/ui/Spinner';
import { motion } from 'framer-motion';
import { hoverOnButtonAnimation } from '@styles/Animations';

const ProductPage = () => {
  const { id } = useParams();

  const [dynamicId, setDynamicId] = useState(id || '');
  const { userId } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

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

  const variations = product?.data?.variations?.variations?.filter((variant) => variant._id !== product.data._id);

  const mutation = useMutation(addToBasket, {
    onSuccess: () => {
      dispatch(appendToBasket({ ...product?.data, count: 1 }));
      dispatch(showMessage('The product has been successfully added'));
    },
  });
  let requestData = {};

  if (userId) {
    requestData = {
      product: product?.data._id,
      count: 1,
      photo: product?.data.photos[0],
      measurement: {},
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
    };
  }

  const handleAddToCartNonRegisterUser = () => {
    dispatch(addToCartNonRegisterUser({ ...product?.data, count: 1 }));
    dispatch(showMessage('The product has been successfully added'));

    addToCartGTMEvent('add_to_cart', { id: product?.data._id, title: product?.data.title });
  };

  const initialSectionsState = [
    {
      title: 'Product details',
      isOpen: false,
    },
    // {
    //   title: 'Promo Videos',
    //   isOpen: false
    // },
    // {
    //   title: 'Inspiration',
    //   isOpen: false
    // }
  ];
  const initialSectionsStateNotShoes = [
    {
      title: 'Product details',
      isOpen: false,
    },
  ];

  const [sections, setSections] = useState(
    product?.data.category === 'shoes' ? initialSectionsState : initialSectionsStateNotShoes
  );
  const toggleSection = (index) => {
    setSections((prevSections) =>
      prevSections.map((section, i) => (i === index ? { ...section, isOpen: !section.isOpen } : section))
    );
  };
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <div className="font-poppins h-screen">
      <Head title="Product" />
      <MainLayout>
        <div className="hidden lg:flex w-full h-[50px] justify-center items-center pt-10 box-border">
          <NavigationLinks color="gray" className="z-10 w-auto" />
        </div>
        <div className={`md:grid lg:grid-cols-2 flex flex-col md:py-8 lg:gap-16 gap-10 ${styles.container}`}>
          {/* Product Slider */}
          <Slider
            images={product?.data.photos}
            color="gray"
            dataShoes={product?.data.category === 'shoes' ? true : false}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
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
              />
              <div className="py-2 w-full">
                {product?.data.category == 'shoes' && <span>Your shoes will be manufactured in 7-10 days.</span>}
                {product?.data.category !== 'shoes' && (
                  <>
                    {!!product?.data.size.length && (
                      <>
                        <p className={`${styles.body2} font-bold py-4`}>Please select your size</p>
                        <div className="flex gap-6 flex-wrap">
                          {product?.data.size?.map((size) => (
                            <div className="basis-[26%] lg:basis-[25%]">
                              <Button color="transparentGray">{size}</Button>
                            </div>
                          ))}
                        </div>
                      </>
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
                )}
              </div>
              <div className="py-2">
                {sections.map((section, index) => (
                  <AccordionSection
                    key={section.title}
                    title={section.title}
                    isOpen={section.isOpen}
                    toggleAccordion={() => toggleSection(index)}
                  >
                    {index == 0 && (
                      <div>
                        <h1 className={`${styles.body1} font-bold`}>{product?.data.title}</h1>
                        <div dangerouslySetInnerHTML={{ __html: product?.data.productDetails }} />
                      </div>
                    )}
                    {index == 1 && (
                      <div>
                        <h1>Promo Videos</h1>
                      </div>
                    )}
                    {index == 2 && (
                      <div>
                        <h1>Inspiration</h1>
                      </div>
                    )}
                  </AccordionSection>
                ))}
              </div>
            </div>
          </div>
          <div>
            {/* Product Reviews */}
            <ProductReviews rating={product?.data.rating} />
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default ProductPage;
