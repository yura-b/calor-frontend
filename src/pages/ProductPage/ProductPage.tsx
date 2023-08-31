import React from "react";
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

const ProductPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery(['productById', id], () => getProductById(id), {
    keepPreviousData: true,
    refetchOnWindowFocus: false
  });

  return (
    <div className="font-poppins h-screen">
      <Head title={titles.about} />
      <MainLayout>
        <div className="hidden lg:flex w-full h-[50px] justify-center items-center pt-10 box-border">
          <NavigationLinks
            color="gray"
            className="z-10 w-auto"
          />
        </div>
        <div className={`md:grid md:grid-cols-2 md:grid-rows-2 md:justify-center md:py-8 ${styles.container}`}>
          {/* Product Slider */}
          <div className={`justify-start`}>
            <Slider images={[]}/>
          </div>
          {/* Product Desription */}
          <div className={`flex flex-col bg-mintExtraLight row-span-2 justify-start items-start ${styles.pageident}`}>
            <div className={``}>
              <ProductDescription description={{}}/>
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
          <div className={``}>
            {/* Product Reviews */}
            <ProductReviews />
          </div>
        </div>
      </MainLayout>
    </div>
  )
}

export default ProductPage;