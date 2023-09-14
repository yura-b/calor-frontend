import { useEffect, useState } from 'react';
import styles from '@styles/Styles.module.scss';
import { useQuery, useMutation } from 'react-query';
import { useParams } from 'react-router';
import { getProductById } from '@/api/products';
import Head from '@/layouts/Head';
import { titles } from '@/translations/titles';
import MainLayout from '@/components/MainLayout';
import ProductDescription from './components/ProductDescription';
import ProductReviews from './components/ProductReviews';
import NavigationLinks from '@components/MainLayout/components/Header/components/NavigationLinks';
import Slider from '@/components/ui/Slider';
import Button from '@components/ui/Button';
import { paths } from '@routes/paths.ts';
import AccordionSection from '@components/AccordionSection';
import { addToBasket } from '@/api/basket';
import { SealCheck } from '@phosphor-icons/react';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { BasketProduct, appendToBasket } from '@/store/reducers/BasketSlice';
import { addToCartNonRegisterUser } from "@/store/reducers/BasketForNonRegisterUser";

const ProductPage = () => {
  const { id } = useParams();
  const { userId, access_token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const { items: basketProducts } = useAppSelector((state) => state.basket);
  const { items: basketProductsNonRegisterUser } = useAppSelector((state) => state.basketForNonRegisterUser);

  const isProductExistInBasketNonRegisterUser = basketProductsNonRegisterUser.some((item: BasketProduct) => item.product === id || item._id === id || item.accessory === id);
  const isProductExistInBasket = basketProducts.some(
    (item: BasketProduct) => item?._id === id || item?.accessory?._id === id || item?.shoes?._id === id
  );

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery(['productById', id], () => getProductById(id), {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const mutation = useMutation(addToBasket, {
    onSuccess: (data) => {
      dispatch(appendToBasket({ ...product?.data, count: 1 }));
      console.log(data);
    },
  });
  let requestData = {};

  if (userId) {
    requestData = {
      product: product?.data._id,
      count: 1,
      photo: product?.data.photos[0],
      measurement: {},
      details: [{}],
    };
  } else {
    requestData = {
      product: product?.data._id,
      count: 1,
      photos: [product?.data.photos[0]],
      measurement: {},
      details: [{}],
    };
  }

  const handleAddToCartNonRegisterUser = () => {
    dispatch(addToCartNonRegisterUser(requestData));
  }

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

  return (
    <div className="font-poppins h-screen">
      <Head title="Product" />
      <MainLayout>
        <div className="hidden lg:flex w-full h-[50px] justify-center items-center pt-10 box-border">
          <NavigationLinks color="gray" className="z-10 w-auto" />
        </div>
        <div className={`md:grid lg:grid-cols-2 flex flex-col md:py-8 lg:gap-16 gap-10 ${styles.container}`}>
          {/* Product Slider */}
          <Slider images={product?.data.photos} color="gray" />
          {/* Product Desription */}
          <div
            className={`flex flex-col bg-mintExtraLight row-span-2 justify-start items-start ${styles.pageident} w-full`}
          >
            <div className="w-full">
              <ProductDescription
                description={product?.data.description}
                title={product?.data.title}
                price={product?.data.price}
                subcategory={product?.data.subcategory}
                rating={product?.data.rating}
                season={product?.data.season}
                sizes={product?.data.sizes}
                category={product?.data.category}
              />
              <div className="py-2 w-full">
                {product?.data.category == 'shoes' && (
                  <span>Your order will be customized and delivered within 7-10 days.</span>
                )}
                {product?.data.category !== 'shoes' && (
                  <>
                    <span>{product?.data.description}</span>
                    {product?.data.size.length && (
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
              <div className="flex flex-col justify-center items-center gap-6 py-8">
                {product?.data.category == 'shoes' && (
                  <>
                    <Button
                      color="gray"
                      to={`/design_your_shoe/model/${product.data.title.toLowerCase()}/${product.data._id}`}
                    >
                      Design Your Shoe
                    </Button>
                    <Button color="transparentGray" to={paths.ready_made_products}>
                      Choose From Existing
                    </Button>
                  </>
                )}
                {userId ? (
                  <>
                    {product?.data.category !== 'shoes' && !isProductExistInBasket && (
                      <Button color="gray" onClick={() => mutation.mutate({ userId, requestData })}>
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
                ) : 
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
                }
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
                        <h1 className={styles.header2}>{product?.data.title}</h1>
                        <h1>{product?.data.description}</h1>
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
