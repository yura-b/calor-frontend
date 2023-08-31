import { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetDesign } from '@/store/reducers/constructor/ShoesConstructorReducer';
import { setSelectedModel } from '@/store/reducers/constructor/SelectedShoePartsReducer';
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
import { useParams } from 'react-router-dom';

const Constructor: FC = () => {
  const dispatch = useDispatch();
  const { model } = useParams();

  const [isVisible, setIsVisible] = useState(false);
  const { view3 } = useSelector((state) => state.shoesConstructor[model]);
  const { selectedModel } = useSelector((state) => state.selectedShoeParts);
  const modelImages = Object.values(view3);
  const modelDetails = shoes.find((item) => item.product === model);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleSaveDesign = () => {
    combineImages(modelImages).then((base64) => { });
  };

  const handleRedesign = () => {
    dispatch(resetDesign());
  };

  const handleAddToCart = () => {
    combineImages(modelImages).then((base64) => { });
  };

  useEffect(() => {
    dispatch(setSelectedModel(model));
  }, [selectedModel]);

  return (
    <div className="font-poppins h-screen">
      <Head title={titles.designShoePage} />
      <MainLayout>
        <div>
          <NavigationMenu />
          <MainView model={model} />
          <Details details={modelDetails?.details} />
          <Materials details={modelDetails?.details} />
          <Colors details={modelDetails?.details} />

          <div className="flex w-wrapper flex-col mx-auto">
            <div className="flex justify-center align-center">
              <Button color="gray" className="w-full my-4 lg:block max-w-sm" onClick={toggleVisibility}>
                Preview
              </Button>
            </div>
            {isVisible && (
              <>
                <AditionalViews model={model} />
                <div className="flex md:flex-row flex-col justify-center items-center md:gap-3">
                  {/* <Button color="mint" className="w-full my-4 lg:block" onClick={handleSaveDesign}>Save design</Button> */}
                  <Button color="transparentGray" className="w-full my-4 lg:block max-w-sm" onClick={handleRedesign}>
                    Redesign
                  </Button>
                  <Button color="gray" className="w-full my-4 lg:block max-w-sm" onClick={handleAddToCart}>
                    Add to cart
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default Constructor;
