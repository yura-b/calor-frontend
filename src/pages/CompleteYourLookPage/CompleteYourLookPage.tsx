import { FC, useEffect } from 'react';
import { useNavigate } from "react-router";
import { useQuery } from "react-query";
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import CompleteYourLookHeader from "./components/CompleteYourLookHeader";
import CompleteYourLookItem from "./components/CompleteYourLookItem";
import { getProducts } from "@/api/products";
import { setStep, Steps } from '@/store/reducers/CompleteLookReducer';
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";

interface IProps {

}

const CompleteYourLookPage: FC<IProps> = () => {
  const { step } = useAppSelector((state) => state.completeLook);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  if (!isLoading) {
    completeLookItems = {
      0: {
        title: 'How about a matching belt?',
        product: products?.data.accessories
          .filter((item) => item.subcategory === 'Belts')[0],
      },
      1: {
        title: 'Would you like to add some accessories?',
        product: products?.data.accessories
          .filter((item) => item.category.categoryTitle === 'Accessories')[0],
      },
      2: {
        title: 'In order to keep your leather/fabric in a good condition for a long time, we recommend to try this product',
        product: products?.data.accessories
          .filter((item) => item.category.categoryTitle === 'Care Product')[0],
      }
    }
  }

  const handleSkip = () => {
    if (step < 2) {
      dispatch(setStep(step + 1));
    } else {
      navigate('/');
    }
  };

  const handleViewAll = () => {
    step === 0 ? navigate('/accessories/belts') :
    step === 1 ? navigate('/accessories') :
    step === 2 ? navigate('/shoe_care_product') :
    navigate('/')
  };

  const handleAddToCart = () => {

  };

  useEffect(() => {
    dispatch(setStep(Steps.FIRST));
  }, []);

  return (
    <div className={'w-full flex flex-col items-center'}>
      <CompleteYourLookHeader />
      {isLoading ? <Loader /> : <CompleteYourLookItem item={completeLookItems[step]} />}

      <Button color="transparentGray" className="w-full my-2 lg:block max-w-sm" onClick={handleSkip}>
        Skip
      </Button>
      <Button color="transparentGray" className="w-full my-2 lg:block max-w-sm" onClick={handleViewAll}>
        View All
      </Button>
      <Button color="gray" className="w-full my-2 lg:block max-w-sm" onClick={handleAddToCart}>
        Add to cart
      </Button>

    </div>
  )
}

export default CompleteYourLookPage;