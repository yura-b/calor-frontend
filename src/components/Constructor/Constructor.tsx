import { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetDesign } from '@/store/reducers/constructor/ShoesConstructorReducer';
import { setSelectedModel, resetDetails } from '@/store/reducers/constructor/SelectedShoePartsReducer';
import { setConsctructorImage } from '@/store/reducers/constructor/ConstructorImage';
import { titles } from '@/translations/titles';
import Head from '@/layouts/Head';
import MainLayout from '@/components/MainLayout';
import MainView from './components/Shoes/Views/MainView';
import AditionalViews from './components/Shoes/Views/AditionalViews';
import Details from './components/Shoes/Details';
import Materials from './components/Shoes/Materials';
import Colors from './components/Shoes/Colors';
import NavigationMenu from './components/NavigationMenu';
import Button from '@/components/ui/Button';
import { shoes } from './shoesData';
import combineImages from '@/helpers/functions/combineImages';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, QueryObserverResult } from 'react-query';
import { getProductById, getProducts } from '@/api/products';
import styles from '@styles/Styles.module.scss';
import Loader from '@/components/ui/Loader';
import NotFoundPage from '@/pages/NotFoundPage';

const Constructor: FC = () => {
  const { id } = useParams();
  const [isURLError, setIsURLError] = useState(false);
  const { data: product, isLoading } = useQuery(['productById', id], () => getProductById(id), {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    onError: (error: QueryObserverResult['error']) => {
      if (error && (error as any).response && (error as any).response.status === 404) {
        setIsURLError(true);
      } else {
        setIsURLError(false);
      }
    },
  });

  const { data: products } = useQuery('products', getProducts, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const shoesDetailsFromApi = products?.data?.shoes.find((item) => item._id === product?.data?._id).details;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { model } = useParams();

  const [isVisible, setIsVisible] = useState(false);
  const { view2 } = useSelector((state) => state.shoesConstructor[model]);
  const { selectedModel } = useSelector((state) => state.selectedShoeParts);
  const modelImages = Object.values(view2);
  const modelDetails = shoes.find((item) => item.product === model);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleRedesign = () => {
    dispatch(resetDesign());
    dispatch(resetDetails());
  };

  const goToNextPage = () => {
    combineImages(modelImages).then((base64) => {
      dispatch(setConsctructorImage(base64));
      navigate('measurement');
    });
  };

  useEffect(() => {
    dispatch(setSelectedModel(model));
  }, [selectedModel]);

  return (
    <>
      {isURLError && <NotFoundPage />}
      {isLoading && !isURLError && <Loader />}
      {!isLoading && (
        <div className="font-poppins h-screen">
          <Head title={titles.designShoePage} />
          <MainLayout>
            <div>
              <NavigationMenu />
              <MainView model={model} />
              <Details details={modelDetails?.details} />
              <Materials details={modelDetails?.details} shoesDetailsFromApi={shoesDetailsFromApi} />
              <Colors details={modelDetails?.details} shoesDetailsFromApi={shoesDetailsFromApi} />

              <div className="flex w-wrapper flex-col mx-auto">
                <div className="flex justify-center align-center items-center gap-4">
                  <div className={`${styles.subtitle}`}>
                    <span>{product?.data?.title}</span> <span>$ {product?.data?.price}</span>
                  </div>
                  <Button color="gray" className="w-full my-4 lg:block max-w-sm" onClick={toggleVisibility}>
                    Preview
                  </Button>
                </div>
                {isVisible && (
                  <>
                    <AditionalViews model={model} />
                    <div className="flex md:flex-row flex-col justify-center items-center md:gap-3">
                      {/* <Button color="mint" className="w-full my-4 lg:block" onClick={handleSaveDesign}>Save design</Button> */}
                      <Button
                        color="transparentGray"
                        className="w-full my-4 lg:block max-w-sm"
                        onClick={handleRedesign}
                      >
                        Redesign
                      </Button>
                      <Button color="gray" className="w-full my-4 lg:block max-w-sm" onClick={goToNextPage}>
                        Go To Measurement
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </MainLayout>
        </div>
      )}
    </>
  );
};

export default Constructor;
