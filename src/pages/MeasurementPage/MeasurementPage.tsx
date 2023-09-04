import { useState } from 'react';
import MainLayout from '@components/MainLayout';
import styles from '@/styles/Styles.module.scss';
import MeasurementHeader from "./components/MeasurementHeader";
import MeasurementForm from "./components/MeasurementForm";
import { Link } from "react-router-dom";

const MeasurementPage = () => {
  const sizeList = [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17]
  const [selectedShoeSize, setSelectedShoeSize] = useState(0);

  const handleSize = (size) => {
    setSelectedShoeSize(size)
  }

  return (
    <div className="font-poppins h-screen">
      <MainLayout>
        <div className={styles.container}>
          {/*Measurement Header*/}
          <MeasurementHeader isArrowBack={true} title="Measurement" background="transparent" />
          {/*Measurement Content*/}
          <div className="flex 
            flex-col
            lg:flex-row
            justify-center
            gap-4
            lg:gap-10">
            <div className="w-full flex flex-col">
              <div className="mb-2
                lg:mb-8
                flex
                flex-row
                justify-between
                items-center">
                <span className="font-bold">Step 1. Please  Select Your Size</span>
                <span className="underline text-mint">Size Guide</span>
              </div>
              <div className="w-full grid grid-cols-3 gap-4">
                {
                  sizeList.map((size) => <div key={size} className={`w-full 
                    h-10
                    flex
                    justify-center
                    items-center
                    border
                    cursor-pointer
                    ${selectedShoeSize === size 
                      ? 'bg-mint border-mint text-white' 
                      : 'hover:bg-mintExtraLight'}`}
                    onClick={() => handleSize(size)}>{size}</div>)
                }
              </div>
              <div className="my-2">
                <span className="underline text-mint">Your shoe size is not on the list?</span>
              </div>
            </div>
            <div className="w-full flex flex-col">
              <span className="font-bold">Step 2. Please Measure Your Feet</span>
              <div className="flex
                flex-col 
                justify-center 
                items-center 
                gap-2 
                my-2">
                <span>Don't know how to do it?</span>
                <Link className="underline text-mint font-bold" to={""}>Video Guide</Link>
              </div>
              <MeasurementForm selectedShoeSize={selectedShoeSize}/>
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default MeasurementPage;
