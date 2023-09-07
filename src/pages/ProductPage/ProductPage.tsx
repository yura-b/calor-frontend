import { useState } from 'react';
import styles from '@styles/Styles.module.scss';
import { useQuery } from 'react-query';
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
import Loader from '@/components/ui/Loader';
import { paths } from '@routes/paths.ts';
import AccordionSection from '@components/AccordionSection';

const ProductPage = () => {
  const { id } = useParams();
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery(['productById', id], () => getProductById(id), {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

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

  return isLoading ? (
    <Loader />
  ) : (
    <div className="font-poppins h-screen">
      <Head title={titles.product} />
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
            <div>
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
                  <span>Your order will be customized and delivared within 7-10 days</span>
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
                {product?.data.category !== 'shoes' && <Button color="gray">Add To Cart</Button>}
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
