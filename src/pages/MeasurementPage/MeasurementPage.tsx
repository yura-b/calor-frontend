import { useState } from 'react';
import MainLayout from '@components/MainLayout';
import styles from '@/styles/Styles.module.scss';
import MeasurementHeader from "./components/MeasurementHeader";
import MeasurementForm from "./components/MeasurementForm";
import { Link } from "react-router-dom";

const MeasurementPage = () => {
  const sizeList = [1, 2, 3, 4, 5]
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSize = (size) => {
    setSelectedSize(size)
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
                    ${selectedSize === size 
                      ? 'bg-mint border-mint' 
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
              <MeasurementForm />
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default MeasurementPage;
