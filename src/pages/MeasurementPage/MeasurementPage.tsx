import { useState } from 'react';
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
  return (
    <div className="font-poppins h-screen text-gray">
      <MainLayout>
        <div className=" hidden lg:block lg:mt-4 lg:mb-2">
          <NavigationLinks color="gray" className=" w-auto" />
        </div>
        <div className={styles.container}>
          {/*Measurement Header*/}
          <MeasurementHeader isArrowBack={true} title="Measurement" background="transparent" />
          {/*Measurement Content*/}
          <div
            className="flex 
            flex-col
            lg:flex-row
            justify-center
            gap-4
            lg:gap-10"
          >
            <div className="w-full flex flex-col basis-[1/2] ">
              <span className="font-bold py-2">Step 1. Please select your brand</span>

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
                <span className="font-bold py-2">Step 2. Please Select Your Size</span>
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
              {selectedBrand !== brandArray[0] && (
                <MeasurementForm selectedShoeSize={selectedShoeSize} selectedBrand={selectedBrand} />
              )}
              {/* <div className="my-2">
                <span className="underline text-mint">Your shoe size is not on the list?</span>
              </div> */}
            </div>

            <div className="w-full flex flex-col basis-[1/2] max-w-[48%]">
              <div>
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
              </div>
              {selectedBrand === brandArray[0] && (
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
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default MeasurementPage;
