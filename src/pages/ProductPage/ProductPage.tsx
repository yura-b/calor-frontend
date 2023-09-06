import { useEffect, useState } from "react";
import styles from '@styles/Styles.module.scss';
import { useQuery } from "react-query";
import { useParams } from "react-router"; 
import { getProductById } from "@/api/products";
import Head from '@/layouts/Head';
import { titles } from '@/translations/titles';
import MainLayout from '@/components/MainLayout';
import ProductDescription from "./components/ProductDescription";
import ProductReviews from "./components/ProductReviews";
import NavigationLinks from '@components/MainLayout/components/Header/components/NavigationLinks';
import Slider from "@/components/ui/Slider";
import Button from '@components/ui/Button';
import CustomAccordion from "@/components/ui/Accordion";
import Loader from "@/components/ui/Loader";

const ProductPage = () => {
  const { id } = useParams();
  const { data: product, isLoading, isError } = useQuery(['productById', id], () => getProductById(id), {
    keepPreviousData: true,
    refetchOnWindowFocus: false
  });

  return (
    isLoading ? (
      <Loader />
    ) : (
    <div className="font-poppins h-screen">
      <Head title={titles.about} />
      <MainLayout>
        <div className="hidden lg:flex w-full h-[50px] justify-center items-center pt-10 box-border">
          <NavigationLinks
            color="gray"
            className="z-10 w-auto"
          />
        </div>
        <div className={`md:grid lg:grid-cols-2 flex flex-col md:py-8 lg:gap-16 gap-10 ${styles.container}`}>
          {/* Product Slider */}
          <Slider images={product?.data.photos}/>
          {/* Product Desription */}
          <div className={`flex flex-col bg-mintExtraLight row-span-2 justify-start items-start ${styles.pageident}`}>
            <div>
              <ProductDescription 
                description={product?.data.description}
                title={product?.data.title}
                price={product?.data.price}
                subcategory={product?.data.subcategory}
                />
              <div>
                <span>Your order will be customized and delivared within 7-10 days</span>
              </div>
              <div>
                <CustomAccordion titles={['Product details', 'Inspiration']} styles={{backgroundColor: 'transparent', boxShadow: 'none'}}/>
              </div>
              <div className="flex flex-col justify-center items-center gap-2">
                <Button color="gray">Design Your Shoe</Button>
                <Button color="transparentGray">Choose From Existing</Button>
              </div>
            </div>
          </div>
          <div>
            {/* Product Reviews */}
            <ProductReviews rating={product?.data.rating}/>
          </div>
        </div>
      </MainLayout>
    </div>
  ))
}

export default ProductPage;