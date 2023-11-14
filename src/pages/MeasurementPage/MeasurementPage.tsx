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
import { brandArray, brandSizeArray } from './helpers/data';
import VideoFrame from '@components/VideoFrame';
import Button from '@/components/ui/Button';
import CustomInput from '@/components/input/CustomInput';
import Video from '@components/Video';

const MeasurementPage = () => {
  const measurement = useAppSelector((state) => state.userMeasurement);
  const sizeList = [
    6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17,
  ];
  const [selectedShoeSize, setSelectedShoeSize] = useState<number>(0 || measurement.selectedShoeSize);

  const handleSize = (size) => {
    setSelectedShoeSize(size);
  };
  const [isDisabled, setIsDisabled] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<string>(brandArray[0]);
  const [selectedOtherBrand, setSelectedOtherBrand] = useState<string>('');
  const [brandModel, setBrandModel] = useState<string>('');
  const [brandSize, setBrandSize] = useState<string>(brandSizeArray[0]);

  const [isWomenAccordionOpen, setIsWomenAccordionOpen] = useState(false);
  const [isMenAccordionOpen, setIsMenAccordionOpen] = useState(false);
  const [isSizeGuideAccordionOpen, setIsSizeGuideAccordionOpen] = useState(false);

  const [isFormDisabled, setIsFormDisabled] = useState(true);

  const [brandModelError, setBrandModelError] = useState('');
  const [brandOtherError, setBrandOtherError] = useState('');

  const toggleDisable = () => {
    setIsFormDisabled(!isFormDisabled);
  };

  const changeBrandHandler = (setState: React.Dispatch<React.SetStateAction<string>>) => {
    return (e: SelectChangeEvent) => {
      setState(e.target.value);
    };
  };
  const changeBrandSizeHandler = (setState: React.Dispatch<React.SetStateAction<string>>) => {
    return (e: SelectChangeEvent) => {
      setState(e.target.value);
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

  const selectedBrandChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (value.length <= 100) {
      setSelectedOtherBrand(value);
      setBrandOtherError('');
    } else {
      setBrandOtherError('The field should contain no more than 100 characters');
    }
  };
  const brandModelChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (value.length <= 100) {
      setBrandModel(value);
      setBrandModelError('');
    } else {
      setBrandModelError('The field should contain no more than 100 characters');
    }
  };

  return (
    <div className="font-poppins h-screen text-gray">
      <MainLayout>
        <div className=" hidden lg:block lg:mt-4 lg:mb-2">
          <NavigationLinks color="gray" className=" w-auto" />
        </div>
        <div className={styles.container}>
          <MeasurementHeader isArrowBack={true} title="Measurement" background="transparent" />
          <div
            className="flex 
            flex-col
            lg:flex-row
            justify-center
            gap-4
            lg:gap-10"
          >
            <div className="w-full flex flex-col basis-[1/2] lg:max-w-[48%]">
              <div
                className="mb-2
                lg:mb-2 
                flex
                flex-row
                justify-between
                items-center"
              >
                <span
                  className={`font-bold py-2 ${isDisabled && selectedShoeSize == undefined ? 'text-custom-red' : ''}`}
                >
                  Please Select Your Size<span className="text-custom-red">*</span>
                </span>
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
              <div className="my-2">
                <AccordionSection
                  title="Women`s Shoe Size Chart"
                  isOpen={isWomenAccordionOpen}
                  toggleAccordion={toggleWomenAccordion}
                  className="bg-lightGray px-2 mt-4 lg:my-4"
                >
                  <ShoeSizeTable data={dataWomen} title={['Women`s Shoe Size Chart', 'Foot Width, inch/mm']} />
                </AccordionSection>
                <AccordionSection
                  title="Men`s Shoe Size Chart"
                  isOpen={isMenAccordionOpen}
                  toggleAccordion={toggleMenAccordion}
                  className="bg-lightGray px-2 mt-2 lg:my-4"
                >
                  <ShoeSizeTable data={dataMen} title={['Men`s Shoe Size Chart', 'Foot Width, inch/mm']} />
                </AccordionSection>
              </div>
              <span className="py-2">
                We kindly request information about your most comfortable pair of sneakers. This will help us create
                CALOR's pair of shoes that will fit comfortably.
              </span>
              <div className="pb-4 flex flex-col">
                <span className="font-bold py-2">Choose The Brand You Wear</span>
                <CustomSelect
                  value={selectedBrand}
                  array={brandArray}
                  defaultValue={brandArray[0] || ''}
                  handleFunc={changeBrandHandler(setSelectedBrand)}
                />
                {selectedBrand == brandArray[brandArray.length - 1] && (
                  <>
                    <span className={'font-bold pt-6 -mb-4'}>
                      {'Input The Brand You Wear'}
                      {selectedBrand === brandArray[brandArray.length - 1] ? (
                        <span className="text-red-500">*</span>
                      ) : (
                        ''
                      )}
                    </span>
                    <CustomInput
                      id={'brand'}
                      name={'brand'}
                      placeholder={'input the brand'}
                      value={selectedOtherBrand}
                      onChange={selectedBrandChangeHandler}
                      required={selectedBrand == brandArray[brandArray.length - 1] && selectedBrand !== brandArray[0]}
                    />
                    {brandOtherError && <div className="text-red-500">{brandOtherError}</div>}
                    {isDisabled &&
                      selectedOtherBrand.length == 0 &&
                      selectedBrand == brandArray[brandArray.length - 1] && (
                        <div className="text-red-500 -mt-3">This field is required</div>
                      )}
                  </>
                )}
              </div>
              <span
                className={`font-bold  -mb-4 bg-gray-300  ${
                  selectedBrand == brandArray[0] ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {' '}
                {'Input The Brand Model You Wear'}
                {selectedBrand !== brandArray[0] ? <span className="text-red-500">*</span> : ''}
              </span>
              <CustomInput
                id={'brandModel'}
                name={'brandModel'}
                placeholder={'input the brand model'}
                value={selectedBrand == brandArray[0] ? '' : brandModel}
                onChange={brandModelChangeHandler}
                required={selectedBrand !== brandArray[0]}
                disabled={selectedBrand == brandArray[0]}
              />
              {brandModelError && <div className="text-red-500">{brandModelError}</div>}
              {isDisabled && brandModel.length == 0 && selectedBrand !== brandArray[0] && (
                <div className="text-red-500 -mt-3">This field is required</div>
              )}
              <div
                className={`flex flex-col bg-gray-300 ${
                  selectedBrand == brandArray[0] ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <span className={'font-bold py-2'}>
                  {' '}
                  {'Choose The Brand Size You Wear'}
                  {selectedBrand !== brandArray[0] ? <span className="text-red-500">*</span> : ''}
                </span>
                <CustomSelect
                  value={selectedBrand == brandArray[0] ? brandSizeArray[0] : brandSize}
                  array={brandSizeArray}
                  defaultValue={brandSizeArray[0] || ''}
                  handleFunc={changeBrandSizeHandler(setBrandSize)}
                  required={selectedBrand !== brandArray[0]}
                />
                {isDisabled && brandSize == brandSizeArray[0] && selectedBrand !== brandArray[0] && (
                  <div className="text-red-500">This field is required</div>
                )}
              </div>
              {/* <div className="my-2">
                <span className="underline text-mint">Your shoe size is not on the list?</span>
              </div> */}
            </div>

            <div className="w-full flex flex-col lg:basis-[1/2] lg:max-w-[48%]">
              <div>
                <AccordionSection
                  title="Video Guide"
                  isOpen={isSizeGuideAccordionOpen}
                  toggleAccordion={toggleSizeGuideAccordion}
                  className="bg-lightGray px-2"
                >
                  <Video srcWebm={'18omPddYi3zLQhPFIbUxFv0ong9czcISZ'} srcMov={'1jXSBWSLsBdKRVDV1bqvWc9VFXFc-qcm0'} />
                </AccordionSection>
                <div className="w-full flex flex-col">
                  <span className="pt-4">
                    The information you've already provided is sufficient for us to craft a pair of shoes that will fit
                    well. However, if you desire a customized fit for perfection, you can share measurements for both of
                    your feet. As a manufacturer, we can accommodate this request, and it's an additional service we
                    offer at no cost. We would be delighted to provide this service for you.
                  </span>
                  <Button className="max-w-full my-2" color="gray" onClick={toggleDisable}>
                    {isFormDisabled ? 'Add Custom Measurement' : 'Clear Custom Measurement'}
                  </Button>
                  <span
                    className={`font-bold mt-2 bg-gray-300 ${isFormDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Please Measure Your Feet {isFormDisabled && <span className="font-bold mt-2">(optional)</span>}
                  </span>
                  <MeasurementForm
                    selectedShoeSize={selectedShoeSize}
                    selectedBrand={selectedBrand}
                    isFormDisabled={isFormDisabled}
                    onIsDisabledChange={setIsDisabled}
                    brandModel={brandModel}
                    selectedOtherBrand={selectedOtherBrand}
                    brandSize={brandSize}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default MeasurementPage;
