import { useState, useEffect } from 'react';
import MainLayout from '@components/MainLayout';
import styles from '@/styles/Styles.module.scss';
import MeasurementHeader from './components/MeasurementHeader';
import MeasurementForm from './components/MeasurementForm';
// import { Link } from 'react-router-dom';
import NavigationLinks from '@components/MainLayout/components/Header/components/NavigationLinks';
// import { paths } from '@routes/paths.ts';
import { useAppSelector } from '@/store/hooks/hooks.ts';
import { CustomSelect } from '@components/select/CustomSelect.tsx';
import { SelectChangeEvent } from '@mui/material/Select';
import AccordionSection from '@components/AccordionSection';
import ShoeSizeTable from '@pages/HelpPage/components/ShoeSizeTable';
import { dataMen, dataWomen } from '@pages/HelpPage/helpers/data';
import { brandArray } from './helpers/data';
import VideoFrame from '@components/VideoFrame';
import Button from '@/components/ui/Button';

const MeasurementPage = () => {
  const measurement = useAppSelector((state) => state.userMeasurement);
  const sizeList = [
    6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17,
  ];
  const [selectedShoeSize, setSelectedShoeSize] = useState<number>(0 || measurement.selectedShoeSize);

  const handleSize = (size) => {
    setSelectedShoeSize(size);
  };

  const [selectedBrand, setSelectedBrand] = useState<string>(brandArray[0]);
  const [isWomenAccordionOpen, setIsWomenAccordionOpen] = useState(false);
  const [isMenAccordionOpen, setIsMenAccordionOpen] = useState(false);
  const [isSizeGuideAccordionOpen, setIsSizeGuideAccordionOpen] = useState(true);
  const [showMeasureForm, setShowMeasureForm] = useState(false);
  const [showSizeError, setShowSizeError] = useState(false);

  const changeHandler = (setState: React.Dispatch<React.SetStateAction<string>>) => {
    return (e: SelectChangeEvent) => {
      setState(e.target.value);
      if (e.target.value !== brandArray[0]) {
        setSelectedShoeSize(0);
      }
    };
  };

  const toggleWomenAccordion = () => {
    setIsWomenAccordionOpen((prev) => !prev);
  };
  const toggleMenAccordion = () => {
    setIsMenAccordionOpen((prev) => !prev);
  };
  const toggleSizeGuideAccordion = () => {
    setIsSizeGuideAccordionOpen((prev) => !prev);
  };
  const toggleShowMeasureForm = () => {
    if (selectedShoeSize) {
      setShowMeasureForm(true);
      setShowSizeError(false);
    } else {
      setShowSizeError(true);
    }
  };
  useEffect(() => {
    if (selectedShoeSize) {
      setShowSizeError(false);
    }
  }, [selectedShoeSize]);

  return (
    <div className="font-poppins h-screen text-gray">
      <MainLayout>
        <div className=" hidden lg:block lg:mt-4 lg:mb-2">
          <NavigationLinks color="gray" className=" w-auto" />
        </div>
        <div className={styles.container}>
          <MeasurementHeader
            isArrowBack={true}
            showMeasureForm={showMeasureForm}
            setShowMeasureForm={setShowMeasureForm}
            title="Measurement"
            background="transparent"
          />
          <div
            className="flex 
            flex-col
            lg:flex-row
            justify-center
            gap-4
            lg:gap-10"
          >
            {!showMeasureForm && (
              <div className="w-full flex flex-col basis-[1/2] ">
                <span className="font-bold py-2">Step 1. Choose The Brand You Wear</span>

                <CustomSelect
                  value={selectedBrand}
                  array={brandArray}
                  defaultValue={brandArray[0] || ''}
                  handleFunc={changeHandler(setSelectedBrand)}
                />

                <div
                  className="mb-2
                lg:mb-2 mt-4
                flex
                flex-row
                justify-between
                items-center"
                >
                  <span className="font-bold py-2">Step 2. Please Select Your Size*</span>
                  {/* <Link to={paths.helpPage + '#sizeGuide'} className="underline text-mint">
                  Size Guide
                </Link> */}
                </div>
                <div className="w-full grid grid-cols-3 gap-4">
                  {sizeList.map((size) => (
                    <div
                      key={size}
                      className={`w-full 
                    h-10
                    flex
                    justify-center
                    items-center
                    border
                    cursor-pointer
                    ${selectedShoeSize === size ? 'bg-mint border-mint text-white' : 'hover:bg-mintExtraLight'}`}
                      onClick={() => handleSize(size)}
                    >
                      {size}
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  {showSizeError && <p className="text-custom-red">Please select your size to proceed</p>}
                  {selectedBrand === brandArray[0] && !showMeasureForm && (
                    <Button className="max-w-full my-2" color="transparentMint" onClick={toggleShowMeasureForm}>
                      Proceed
                    </Button>
                  )}
                </div>
                {selectedBrand === brandArray[0] && showMeasureForm && (
                  <div className="w-full flex flex-col mt-4">
                    <span className="font-bold">Step 3. Please Measure Your Feet</span>
                    <div
                      className="flex
                flex-col 
                justify-center 
                items-center 
                gap-2 
                my-2"
                    >
                      {/* <span>Don't know how to do it?</span>
                <Link className="underline text-mint font-bold" to={''}>
                  Video Guide
                </Link> */}
                    </div>
                    <MeasurementForm selectedShoeSize={selectedShoeSize} selectedBrand={selectedBrand} />
                  </div>
                )}
                {selectedBrand !== brandArray[0] && (
                  <MeasurementForm selectedShoeSize={selectedShoeSize} selectedBrand={selectedBrand} />
                )}
                {/* <div className="my-2">
                <span className="underline text-mint">Your shoe size is not on the list?</span>
              </div> */}
              </div>
            )}
            {selectedBrand === brandArray[0] && showMeasureForm && (
              <>
                <div className="w-full flex flex-col">
                  <span className="font-bold -mt-2">Step 3. Please Measure Your Feet</span>
                  <div
                    className="flex
                flex-col 
                justify-center 
                items-center 
                gap-2 
                my-2"
                  >
                    {/* <span>Don't know how to do it?</span>
                <Link className="underline text-mint font-bold" to={''}>
                  Video Guide
                </Link> */}
                  </div>
                  <MeasurementForm selectedShoeSize={selectedShoeSize} selectedBrand={selectedBrand} />
                </div>
              </>
            )}
            <div className="w-full flex flex-col lg:basis-[1/2] lg:max-w-[48%]">
              <div>
                {showMeasureForm && (
                  <AccordionSection
                    title="Size Guide"
                    isOpen={isSizeGuideAccordionOpen}
                    toggleAccordion={toggleSizeGuideAccordion}
                    className="bg-lightGray px-2"
                  >
                    <VideoFrame
                      src="https://drive.google.com/file/d/1ORbS4BvEb3GuPbkZKATVO5E2nx1damff/preview"
                      title="Video Guide"
                      className="xl:max-w-[50vw]"
                    />
                  </AccordionSection>
                )}
                {!showMeasureForm && (
                  <>
                    <AccordionSection
                      title="Women`s Shoe Size Chart"
                      isOpen={isWomenAccordionOpen}
                      toggleAccordion={toggleWomenAccordion}
                      className="bg-lightGray px-2"
                    >
                      <ShoeSizeTable data={dataWomen} title={['Women`s Shoe Size Chart', 'Foot Width, inch/mm']} />
                    </AccordionSection>
                    <AccordionSection
                      title="Men`s Shoe Size Chart"
                      isOpen={isMenAccordionOpen}
                      toggleAccordion={toggleMenAccordion}
                      className="bg-lightGray px-2"
                    >
                      <ShoeSizeTable data={dataMen} title={['Men`s Shoe Size Chart', 'Foot Width, inch/mm']} />
                    </AccordionSection>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default MeasurementPage;
